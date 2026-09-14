export type SessionUser = { email: string; name: string } | null;

export type CaseEvent = { id: string; case_id: string; label: string; at: number };

export type CaseDossier = {
	trackingCode: string;
	kind: string;
	channel: string;
	status: string;
	body: string;
	audioKey: string | null;
	createdAt: number;
	displayName: string | null;
	events: CaseEvent[];
};

export type GuichetRow = {
	id: string;
	tracking_code: string;
	kind: string;
	channel: string;
	display_name: string | null;
	status: string;
	created_at: number;
};

export async function getSession(): Promise<SessionUser> {
	const res = await fetch("/api/auth/get-session", { credentials: "include" });
	if (!res.ok) return null;
	try {
		const data: unknown = await res.json();
		if (!data || typeof data !== "object" || !("user" in data)) return null;
		return (data as { user: SessionUser }).user ?? null;
	} catch {
		return null;
	}
}

export async function signOut(): Promise<boolean> {
	const res = await fetch("/api/auth/sign-out", {
		method: "POST",
		credentials: "include",
		headers: { "content-type": "application/json" },
		body: "{}",
	});
	return res.ok;
}

export async function createCase(payload: {
	kind: string;
	channel: "anonymous" | "identified";
	body: string;
	demoConfirmed: boolean;
	audioKey: string | null;
	turnstileToken: string;
}): Promise<{ ok: true; trackingCode: string } | { ok: false; error: string }> {
	const res = await fetch("/api/cases", {
		method: "POST",
		credentials: "include",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(payload),
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) return { ok: false, error: data.error || "Dépôt impossible." };
	return { ok: true, trackingCode: data.trackingCode };
}

export async function getCase(code: string): Promise<CaseDossier | null> {
	const res = await fetch(`/api/cases/${encodeURIComponent(code)}`);
	if (!res.ok) return null;
	return res.json();
}

export async function getGuichetCases(): Promise<GuichetRow[]> {
	const res = await fetch("/api/guichet/cases");
	const data = await res.json().catch(() => ({ cases: [] }));
	return data.cases ?? [];
}

export async function uploadAudio(blob: Blob): Promise<{ ok: true; key: string } | { ok: false; error: string }> {
	const res = await fetch("/api/audio", {
		method: "POST",
		headers: { "content-type": blob.type || "audio/webm" },
		body: blob,
	});
	const data = await res.json().catch(() => ({}));
	if (!res.ok) return { ok: false, error: data.error || "Audio refusé." };
	return { ok: true, key: data.key };
}

export async function sendOtp(email: string): Promise<{ ok: true; otp: string | null } | { ok: false; error: string }> {
	const send = await fetch("/api/auth/email-otp/send-verification-otp", {
		method: "POST",
		credentials: "include",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ email, type: "sign-in" }),
	});
	const sendBody = await send.json().catch(() => ({}));
	if (!send.ok) {
		return {
			ok: false,
			error: sendBody.code === "INVALID_EMAIL" ? "E-mail invalide. Exemple : demo@exemple.sn." : "Envoi impossible.",
		};
	}
	const demo = await fetch("/api/demo/otp", {
		method: "POST",
		credentials: "include",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ email }),
	});
	const payload = await demo.json().catch(() => ({}));
	return { ok: true, otp: demo.ok ? payload.otp : null };
}

export async function verifyOtp(email: string, otp: string): Promise<boolean> {
	const res = await fetch("/api/auth/sign-in/email-otp", {
		method: "POST",
		credentials: "include",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ email, otp, name: "Citoyen demo" }),
	});
	return res.ok;
}
