# Design

Last updated: 15 September 2026.

## Authority

**`/` is the visual north star.** Tokens, typography, colour roles, and composition live in `web/src/client/preview/preview.css` and `Preview.tsx`. Connexion, acte, guichet, and 404 reuse the suivi split (`pv-track` + illustration) and the gold helper band. They do not use a nested mint form card.

## Direction

A civic intake product with one strong compositional idea: **illustrated scenes set the tone; the task workspace stays flat, legible, and honest.** Not a Ministry homepage. Not startup marketing gradients. One system with three layers on every section: type architecture from Cash App, control shapes from HeroUI, calibration from Stripe. Full spec: `docs/UI-HANDOVER.md` §16.

Shadow the live « Justice Accessible Sénégal » platform for **categories and statuses** (research §J). Do not copy its UI chrome, placeholder stats, or contradictory anonymity claims.

## Composition

- Container max ~1184px (`--container`). Task column up to ~720px beside a 260px rail on desktop.
- **Deposit:** optional full-viewport hero (three illustrated scenes, progress frise; hover pauses the fill). On desktop, notice + header + hero equal `100dvh`. After « Commencer », enter **task mode**: hero and taxonomy band hide; workspace fills the viewport.
- Yellow **taxonomy band** educates before the task; **type selection** is a HeroUI select on step 1 (required).
- **Channels** (`pv-channels`): owner-selected open composition A, accepted 14 Sep. No repeated hero art, route lines, numbered stops, or nested cards. One centered heading introduces a shared pale-green choice surface with writing and optional voice columns. Familiar pill buttons enter task mode and focus the textarea or Enregistrer; never auto-start recording. A broad Waveform `sim` sits on a pale-green field, explicitly labelled illustrative with the microphone inactive; IntersectionObserver and reduced-motion preference gate animation. Copy states text remains necessary; the voice completes it. A secondary strip below lists Vidéo, SMS, USSD, Téléphone with published codes from research §J.2 (`3737`, `*711#`, phone language menu). These channels remain informational and unavailable here. The columns stack on phones.
- **Impact** (`pv-impact`): example stats on a full flag-green band. Depth from a second tone (`--color-brand-lit` light rake) plus print grain and an ink floor. Sligoil figures, white labels, gold units and rules. Count-up on enter; the rake runs only while the band is on screen. Reduced motion keeps final values and a still rake. No gold point above the title. Labels have no « fictif » suffix. Disclosure sits in the site banner.
- **Greffe** (`/guichet`): connected clerk session. Brand sublabel « greffe », agent name, one exit to the citizen space. Horizontal File / En cours / Clos tabs. No left app rail.
- **Two-stage intake:** (1) choose type, write message + optional voice, (2) review, optional lieu, deposit confirmation checkbox, Turnstile → receipt with a stored tracking code.
- **Tracking:** lookup, dossier card, agent reply loop, status glossary (always open, current status in gold).
- Footer links: Ministry, e-Services, e-Sénégal, and **Obtenir un acte** (outbound only).

## Visual system

