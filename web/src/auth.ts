import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";

export function createAuth(env: Env, request: Request) {
	const origin = new URL(request.url).origin;
	return betterAuth({
		appName: "Parler a la justice",
		secret: env.BETTER_AUTH_SECRET,
		baseURL: origin,
		basePath: "/api/auth",
		database: env.DB,
		trustedOrigins: [origin],
		telemetry: { enabled: false },
		emailAndPassword: { enabled: false },
		plugins: [
			emailOTP({
				otpLength: 6,
				expiresIn: 300,
				storeOTP: "plain",
				async sendVerificationOTP({ email, otp }) {
					await env.DB.prepare(
						`INSERT INTO spike_otp (email, otp, created_at)
						 VALUES (?, ?, ?)
						 ON CONFLICT(email) DO UPDATE SET
						   otp = excluded.otp,
						   created_at = excluded.created_at`,
					)
						.bind(email, otp, Date.now())
						.run();
				},
			}),
		],
	});
}
