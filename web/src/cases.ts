// Keep in sync with migrations/0002_cases.sql
const CASE_STATEMENTS = [
	`CREATE TABLE IF NOT EXISTS "cases" (
		"id" TEXT NOT NULL PRIMARY KEY,
		"tracking_code" TEXT NOT NULL UNIQUE,
		"kind" TEXT NOT NULL,
		"channel" TEXT NOT NULL,
		"email" TEXT,
		"display_name" TEXT,
		"body" TEXT NOT NULL,
		"status" TEXT NOT NULL,
		"audio_key" TEXT,
		"created_at" INTEGER NOT NULL
	)`,
	`CREATE INDEX IF NOT EXISTS "cases_created_at_idx" ON "cases" ("created_at")`,
	`CREATE TABLE IF NOT EXISTS "case_events" (
		"id" TEXT NOT NULL PRIMARY KEY,
		"case_id" TEXT NOT NULL REFERENCES "cases" ("id") ON DELETE CASCADE,
		"label" TEXT NOT NULL,
		"at" INTEGER NOT NULL
	)`,
	`CREATE INDEX IF NOT EXISTS "case_events_case_id_idx" ON "case_events" ("case_id")`,
];

const KINDS = new Set(["information", "reclamation", "signalement", "suggestion"]);
const CHANNELS = new Set(["anonymous", "identified"]);

type CaseKind = "information" | "reclamation" | "signalement" | "suggestion";
type CaseChannel = "anonymous" | "identified";
type CaseStatus = "recu" | "en_cours" | "repondu";

export type CaseRecord = {
	id: string;
	tracking_code: string;
	kind: string;
	channel: string;
	email: string | null;
	display_name: string | null;
	body: string;
	status: string;
	audio_key: string | null;
	created_at: number;
};

export type CaseEvent = {
	id: string;
	case_id: string;
	label: string;
	at: number;
};

const SEED: Array<{
	code: string;
	kind: CaseKind;
	channel: CaseChannel;
	status: CaseStatus;
	name: string | null;
	email: string | null;
	body: string;
	events: string[];
}> = [
	{
		code: "PALJ-SEED1",
		kind: "information",
		channel: "anonymous",
		status: "en_cours",
		name: null,
		email: null,
		body: "DEMONSTRATION. Delai d'une audience au TGI. Aucune identite reelle.",
		events: ["Dossier reçu", "Transmis au greffe (démo)"],
	},
	{
		code: "PALJ-SEED2",
		kind: "reclamation",
		channel: "identified",
		status: "repondu",
		name: "Awa Demo",
		email: "awa.demo@example.com",
		body: "DEMONSTRATION. Relance sur un extrait. Personne fictive.",
		events: ["Dossier reçu", "En traitement", "Réponse envoyée (démo)"],
	},
	{
		code: "PALJ-SEED3",
		kind: "signalement",
		channel: "anonymous",
		status: "recu",
		name: null,
		email: null,
		body: "DEMONSTRATION. Signalement anonyme fictif. Ne pas traiter comme une affaire.",
		events: ["Dossier reçu"],
	},
];

export async function ensureCaseSchema(db: D1Database): Promise<void> {
	await db.batch(CASE_STATEMENTS.map((sql) => db.prepare(sql)));
}

export async function seedCases(db: D1Database): Promise<void> {
	const existing = await db.prepare("SELECT tracking_code FROM cases WHERE tracking_code LIKE 'PALJ-SEED%'").all<{ tracking_code: string }>();
	const have = new Set((existing.results ?? []).map((row) => row.tracking_code));
	for (const seed of SEED) {
		if (have.has(seed.code)) continue;
		const id = crypto.randomUUID();
		const created = Date.now() - 86_400_000;
		await db
			.prepare(
				`INSERT INTO cases (id, tracking_code, kind, channel, email, display_name, body, status, audio_key, created_at)
				 VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, ?)`,
			)
			.bind(id, seed.code, seed.kind, seed.channel, seed.email, seed.name, seed.body, seed.status, created)
			.run();
		for (const [index, label] of seed.events.entries()) {
			await db
				.prepare(`INSERT INTO case_events (id, case_id, label, at) VALUES (?, ?, ?, ?)`)
				.bind(crypto.randomUUID(), id, label, created + index * 3_600_000)
				.run();
		}
	}
}

