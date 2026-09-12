import { env, SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

const EMAIL = "spike@example.com";
const ORIGIN = "http://example.com";

function cookieHeader(response: Response): string {
	return response.headers
		.getSetCookie()
		.map((cookie) => cookie.split(";")[0])
		.join("; ");
}

describe("Better Auth email OTP spike", () => {
	it("sends an OTP, signs in, and returns a session", async () => {
		const send = await SELF.fetch(`${ORIGIN}/api/auth/email-otp/send-verification-otp`, {
			method: "POST",
			headers: {
				Origin: ORIGIN,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: EMAIL, type: "sign-in" }),
		});
		expect(send.status).toBe(200);
		expect(await send.json()).toEqual({ success: true });

		const stored = await env.DB.prepare(
			"SELECT otp FROM spike_otp WHERE email = ?",
		)
			.bind(EMAIL)
			.first<{ otp: string }>();
		expect(stored?.otp).toMatch(/^\d{6}$/);

		const signIn = await SELF.fetch(`${ORIGIN}/api/auth/sign-in/email-otp`, {
			method: "POST",
			headers: {
				Origin: ORIGIN,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: EMAIL, otp: stored?.otp, name: "Spike" }),
		});
		expect(signIn.status).toBe(200);
		const signed = (await signIn.json()) as { token: string; user: { email: string } };
		expect(signed.user.email).toBe(EMAIL);
		expect(signed.token).toBeTruthy();

		const session = await SELF.fetch(`${ORIGIN}/api/auth/get-session`, {
			headers: {
				Origin: ORIGIN,
				Cookie: cookieHeader(signIn),
			},
		});
		expect(session.status).toBe(200);
		const body = (await session.json()) as { user: { email: string } } | null;
		expect(body?.user.email).toBe(EMAIL);
	});
});
