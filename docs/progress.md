# Progress

Checked: 15 September 2026.

## Live

https://parleralajustice.aliouuuw.workers.dev still serves the old vanilla JS UI until the next deploy.

Owned domain **`sunujustice.chat`** (15 Sep). Bought. Not attached to the Worker yet. Steps: `docs/product.md` (Name and host).

Do not rename the demo to Jokko Ak Yoon. That is the official product.

## One UI in this repo

All public routes use the illustrated preview system in
`web/src/client/preview/`: `/`, `/parler`, `/suivre`, `/d/:code`,
`/connexion`, `/guichet`, `/acte`, and 404. There is no `/preview` route.

Citizen dépôt and greffe share `web/src/client/lib/mock-store.ts` for the
public tour. `/guichet` reads as a connected clerk session (agent name,
sublabel greffe, exit to the citizen space). Horizontal File / En cours /
Clos tabs. Notre impact uses a brand-lit light rake on the flag-green band.

Body copy reads as a live civic service. The independent-demo banner, brand
« démo » / « greffe », and deposit checkbox remain the disclosure.

## Next (queued)

Attach `sunujustice.chat` on Cloudflare when ready. Visual sign-off, then
deploy. After that: Record module extract, T006b (real email OTP), and auth
on the live `/api/guichet/cases` route.

## In progress: T009 visual direction

Pass 6 (two-stage intake, task mode, north star A, live-platform categories)
and the HeroUI control mapping are committed.

Pass 5 baseline:

- Full-screen illustrated hero (3 scenes; hover pauses the fill;
  `--slide-ms: 3.5s`)
- `/suivre` with mock dossiers including `PALJ-7K4M-2QX9`
- In-browser voice (3 min cap, playback, delete, no upload in the preview)
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
- T009 code: HeroUI v3 and Vite client, preview north star, HeroUI control mapping
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
- **Mock dual portal (15 Sep):** session store, greffe files, connected
  session chrome, Connexion **Entrer au greffe**.
- **Impact rake (15 Sep):** brand-lit light pool on the green band. No gold
  point on the title.

## Tests

`bun run test`: 27 of 27 pass in 5 files, checked 15 Sep 2026.

## Git

- Branch: `main`. Owner asked to push this checkpoint.
- Working directly on `main`. No pull request. No GitHub issues.

## Not done

- Attach `sunujustice.chat` to Worker `parleralajustice`
- Product rename (not Jokko Ak Yoon). Candidate: Sunu Justice
- Visual sign-off, then production deploy of the new UI
- **Extract Record module** (receipt, history, dossier) from
  `preview.css` / `Preview.tsx`. Button, Field, Alert, and
  ServiceHeader are done.
- `web/index.html` still loads Public Sans from Google Fonts on every route.
  Owner decision: move the product app to Mona Sans, or scope the link
- Real email (Resend) and close the `/api/demo/otp` backdoor (T006b)
- Access control on `/guichet`: live `GET /api/guichet/cases` returns the case list with no auth
- X thread (T008): wait until a reviewed UI is on the Worker
