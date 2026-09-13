# Progress

Checked: 13 September 2026, 14:05 UTC.

## Live

https://parleralajustice.aliouuuw.workers.dev — Turnstile on case create, production secret set by the user (wrangler secret put), deployed and verified.

Verified: GET `/api/demo/otp` 405, POST route live, `/` and `/guichet` 200, root page loads the Turnstile script, POST `/api/cases` rejects with no token and with a bad token (real siteverify round trip), tests 10/10 passing.

## Done

- Public briefing in `research/`
- Auth spike: Better Auth 1.7 + D1 email OTP
- `workers.dev` subdomain: `aliouuuw`
- v0 UI: two doors, disclaimer, anonymous code, OTP demo login, voice to R2, `/guichet` seed
- Hygiene: drop Hello World APIs, POST demo OTP, typed JSON, audio key allowlist, HTML escape
- Connexion: e-mail must include a domain (`demo@exemple.sn`)
- Tests: 9 passing

## Git

- Branch: `main` at `e25ff4b`
- Remote: https://github.com/aliouuuw/parleralajustice (T007 done)
- No pull request (working directly on `main`)

## Not done

- Real email (Resend) + close the `/api/demo/otp` backdoor (T006b) — see docs/product.md
- Access control on `/guichet` — confirmed live and unprotected: `GET /api/guichet/cases` returns the case list to anyone, no auth
- X thread
