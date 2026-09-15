# AGENTS.md — Parler a la justice AI Conventions

## Project overview

Indie civic demo of citizen justice intake in Senegal. Not affiliated with the Ministry.

- **Runtime**: Bun
- **Framework**: Cloudflare Worker + Vite/React (HeroUI v3) via `@cloudflare/vite-plugin`
- **Database**: Cloudflare D1
- **Auth**: Better Auth 1.7, email OTP, native `database: env.DB`
- **Host**: `sunujustice.chat`. Fallback: `parleralajustice.aliouuuw.workers.dev`.
- **Object storage**: R2 bucket `parleralajustice-audio` (binding `AUDIO`)
- **Test runner**: Vitest + `@cloudflare/vitest-plugin`
- **CI**: GitHub Actions deploy on push to `main` (tests + `wrangler deploy`). Secret: `CLOUDFLARE_API_TOKEN`.
- **Package manager**: Bun only. Do not add npm, yarn, or pnpm lockfiles.

## Structure

```
README.md
AGENTS.md
docs/product.md
docs/DESIGN.md
docs/progress.md
docs/backlog.json
research/jokko-ak-yoon-e-justice.md
web/package.json
web/wrangler.jsonc
web/vite.config.mts
web/index.html
web/src/index.ts
web/src/auth.ts
web/src/auth-schema.ts
web/src/cases.ts
web/src/client/
web/migrations/0001_better_auth.sql
web/migrations/0002_cases.sql
web/test/
```

## Key conventions

- **File names**: kebab-case for docs. Worker TS files stay short (`auth.ts`).
- **No `any`**: use generated `Env`, `Doc`, and `Id` types.
- **Verify from repo root**: `bun run test` (runs Vitest in `web/`).
- **Wrangler**: `bunx wrangler` / `bun run deploy`. Development uses `bun run dev` (Vite + Cloudflare plugin on port 5173). Do not use `wrangler deploy` for local work.
- **Auth instance**: create per request with `createAuth(env, request)`. Derive `baseURL` from the request origin.
- **Migrations**: append-only SQL under `web/migrations/`. Apply with `bun run db:migrate` (remote) or `db:migrate:local`.
- **OTP spike**: `spike_otp` stores plaintext OTP. Replace before any public login flow. Do not log OTP values. Demo readout is `POST /api/demo/otp` (never GET).
- **Audio keys**: only `demo/<uuid>.webm`. Reject `..` and other shapes.
- **Compatibility date**: `2026-09-10` so local Vitest workerd can boot.

## What NOT to do

| Rule | Reason |
|------|--------|
| Do not impersonate the Ministry or copy Jokko branding | Independent demo. Distinct name and domain. |
| Do not store real judicial complaints or PII | Loi 2008-12. Demo data only. |
| Do not treat e-service `/admin` JS routes as an open API | Frontend routes. Not a proven unauthenticated API. |
| Do not email WHOIS contacts as a pitch | Receipts go on X. Outreach is DDA/LinkedIn if asked. |
| Do not commit `web/.dev.vars` or secrets | Local and `wrangler secret` only. |
| Do not edit `web/migrations/0001_better_auth.sql` or `0002_cases.sql` | Append a new file. |
| Do not introduce npm/yarn/pnpm or Convex | Stack is frozen: Bun + Worker + D1 + R2. |
| Do not add video/chat in v0 | Voice is MediaRecorder in browser, later. |
| Do not auto-commit unless the human asks | Git commits stay human-gated. |

## Verification

Client markup regression tests use `react-dom/server` in the existing Vitest pool. They do not replace browser interaction or visual checks.

After any code change, run:

```bash
bun run test
```
