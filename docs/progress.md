# Progress

Checked: 14 September 2026, 02:41 UTC.

## Live

https://parleralajustice.aliouuuw.workers.dev — still the old vanilla JS UI.

The HeroUI rebuild (T009) is committed locally as `3f0a582` and is **not pushed** and **not deployed**. Turnstile on case create is live (T006a).

## Two UIs in this repo

1. **Product app** (`/`, `/parler`, `/suivre`, …) — React + HeroUI v3. Focused application look. Rules in `docs/DESIGN.md`. This is what `3f0a582` would ship if deployed.
2. **Visual preview** (`/preview`, `/preview/suivre`) — separate CSS prototype. Illustrated hero, flag-green palette, live-platform categories. This is the surface under visual review. It is **not** the live Worker.

Do not treat a `/preview` sign-off as a deploy of the HeroUI app.

## In progress: T009 visual direction + live-platform alignment

Pass 6 on `/preview` is uncommitted (14 Sep): north star **A**, two-stage intake, task mode.

Pass 5 baseline (14 Sep):

- Full-screen illustrated hero (3 scenes, pause control)
- `/preview/suivre` with one fictive dossier `PALJ-7K4M-2QX9`
- In-browser voice (3 min cap, playback, delete, no upload)
- Categories and statuses copied from the live site (research §J)

Live Jokko check (14 Sep, ~00:50 local) is also uncommitted:

- Notes in `research/jokko-ak-yoon-e-justice.md` §J
- Screenshots in `research/jokko-live-2026-09-14/`
- Product decisions in `docs/product.md` (categories, statuses, non-guessable refs)

Visual sign-off is still pending. The owner has rejected four earlier visual passes. See `docs/UI-HANDOVER.md`.

## Done

- Public briefing in `research/`
- Auth spike: Better Auth 1.7 + D1 email OTP
- `workers.dev` subdomain: `aliouuuw`
- v0 UI: two doors, disclaimer, anonymous code, OTP demo login, voice to R2, `/guichet` seed
- Hygiene: drop Hello World APIs, POST demo OTP, typed JSON, audio key allowlist, HTML escape
- Connexion: e-mail must include a domain (`demo@exemple.sn`)
- Turnstile on case create (T006a), live and verified
- GitHub remote (T007)
- T009 code commit: HeroUI v3 + Vite client on `main` at `3f0a582` (local only)

## Git

- Branch: `main` at `3f0a582`, **ahead of `origin/main` by 1 commit** (`feat: implement HeroUI v3 with React and Vite for civic intake`)
- `origin/main` is still `6fba040` (T006a docs)
- Uncommitted: live-platform research + screenshots, product/handover notes, `/preview` pass 5 (tracking page, voice, categories)
- Remote: https://github.com/aliouuuw/parleralajustice
- No pull request. No GitHub issues. Working directly on `main`.

## Not done

- T009 visual QA, then push `3f0a582`, then a separate authorized production deploy
- Promote `/preview` into the product routes, or keep iterating on `/preview` (owner decision)
- Real email (Resend) + close the `/api/demo/otp` backdoor (T006b)
- Access control on `/guichet` — live `GET /api/guichet/cases` returns the case list with no auth
- X thread (T008) — wait until a reviewed UI is on the Worker
