import type { CaseDossier } from "./api";

export const SAMPLE_CODE = "PALJ-7K4M-2QX9";
export const MOCK_CHANGE = "palj-mock-change";

const KEY = "palj-mock-dossiers";
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const MOCK_STATUSES = [
	"Reçue",
	"Assignée",
	"En cours de traitement",
	"En attente d'informations",
	"Résolue",
	"Rejetée",
	"Clôturée",
] as const;

export type MockStatus = (typeof MOCK_STATUSES)[number];
export type MockTab = "file" | "progress" | "closed";

export type MockEvent = { id: string; label: string; at: number };

export type MockDossier = {
	trackingCode: string;
	kind: string;
	typeLabel: string;
	channel: "anonymous" | "identified";
	status: MockStatus;
	body: string;
	place: string;
	hasVoice: boolean;
	createdAt: number;
	events: MockEvent[];
};

export const NEXT_STATUS: Record<MockStatus, MockStatus[]> = {
	Reçue: ["Assignée"],
	Assignée: ["En cours de traitement"],
	"En cours de traitement": ["En attente d'informations", "Résolue", "Rejetée"],
	"En attente d'informations": ["En cours de traitement", "Résolue"],
	Résolue: ["Clôturée"],
	Rejetée: ["Clôturée"],
	Clôturée: [],
};

export function tabForStatus(status: MockStatus): MockTab {
	if (status === "Reçue" || status === "Assignée") return "file";
	if (status === "En cours de traitement" || status === "En attente d'informations") return "progress";
	return "closed";
}

export function mintCode(random: () => number = Math.random): string {
	const chunk = (n: number) =>
		Array.from({ length: n }, () => {
			const mark = ALPHABET[Math.floor(random() * ALPHABET.length)];
			return mark ?? "A";
		}).join("");
	return `PALJ-${chunk(4)}-${chunk(4)}`;
}

const SEED: MockDossier[] = [
	{
		trackingCode: SAMPLE_CODE,
		kind: "information",
		typeLabel: "Demande d'information",
		channel: "anonymous",
		status: "Reçue",
		body: "Je souhaite comprendre le déroulement d'une audience au tribunal d'instance.",
		place: "Pikine",
		hasVoice: false,
		createdAt: Date.UTC(2026, 8, 12, 9, 20),
		events: [{ id: "seed-7k4m-1", label: "Reçue", at: Date.UTC(2026, 8, 12, 9, 20) }],
	},
	{
		trackingCode: "PALJ-2N8P-4HW1",
		kind: "reclamation",
		typeLabel: "Réclamation",
		channel: "anonymous",
		status: "En cours de traitement",
		body: "Le délai annoncé pour un extrait n'a pas été respecté. Je demande une mise à jour.",
		place: "Dakar",
		hasVoice: false,
		createdAt: Date.UTC(2026, 8, 10, 14, 5),
		events: [
			{ id: "seed-2n8p-1", label: "Reçue", at: Date.UTC(2026, 8, 10, 14, 5) },
			{ id: "seed-2n8p-2", label: "Assignée", at: Date.UTC(2026, 8, 10, 15, 40) },
			{ id: "seed-2n8p-3", label: "En cours de traitement", at: Date.UTC(2026, 8, 11, 8, 10) },
		],
	},
];

function cloneSeed(): MockDossier[] {
	return SEED.map((row) => ({ ...row, events: row.events.map((event) => ({ ...event })) }));
}

let memory: MockDossier[] = cloneSeed();

function read(): MockDossier[] {
	if (typeof sessionStorage === "undefined") return memory;
	const raw = sessionStorage.getItem(KEY);
	if (!raw) {
		memory = cloneSeed();
		sessionStorage.setItem(KEY, JSON.stringify(memory));
		return memory;
	}
	try {
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return memory;
		memory = parsed as MockDossier[];
		return memory;
	} catch {
		return memory;
	}
}

function write(rows: MockDossier[]): void {
	memory = rows;
	if (typeof sessionStorage === "undefined") return;
	sessionStorage.setItem(KEY, JSON.stringify(rows));
	window.dispatchEvent(new Event(MOCK_CHANGE));
}

export function listDossiers(): MockDossier[] {
	return read().slice().sort((a, b) => b.createdAt - a.createdAt);
}

export function getDossier(code: string): MockDossier | null {
	const needle = code.trim().toUpperCase();
	return read().find((row) => row.trackingCode === needle) ?? null;
}

export function createDossier(input: {
	kind: string;
	typeLabel: string;
	body: string;
	place: string;
	channel: "anonymous" | "identified";
	hasVoice: boolean;
}): MockDossier {
	const now = Date.now();
	const existing = new Set(read().map((row) => row.trackingCode));
	let trackingCode = mintCode();
	while (existing.has(trackingCode)) trackingCode = mintCode();
	const row: MockDossier = {
		trackingCode,
		kind: input.kind,
		typeLabel: input.typeLabel,
		channel: input.channel,
		status: "Reçue",
		body: input.body,
		place: input.place,
		hasVoice: input.hasVoice,
		createdAt: now,
		events: [{ id: `evt-${now}`, label: "Reçue", at: now }],
	};
	write([row, ...read()]);
	return row;
}

export function setDossierStatus(code: string, status: MockStatus): MockDossier | null {
	const rows = read();
	const index = rows.findIndex((row) => row.trackingCode === code);
	const current = rows[index];
	if (!current) return null;
	if (!NEXT_STATUS[current.status].includes(status)) return current;
	const now = Date.now();
	const next: MockDossier = {
		...current,
		status,
		events: [...current.events, { id: `evt-${now}`, label: status, at: now }],
	};
	rows[index] = next;
	write(rows);
	return next;
}

export function toCaseDossier(row: MockDossier): CaseDossier {
	const body = row.place ? `${row.body}\n\nLieu : ${row.place}` : row.body;
	return {
		trackingCode: row.trackingCode,
		kind: row.kind,
		channel: row.channel,
		status: row.status,
		body,
		audioKey: null,
		createdAt: row.createdAt,
		displayName: row.channel === "identified" ? "Compte" : null,
		events: row.events.map((event) => ({
			id: event.id,
			case_id: row.trackingCode,
			label: event.label,
			at: event.at,
		})),
	};
}
