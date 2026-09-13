# Progress

Checked: 13 September 2026, 00:20 UTC.

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

- Branch: `main` at `9dd58e6` (`feat: ship civic v0 intake with cases, voice, and OTP`)
- No GitHub remote
- No pull request

## Not done

- Redeploy so live matches POST OTP
- GitHub remote (T007)
- Turnstile (T006)
- Real email (Resend)
- Access control on `/guichet`
- X thread
