# Progress

Checked: 13 September 2026, 13:35 UTC.

## Live

https://parleralajustice.aliouuuw.workers.dev — Worker version `6782887f`.

Live still serves the pre-hygiene Worker (GET `/api/demo/otp`). Redeploy so connexion matches POST.

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

- Redeploy so live matches POST OTP — blocked on prod-deploy confirmation, see below
- Turnstile on case create (T006a) — rate limits already wired, this is Turnstile only
- Real email (Resend) + close the `/api/demo/otp` backdoor (T006b) — see docs/product.md
- Access control on `/guichet`
- X thread
