import { env, SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

const ORIGIN = "http://example.com";

describe("v0 cases", () => {
	it("creates an anonymous demo case and returns a tracking code", async () => {
		const create = await SELF.fetch(`${ORIGIN}/api/cases`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				kind: "information",
				channel: "anonymous",
				body: "Demonstration. Question fictive sur un delai d'audience.",
				demoConfirmed: true,
			}),
		});
		expect(create.status).toBe(200);
		const created = (await create.json()) as { trackingCode: string };
		expect(created.trackingCode).toMatch(/^PALJ-[A-Z0-9]{4}$/);

		const read = await SELF.fetch(`${ORIGIN}/api/cases/${created.trackingCode}`);
		expect(read.status).toBe(200);
		const dossier = (await read.json()) as {
			channel: string;
			events: Array<{ label: string }>;
			displayName: string | null;
		};
		expect(dossier.channel).toBe("anonymous");
		expect(dossier.displayName).toBeNull();
		expect(dossier.events[0]?.label).toBe("Dossier reçu");
	});

	it("rejects a case without the demo checkbox", async () => {
		const create = await SELF.fetch(`${ORIGIN}/api/cases`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				kind: "signalement",
				channel: "anonymous",
				body: "Ceci devrait etre refuse.",
				demoConfirmed: false,
			}),
		});
		expect(create.status).toBe(400);
	});

	it("rejects invalid JSON on case create", async () => {
		const create = await SELF.fetch(`${ORIGIN}/api/cases`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: "{",
		});
		expect(create.status).toBe(400);
	});

	it("rejects an identified case without a session", async () => {
		const create = await SELF.fetch(`${ORIGIN}/api/cases`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				kind: "information",
				channel: "identified",
				body: "Demonstration. Dossier identifie sans session.",
				demoConfirmed: true,
			}),
		});
		expect(create.status).toBe(401);
	});

	it("lists seeded guichet cases", async () => {
		const res = await SELF.fetch(`${ORIGIN}/api/guichet/cases`);
		expect(res.status).toBe(200);
		const body = (await res.json()) as { cases: Array<{ tracking_code: string }> };
		const codes = body.cases.map((row) => row.tracking_code);
		expect(codes).toContain("PALJ-SEED1");
		expect(codes).toContain("PALJ-SEED2");
	});

	it("rejects GET on demo OTP and path-style audio keys", async () => {
		const getOtp = await SELF.fetch(`${ORIGIN}/api/demo/otp?email=hygiene@example.com`);
		expect(getOtp.status).toBe(405);

		const audio = await SELF.fetch(`${ORIGIN}/api/audio?key=demo/../secret.webm`);
		expect(audio.status).toBe(404);

		const missing = await SELF.fetch(`${ORIGIN}/api/message`);
		expect(missing.status).toBe(404);
	});

	it("returns a demo OTP only after send, via POST", async () => {
		const email = "hygiene-otp@example.com";
		const send = await SELF.fetch(`${ORIGIN}/api/auth/email-otp/send-verification-otp`, {
			method: "POST",
			headers: {
				Origin: ORIGIN,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, type: "sign-in" }),
		});
		expect(send.status).toBe(200);

		const stored = await env.DB.prepare("SELECT otp FROM spike_otp WHERE email = ?")
			.bind(email)
			.first<{ otp: string }>();
		expect(stored?.otp).toMatch(/^\d{6}$/);

		const demo = await SELF.fetch(`${ORIGIN}/api/demo/otp`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ email }),
		});
		expect(demo.status).toBe(200);
		const payload = (await demo.json()) as { otp: string; demo: boolean };
		expect(payload.otp).toBe(stored?.otp);
		expect(payload.demo).toBe(true);
	});
});
