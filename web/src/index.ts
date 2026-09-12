import { createAuth } from "./auth";
import { ensureAuthSchema } from "./auth-schema";

export default {
	async fetch(request, env, _ctx): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname.startsWith("/api/auth")) {
			await ensureAuthSchema(env.DB);
			return createAuth(env, request).handler(request);
		}
		switch (url.pathname) {
			case "/api/message":
				return new Response("Parler a la justice");
			case "/api/random":
				return new Response(crypto.randomUUID());
			default:
				return new Response("Not Found", { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
