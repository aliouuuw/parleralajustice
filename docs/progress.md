# Progress

Checked: 14 September 2026, 09:00 UTC.

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

## Next: extract Record module (not started)

Pass 8 (§17) shipped: illustration-led `pv-channels` / flag-green
`pv-impact`. The owner rejected the subsequent route-map channels design as
incoherent and chose A: an open, image-free composition. The local replacement
uses text and optional voice actions, a broad illustrative waveform, and a
secondary strip of announced channels. The owner accepted this direction on
14 Sep. Foundation pass shipped 15 Sep: semantic surface, border, radius,
spacing, and full text-size tokens now exist in `preview.css` and major
preview modules consume them. Button, Field, Alert, and ServiceHeader
modules extracted as the first reusable components. Two mobile display
overrides and `50%` circle radii remain raw by design. Next: extract Record
module.

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
- **Pass 7 shipped:** type tokens, Mona Sans (Karrik removed), control states,
  first `pv-channels` / `pv-impact` sections. Cash App foundations and font
  coverage researched first (14 Sep).
- **Pass 8 shipped:** illustration-led `pv-channels` (Écrit/Voix tiles +
  announced codes beside atelier crop) and flag-green grain `pv-impact`
  band with count-up. Spec: `docs/UI-HANDOVER.md` §17.
- **Foundation pass shipped:** semantic surface, border, radius, spacing,
  and full text-size tokens; major preview modules migrated to those roles
  (15 Sep). Two mobile display overrides and `50%` circle radii remain raw
  by design.
- **Button module extracted:** `web/src/client/preview/Button.tsx` —
  `primary` / `secondary` / `quiet` variants, polymorphic button/anchor,
  optional arrow, ref forwarding. All 13 button usages in `Preview.tsx`
  migrated to it (15 Sep).
- **Field and Alert modules extracted:** `Field.tsx` (textarea/input,
  label with required marker, hint, meta with id) and `Alert.tsx`
  (`ErrorSummary` with title + link list, `InlineError`). All field and
  error usages in `Preview.tsx` migrated to them (15 Sep).
- **ServiceHeader module extracted:** `ServiceHeader.tsx` (brand mark,
  label, sublabel, nav items with current state). Header in `Frame`
  migrated to it (15 Sep).

## Tests

`bun run test`: 21 of 21 pass in 4 files (8 in `web/test/preview.spec.ts`),
checked 14 Sep 2026.

## Git

- Branch: `main` at `300c3eb`, **ahead of `origin/main` by 8**, not pushed
  - `3f0a582` `feat: implement HeroUI v3 with React and Vite for civic intake`
  - `f49a4a0` `feat(preview): add detailed critique and tracking for civic intake`
  - `105c02c` `feat: update design documentation and CSS for HeroUI v3 integration`
  - `304aaad` `feat: refine design documentation and update font integration for HeroUI v3`
  - `782b882` `fix(preview): give empty suivi a job, surface clipboard failures`
  - `4b032eb` `feat(preview): add channel and impact sections from the live platform`
  - `7891d48` `docs: record pass 8 brief and correct stale pass-7 status`
  - `300c3eb` `feat(preview): turn channels and impact back up`
- `origin/main` is `6fba040` (T006a docs)
- Working tree is clean. No pull request. No GitHub issues. Working directly
  on `main`. Do not auto-commit. Do not push unless the owner asks.

## Not done

- **Extract Record module** (receipt, history, dossier) from
  `preview.css` / `Preview.tsx`. Button, Field, Alert, and
  ServiceHeader are done.
- `web/index.html` still loads Public Sans from Google Fonts on every route,
  including `/preview`. Owner decision: move the product app to Mona Sans, or
  scope the link to the product app
- Push the eight local commits, then a separate authorized production deploy
- Promote `/preview` into the product routes (owner decision after sign-off)
- Real email (Resend) and close the `/api/demo/otp` backdoor (T006b)
- Access control on `/guichet`: live `GET /api/guichet/cases` returns the case list with no auth
- X thread (T008): wait until a reviewed UI is on the Worker