function json(data: unknown, status = 200): Response {
	return Response.json(data, { status });
}

function clientKey(request: Request): string {
	return request.headers.get("CF-Connecting-IP") ?? request.headers.get("cf-connecting-ip") ?? "local";
}

function trackingCode(): string {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let suffix = "";
	const bytes = crypto.getRandomValues(new Uint8Array(4));
	for (const byte of bytes) {
		const letter = alphabet[byte % alphabet.length];
		if (letter) suffix += letter;
	}
	return `PALJ-${suffix}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null;
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
	try {
		const value: unknown = await request.json();
		return isRecord(value) ? value : null;
	} catch {
		return null;
	}
}

function asString(value: unknown): string | undefined {
	return typeof value === "string" ? value : undefined;
}

function isAudioKey(value: string): boolean {
	return /^demo\/[0-9a-f-]{36}\.webm$/i.test(value);
}

async function verifyTurnstile(secret: string, token: string, request: Request): Promise<boolean> {
	if (!token) return false;
	const body = new URLSearchParams({ secret, response: token, remoteip: clientKey(request) });
	const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		body,
	});
	const data = await res.json<{ success: boolean }>().catch(() => ({ success: false }));
	return data.success === true;
}

type SessionUser = { email: string; name: string };

export async function handleAppApi(
	request: Request,
	env: Env,
	getUser: () => Promise<SessionUser | null>,
): Promise<Response | null> {
	const url = new URL(request.url);

	if (url.pathname === "/api/demo/otp") {
		if (request.method !== "POST") return json({ error: "Methode non autorisee." }, 405);
		const limited = await env.CASE_RATE_LIMIT.limit({ key: `otp:${clientKey(request)}` });
		if (!limited.success) return json({ error: "Trop de tentatives. Attendez une minute." }, 429);
		const payload = await readJson(request);
		const email = asString(payload?.email)?.trim().toLowerCase() ?? "";
		if (!email.includes("@")) return json({ error: "E-mail invalide." }, 400);
		const row = await env.DB.prepare("SELECT otp FROM spike_otp WHERE email = ?")
			.bind(email)
			.first<{ otp: string }>();
		if (!row) return json({ error: "Aucun code." }, 404);
		return json({ otp: row.otp, demo: true });
	}

	if (request.method === "POST" && url.pathname === "/api/audio") {
		const limited = await env.CASE_RATE_LIMIT.limit({ key: `audio:${clientKey(request)}` });
		if (!limited.success) return json({ error: "Trop de tentatives. Attendez une minute." }, 429);
		const type = request.headers.get("content-type") ?? "";
		if (!type.startsWith("audio/")) return json({ error: "Envoi audio uniquement." }, 400);
		const bytes = await request.arrayBuffer();
		if (bytes.byteLength === 0 || bytes.byteLength > 2_000_000) {
			return json({ error: "Audio trop lourd (2 Mo max) ou vide." }, 400);
		}
		const key = `demo/${crypto.randomUUID()}.webm`;
		await env.AUDIO.put(key, bytes, { httpMetadata: { contentType: type } });
		return json({ key });
	}

	if (request.method === "GET" && url.pathname === "/api/audio") {
		const key = url.searchParams.get("key") ?? "";
		if (!isAudioKey(key)) return json({ error: "Fichier introuvable." }, 404);
		const object = await env.AUDIO.get(key);
		if (!object) return json({ error: "Fichier introuvable." }, 404);
		return new Response(object.body, {
			headers: {
				"content-type": object.httpMetadata?.contentType ?? "audio/webm",
				"cache-control": "private, max-age=60",
			},
		});
	}

	if (request.method === "POST" && url.pathname === "/api/cases") {
		const limited = await env.CASE_RATE_LIMIT.limit({ key: `case:${clientKey(request)}` });
		if (!limited.success) return json({ error: "Trop de dossiers. Attendez une minute." }, 429);
		const payload = await readJson(request);
		if (!payload) return json({ error: "Requete invalide." }, 400);
		if (payload.demoConfirmed !== true) {
			return json({ error: "Cochez la case de demonstration." }, 400);
		}
		const turnstileToken = asString(payload.turnstileToken) ?? "";
		const humanCheck = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, turnstileToken, request);
		if (!humanCheck) return json({ error: "Verification anti-robot echouee." }, 400);
		const kind = asString(payload.kind);
		const channel = asString(payload.channel);
		if (!kind || !KINDS.has(kind)) {
			return json({ error: "Choisissez un type de demande." }, 400);
		}
		if (!channel || !CHANNELS.has(channel)) {
			return json({ error: "Choisissez anonyme ou identifie." }, 400);
		}
		const body = asString(payload.body)?.trim() ?? "";
		if (body.length < 12 || body.length > 4000) {
			return json({ error: "Le message doit faire entre 12 et 4000 caracteres." }, 400);
		}
		let email: string | null = null;
		let displayName: string | null = null;
		if (channel === "identified") {
			const user = await getUser();
			if (!user) return json({ error: "Connectez-vous pour un dossier identifie." }, 401);
			email = user.email;
			displayName = user.name;
		}
		const audioRaw = asString(payload.audioKey);
		const audioKey = audioRaw && isAudioKey(audioRaw) ? audioRaw : null;
		const id = crypto.randomUUID();
		const code = trackingCode();
		const created = Date.now();
		await env.DB
			.prepare(
				`INSERT INTO cases (id, tracking_code, kind, channel, email, display_name, body, status, audio_key, created_at)
				 VALUES (?, ?, ?, ?, ?, ?, ?, 'recu', ?, ?)`,
			)
			.bind(id, code, kind, channel, email, displayName, body, audioKey, created)
			.run();
		await env.DB
			.prepare(`INSERT INTO case_events (id, case_id, label, at) VALUES (?, ?, ?, ?)`)
			.bind(crypto.randomUUID(), id, "Dossier reçu", created)
			.run();
		return json({ trackingCode: code, id, status: "recu" });
	}

	const caseMatch = url.pathname.match(/^\/api\/cases\/([A-Za-z0-9-]+)$/);
	if (request.method === "GET" && caseMatch?.[1]) {
		const code = caseMatch[1].toUpperCase();
		const dossier = await env.DB
			.prepare(
				`SELECT id, tracking_code, kind, channel, email, display_name, body, status, audio_key, created_at
				 FROM cases WHERE tracking_code = ?`,
			)
			.bind(code)
			.first<CaseRecord>();
		if (!dossier) return json({ error: "Code inconnu." }, 404);
		const events = await env.DB
			.prepare("SELECT id, case_id, label, at FROM case_events WHERE case_id = ? ORDER BY at ASC")
			.bind(dossier.id)
			.all<CaseEvent>();
		return json({
			trackingCode: dossier.tracking_code,
			kind: dossier.kind,
			channel: dossier.channel,
			status: dossier.status,
			body: dossier.body,
			audioKey: dossier.audio_key,
			createdAt: dossier.created_at,
			displayName: dossier.channel === "identified" ? dossier.display_name : null,
			events: events.results ?? [],
		});
	}

	if (request.method === "GET" && url.pathname === "/api/guichet/cases") {
		await seedCases(env.DB);
		const rows = await env.DB
			.prepare(
				`SELECT id, tracking_code, kind, channel, display_name, status, created_at
				 FROM cases ORDER BY created_at DESC LIMIT 50`,
			)
			.all<CaseRecord>();
		return json({ cases: rows.results ?? [] });
	}

	return null;
}
