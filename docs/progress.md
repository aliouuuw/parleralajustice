# Progress

Checked: 14 September 2026, 09:00 UTC.

## Live

https://parleralajustice.aliouuuw.workers.dev still serves the old vanilla JS UI.

The HeroUI rebuild (T009) and the preview work are committed on `main` but not
pushed and not deployed. Turnstile on case create is live (T006a).

## One UI in this repo

**Citizen intake** (`/`, `/parler`, `/suivre`, `/d/:code`): the illustrated
preview system in `web/src/client/preview/`. Connexion, guichet, and acte still
use the previous HeroUI chrome. There is no `/preview` route.

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
- **Field prop leak fixed:** `kind`, `meta`, and `metaId` no longer reach
  the DOM control; React warning gone (14 Sep).

## Tests

`bun run test`: 21 of 21 pass in 4 files (8 in `web/test/preview.spec.ts`),
checked 14 Sep 2026.

## Git

- Branch: `main`, **ahead of `origin/main` by 17**, not pushed
  - `adf76c2` `feat(preview): redesign citizen channel choices`
  - `6b12e9e` `feat(preview): add semantic foundation tokens and migrate modules`
  - `6321b69` `feat(preview): complete semantic token scale and migrate raw values`
  - `bf9271c` `feat(preview): extract Button as first reusable module`
  - `5c1a2b8` `feat(preview): extract Field and Alert as reusable modules`
  - `c7bd423` `feat(preview): extract ServiceHeader as reusable module`
  - `d2eb23a` `docs: add pass 9 handover section for foundation and component work`
  - plus `3f0a582`–`300c3eb`: HeroUI rebuild, preview critique, passes 7 and 8
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
- Promote `/preview` into the product routes (done 14 Sep). `/preview` routes removed.
- Real email (Resend) and close the `/api/demo/otp` backdoor (T006b)
- Access control on `/guichet`: live `GET /api/guichet/cases` returns the case list with no auth
- X thread (T008): wait until a reviewed UI is on the Worker
