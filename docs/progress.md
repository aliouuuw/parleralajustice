# Progress

Checked: 14 September 2026, 05:00 UTC.

## Live

https://parleralajustice.aliouuuw.workers.dev still serves the old vanilla JS UI.

The HeroUI rebuild (T009) and the preview work are committed on `main` but not
pushed and not deployed. Turnstile on case create is live (T006a).

## Two UIs in this repo

1. **Product app** (`/`, `/parler`, `/suivre`, and others): React and HeroUI v3.
   A deploy of `main` would ship it. Do not restyle it in pass 7.
2. **Visual preview** (`/preview`, `/preview/suivre`): CSS prototype in
   `web/src/client/preview/`. This is the design authority (`docs/DESIGN.md`).
   It is **not** on the live Worker.

Do not treat a `/preview` sign-off as a deploy of the HeroUI app.

## Next: pass 7 design-system upgrade (not started)

Brief: **`docs/UI-HANDOVER.md` §16**. Evidence:
`research/cash-app-foundations.md`.

- One system, three layers on every section: Cash App type architecture,
  HeroUI control shapes, Stripe calibration.
- Fonts decided 14 Sep: Mona Sans for titles, body and controls (semi-wide
  titles, weight tokens), Sligoil for data. Karrik removed. Done on `/preview`
  (uncommitted). Details: handover §6.
- Order: type tokens, controls, **owner picks one of two compositions**,
  sections, DESIGN.md, verify.
- Baseline: 76 one-off font sizes and 13 one-off radii in `preview.css`.

## In progress: T009 visual direction

Pass 6 (two-stage intake, task mode, north star A, live-platform categories)
and the HeroUI control mapping on `/preview` (16px fields, pill buttons, filled
fields) are committed.

Pass 5 baseline:

- Full-screen illustrated hero (3 scenes; hover pauses the fill;
  `--slide-ms: 3.5s`)
- `/preview/suivre` with one fictive dossier `PALJ-7K4M-2QX9`
- In-browser voice (3 min cap, playback, delete, no upload)
- Categories and statuses from the live site (research §J)

Visual sign-off is still pending. The owner rejected four earlier visual passes.
See `docs/UI-HANDOVER.md`.

## Done

- Public briefing in `research/`
- Auth spike: Better Auth 1.7 and D1 email OTP
- `workers.dev` subdomain: `aliouuuw`
- v0 UI: two doors, disclaimer, anonymous code, OTP demo login, voice to R2, `/guichet` seed
- Hygiene: drop Hello World APIs, POST demo OTP, typed JSON, audio key allowlist, HTML escape
- Connexion: e-mail must include a domain (`demo@exemple.sn`)
- Turnstile on case create (T006a), live and verified
- GitHub remote (T007)
- T009 code: HeroUI v3 and Vite client, preview north star, HeroUI control mapping (local only)
- Pass 7 brief reviewed and rewritten; Cash App foundations and font coverage researched (14 Sep)

## Tests

`bun run test`: 20 of 20 pass in 4 files (7 in `web/test/preview.spec.ts`),
checked 14 Sep 2026.

## Git

- Branch: `main` at `105c02c`, **ahead of `origin/main` by 3**, not pushed
  - `3f0a582` `feat: implement HeroUI v3 with React and Vite for civic intake`
  - `f49a4a0` `feat(preview): add detailed critique and tracking for civic intake`
  - `105c02c` `feat: update design documentation and CSS for HeroUI v3 integration`
- `origin/main` is `6fba040` (T006a docs)
- Uncommitted: the pass 7 brief rewrite (`docs/UI-HANDOVER.md`,
  `docs/progress.md`, `docs/DESIGN.md`, `docs/backlog.json`,
  `research/cash-app-foundations.md`, `research/type-specimen-2026-09-14.png`)
- Uncommitted: Mona Sans type change (`web/src/client/preview/preview.css`,
  `web/public/fonts/README.md`, two `mona-sans-*.woff2` files added,
  `karrik-regular.woff2` deleted, title specimens in `research/`)
- Remote: https://github.com/aliouuuw/parleralajustice
- No pull request. No GitHub issues. Working directly on `main`. Do not
  auto-commit. Do not push unless the owner asks.

## Not done

- **Pass 7** (see above), then visual QA
- `web/index.html` still loads Public Sans from Google Fonts on every route,
  including `/preview`. Owner decision: move the product app to Mona Sans, or
  scope the link to the product app
- Push the three local commits, then a separate authorized production deploy
- Promote `/preview` into the product routes (owner decision after sign-off)
- Real email (Resend) and close the `/api/demo/otp` backdoor (T006b)
- Access control on `/guichet`: live `GET /api/guichet/cases` returns the case list with no auth
- X thread (T008): wait until a reviewed UI is on the Worker
