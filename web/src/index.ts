import { createAuth } from "./auth";
import { ensureAuthSchema } from "./auth-schema";
import { ensureCaseSchema, handleAppApi } from "./cases";

let schemaReady = false;

async function ensureSchema(db: D1Database): Promise<void> {
	if (schemaReady) return;
	await ensureAuthSchema(db);
	await ensureCaseSchema(db);
	schemaReady = true;
}

async function currentUser(env: Env, request: Request): Promise<{ email: string; name: string } | null> {
	const auth = createAuth(env, request);
	const session = await auth.api.getSession({ headers: request.headers });
	if (!session?.user?.email) return null;
	return { email: session.user.email, name: session.user.name || session.user.email };
}

export default {
	async fetch(request, env, _ctx): Promise<Response> {
		const url = new URL(request.url);
		if (!url.pathname.startsWith("/api/")) {
			return new Response("Not Found", { status: 404 });
		}
		await ensureSchema(env.DB);
		if (url.pathname.startsWith("/api/auth")) {
			return createAuth(env, request).handler(request);
		}
		const app = await handleAppApi(request, env, () => currentUser(env, request));
		if (app) return app;
		return Response.json({ error: "Not Found" }, { status: 404 });
	},
} satisfies ExportedHandler<Env>;
