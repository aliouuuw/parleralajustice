# Progress

Checked: 13 September 2026, 04:37 UTC.

## Live

https://parleralajustice.aliouuuw.workers.dev — still serves the OLD vanilla JS UI. The HeroUI rebuild (T009) is local-only, not deployed. Turnstile on case create is live and verified (see T006a below); that part of production is current.

## In progress: T009, HeroUI v3 UI rebuild

- 13 Sep 01:55 UTC: IA/UX/UI rewrite. Home is the form. Flag inks (green proceed, yellow stub, red stamp). Guichet in the footer. `docs/DESIGN.md` replaced.

- Replaced the hand-rolled vanilla JS UI with React + Vite + Tailwind v4 + HeroUI v3.
- Current direction: user rejected decorative civic modernism and approved a focused application product, referencing Stripe onboarding, Mercury and Linear. Public Sans, one green accent, neutral progress rail and white task workspace (see `docs/DESIGN.md`).
- The initial React port covered all 8 routes. Intake now has two stages: write with optional audio, then review the message, choose the existing request type and confirm submission. Back/edit retains the draft and completed audio.
- `web/public/` (old `index.html`/`app.js`/`styles.css`) deleted in the earlier port. No backend changes in this intake pass.
- Earlier critique fixes retained: receipt copy/print, read rate limits, sign-out and French register labels/dates. The new intake guards audio-in-progress and duplicate submission. Turnstile mounts explicitly on review and cleans up when leaving it.
- Verification: 13/13 Vitest tests, including three new initial-markup regressions that failed before implementation; Worker and client TypeScript checks; production build. The latest design detector reports no findings. Build retains the existing >500 kB JavaScript chunk warning.
- User explicitly chose manual review instead of cached Chromium. No responsive, microphone or interactive browser pass is claimed. Check write/review/back, final confirmation, Turnstile, receipt, login and register before visual sign-off.
- Not yet done: user visual sign-off, then separately authorized commit and production deploy.

## Done

- Public briefing in `research/`
- Auth spike: Better Auth 1.7 + D1 email OTP
- `workers.dev` subdomain: `aliouuuw`
- v0 UI: two doors, disclaimer, anonymous code, OTP demo login, voice to R2, `/guichet` seed (now on HeroUI, see T009 above)
- Hygiene: drop Hello World APIs, POST demo OTP, typed JSON, audio key allowlist, HTML escape
- Connexion: e-mail must include a domain (`demo@exemple.sn`)
- Turnstile on case create (T006a), live and verified
- Tests: 10 passing

## Git

- Branch: `main` at `6fba040`, in sync with `origin/main`
- T009 is uncommitted: modified docs, `web/` config, `web/src/cases.ts`, and `web/test/auth.spike.spec.ts`; deleted `web/public/*`; untracked `web/src/client/` plus `web/index.html` / `web/vite.config.mts` / `web/tsconfig.client.json` / `.impeccable/`
- Remote: https://github.com/aliouuuw/parleralajustice (T007 done)
- No pull request. No GitHub issues. Working directly on `main`.

## Not done

- T009 visual QA + commit + deploy (see above)
- Real email (Resend) + close the `/api/demo/otp` backdoor (T006b) — see docs/product.md
- Access control on `/guichet` — confirmed live and unprotected: `GET /api/guichet/cases` returns the case list to anyone, no auth
- X thread (T008)