- **Mona Sans** (self-hosted variable): one family for titles, body and controls. Body 450, controls 550, labels 650, section titles 700 at 112.5% width, display 800 at 118.75% width (normal width below 600px). Display tracking `-0.03em`, title `-0.022em`. Hero and suivi titles use `--text-display` (hero desktop caps at 60px, one line, so copy stays in the illustration sky). Section titles use `--text-title`; column and status titles stay `--text-heading` without stretch.
- **Sligoil:** codes, clocks, counters, dates. Never paragraphs or labels. Impact numbers and receipt codes use display or title size in Sligoil.
- Both faces are OFL and include the Wolof letters ŋ and Ŋ (checked 14 Sep, `research/cash-app-foundations.md`). Choice and rejected faces: `docs/UI-HANDOVER.md` §6.
- Flag green `#00853F` as fill (`--color-brand`); green text uses `--color-brand-text`. Gold `#FDEF42` for wait surfaces and focus halo. Red for errors and record dot only.
- Print grain on large colour fields; ink `#14201A` for dark rails.
- Corners: pill single-line fields and buttons (48px, `--radius-button`), 24px textarea, 16px panels. Yellow focus ring: ink outline + gold halo. Flag green accent, not the HeroUI playground purple.
- Foundation roles now include `--surface-page`, `--surface-field`, `--surface-panel`, `--surface-record`, `--surface-selected`, `--border-control`, `--border-divider`, `--border-focus`, `--border-channel`, `--border-on-dark`, `--radius-control`, `--radius-button`, `--radius-panel`, `--radius-track`, `--radius-tile`, and a full `--text-*` scale (`--text-display`, `--text-title`, `--text-heading`, `--text-heading-sm`, `--text-lede`, `--text-body`, `--text-brand`, `--text-ui`, `--text-label`, `--text-caption`, `--text-meta`, `--text-micro`, `--text-data`, `--text-code`). New modules must consume semantic roles instead of palette literals or raw px values.
- **Field vs panel:** fields are white (`--surface-field`) with a visible `--border-control`. Panels stay brand-soft (`--surface-panel`) for grouping and guidance. Records and claim blocks use white `--surface-record` with `--border-divider` when they need an edge. Do not paint inputs and cards the same pale green.
- **Service header:** sticky civic bar. Brand is « Parler à la Justice » plus a small « démo » on citizen routes, « greffe » on `/guichet`. Citizen jobs: déposer, suivre, acte. On greffe: Espace citoyen, agent session, Quitter. Account action is « Connexion » on the citizen site.

## Next pass (queued)

Pass 8 shipped (14 Sep 2026): `pv-channels` / `pv-impact` turned back up
per `docs/UI-HANDOVER.md` §17 (illustration-led tiles, announced codes,
flag-green impact band, scroll crop parallax, count-up). Locked IA and flag
roles unchanged.

Foundation pass shipped (15 Sep 2026): semantic surface, border, radius,
spacing, and text-size tokens added; major preview modules migrated to
those roles. Two mobile display overrides (`34px`, `32px`) and `50%` circle
radii remain raw by design. Button, Field, Alert, and ServiceHeader
modules extracted as the first reusable components (`Button.tsx`,
`Field.tsx`, `Alert.tsx`, `ServiceHeader.tsx`). Button: `primary` /
`secondary` / `quiet` variants, polymorphic button/anchor, optional arrow,
ref forwarding. Field: textarea/input, label with required marker, hint,
meta with id. Alert: `ErrorSummary` (title + link list) and `InlineError`.
ServiceHeader: brand mark, label, sublabel, nav items with current state.
Next: extract Record module.

## Interaction contract (preview)

- Text required: 12 to 4000 characters trimmed. Voice optional, max 3 minutes, stays on device in this preview (not uploaded).
- Step 1 **Continuer** validates message only; opens review. Recording blocks continue.
- Step 2 **Confirmer le dépôt** requires type and the deposit checkbox; then shows receipt. **Modifier** returns to step 1 with draft preserved.
- Turnstile on confirm. Receipt: copy reference, print, link to `/suivre`. Codes come from `POST /api/cases`.
- Reduced motion: no carousel autoplay animation (the pause button was removed; hover and focus pause the fill).

## Copy and disclosure

Independent-demo banner on every screen: not the Ministry; no request is transmitted. Body copy reads as a live civic service. Brand « démo » and the banner carry the disclosure. The step-2 checkbox confirms the deposit. No coat of arms, seal, or Ministry branding. French UI register. No locale switcher.

## Verification

`bun run test` includes `web/test/preview.spec.ts` and `web/test/mock-store.spec.ts` (server-render regressions). Manual browser pass on write → review → back → confirm → receipt → suivi → greffe, 320px and 390px, microphone permission paths.
