# Progress

Checked: 14 September 2026, 23:50 UTC.

## Live

https://parleralajustice.aliouuuw.workers.dev still serves the old vanilla JS UI.

The HeroUI rebuild (T009) and the preview work are committed on `main` but not
pushed and not deployed. Turnstile on case create is live (T006a).

## One UI in this repo

All public routes use the illustrated preview system in
`web/src/client/preview/`: `/`, `/parler`, `/suivre`, `/d/:code`,
`/connexion`, `/guichet`, `/acte`, and 404. There is no `/preview` route.

Body copy reads as a live civic service. The independent-demo banner, brand
« démo », and deposit checkbox remain the disclosure.

## Next (queued)

Visual sign-off, then push and deploy. After that: Record module extract,
T006b (real email OTP), and auth on `/guichet`.

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
- **Secondary pages share landing chrome** (14 Sep): connexion, acte,
  guichet, 404 use `pv-track` + illustration; brand « Parler à la Justice »
  + « démo »; pill fields aligned to buttons; mobile hero tighter.
- **Copy pass (14 Sep):** body copy no longer repeats « fictif » / « démo ».
  Banner remains « Prototype indépendant ».

## Tests

`bun run test`: 21 of 21 pass in 4 files (8 in `web/test/preview.spec.ts`),
checked 14 Sep 2026, 23:47 UTC.

## Git

- Branch: `main`, **ahead of `origin/main` by 24**, not pushed
  - `f2340b3` `copy(site): let the banner carry the demo disclosure`
  - `776e905` `style(site): align controls, brand, and mobile hero`
  - `64be24b` `feat(site): align secondary pages with landing chrome`
  - plus earlier preview, HeroUI, and token commits
- `origin/main` is `6fba040` (T006a docs)
- Working tree is clean. No pull request. No GitHub issues. Working directly
  on `main`. Do not auto-commit. Do not push unless the owner asks.

## Not done

- Visual sign-off, then push and production deploy of the new UI
- **Extract Record module** (receipt, history, dossier) from
  `preview.css` / `Preview.tsx`. Button, Field, Alert, and
  ServiceHeader are done.
- `web/index.html` still loads Public Sans from Google Fonts on every route.
  Owner decision: move the product app to Mona Sans, or scope the link
- Real email (Resend) and close the `/api/demo/otp` backdoor (T006b)
- Access control on `/guichet`: live `GET /api/guichet/cases` returns the case list with no auth
- X thread (T008): wait until a reviewed UI is on the Worker
