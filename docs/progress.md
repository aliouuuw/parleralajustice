# Progress

Checked: 14 September 2026, 04:30 UTC.

## Live

https://parleralajustice.aliouuuw.workers.dev — still the old vanilla JS UI.

The HeroUI rebuild (T009) is on `main` as `3f0a582` plus preview work `f49a4a0`.
Neither commit is pushed. Neither is deployed. Turnstile on case create is live
(T006a).

## Two UIs in this repo

1. **Product app** (`/`, `/parler`, `/suivre`, …) — React + HeroUI v3. This is
   what a deploy of `3f0a582` would ship. Do not restyle it in pass 7.
2. **Visual preview** (`/preview`, `/preview/suivre`) — CSS prototype in
   `web/src/client/preview/`. This is the design authority (`docs/DESIGN.md`).
   It is **not** on the live Worker.

Do not treat a `/preview` sign-off as a deploy of the HeroUI app.

## Next: pass 7 design-system upgrade (not started)

Owner asked to upgrade typography, components, and sections into a mix of:

- **HeroUI** — control language (pills, filled fields, extra-large form radius)
- **Cash App** — consumer vibe closest to the current illustrated preview
- **Stripe** — class and professionalism on operate surfaces

Brief for the next agent: **`docs/UI-HANDOVER.md` §16**. Locked constraints:
§3 and §6. Living tokens: `docs/DESIGN.md`.

Do not restart IA. Do not adopt Figtree, Cash Sans, Sohne, Cash App green, or
HeroUI hue 274. Stay on `preview.css`.

## In progress: T009 visual direction

Pass 6 is **committed** locally as `f49a4a0` (two-stage intake, task mode,
north star A, live-platform categories).

Uncommitted (14 Sep, after pass 6): HeroUI control mapping on `/preview`
(16px fields, pill buttons, filled mint fields). See `preview.css` and a
radius note in `docs/DESIGN.md`.

Pass 5 baseline (inside `f49a4a0` and earlier):

- Full-screen illustrated hero (3 scenes; pause button removed; hover still
  pauses the fill; `--slide-ms: 3.5s`)
- `/preview/suivre` with one fictive dossier `PALJ-7K4M-2QX9`
- In-browser voice (3 min cap, playback, delete, no upload)
- Categories and statuses from the live site (research §J)

Visual sign-off is still pending. The owner has rejected four earlier visual
passes, then iterated. See `docs/UI-HANDOVER.md`.

## Done

- Public briefing in `research/`
- Auth spike: Better Auth 1.7 + D1 email OTP
- `workers.dev` subdomain: `aliouuuw`
- v0 UI: two doors, disclaimer, anonymous code, OTP demo login, voice to R2, `/guichet` seed
- Hygiene: drop Hello World APIs, POST demo OTP, typed JSON, audio key allowlist, HTML escape
- Connexion: e-mail must include a domain (`demo@exemple.sn`)
- Turnstile on case create (T006a), live and verified
- GitHub remote (T007)
- T009 code: HeroUI v3 + Vite client (`3f0a582`) and preview north-star work (`f49a4a0`), local only

## Git

- Branch: `main` at `f49a4a0`, **ahead of `origin/main` by 2**
  - `3f0a582` `feat: implement HeroUI v3 with React and Vite for civic intake`
  - `f49a4a0` `feat(preview): add detailed critique and tracking for civic intake`
- `origin/main` is still `6fba040` (T006a docs)
- Uncommitted at last check: `docs/DESIGN.md`, `web/src/client/preview/preview.css`
  (HeroUI radii / filled fields), plus this progress/handover update
- Remote: https://github.com/aliouuuw/parleralajustice
- No pull request. No GitHub issues. Working directly on `main`. Do not
  auto-commit. Do not push unless the owner asks.

## Not done

- **Pass 7** (typography + components + sections mix). Then visual QA
- Push the two local commits, then a separate authorized production deploy
- Promote `/preview` into the product routes (owner decision after sign-off)
- Real email (Resend) + close the `/api/demo/otp` backdoor (T006b)
- Access control on `/guichet` — live `GET /api/guichet/cases` returns the case list with no auth
- X thread (T008) — wait until a reviewed UI is on the Worker
