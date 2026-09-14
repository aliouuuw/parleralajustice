# Design

Last updated: 14 September 2026.

## Authority

**`/preview` is the visual north star.** Tokens, typography, colour roles, and composition live in `web/src/client/preview/preview.css` and `Preview.tsx`. The HeroUI app under `web/src/client/pages/` should converge here after sign-off, not the reverse.

## Direction

A civic intake product with one strong compositional idea: **illustrated scenes set the tone; the task workspace stays flat, legible, and honest.** Not a Ministry homepage. Not startup marketing gradients. One system with three layers on every section: type architecture from Cash App, control shapes from HeroUI, calibration from Stripe. Full spec: `docs/UI-HANDOVER.md` §16.

Shadow the live « Justice Accessible Sénégal » platform for **categories and statuses** (research §J). Do not copy its UI chrome, placeholder stats, or contradictory anonymity claims.

## Composition

- Container max ~1184px (`--container`). Task column up to ~720px beside a 260px rail on desktop.
- **Deposit:** optional full-viewport hero (three illustrated scenes, progress frise; hover pauses the fill). After « Commencer », enter **task mode**: hero and taxonomy band hide; workspace fills the viewport.
- Yellow **taxonomy band** educates before the task; **type selection** happens again on step 2 (required).
- **Channels** (`pv-channels`): owner-selected open composition A, accepted 14 Sep. No repeated hero art, route lines, numbered stops, or nested cards. One centered heading introduces a shared pale-green choice surface with writing and optional voice columns. Familiar pill buttons enter task mode and focus the textarea or Enregistrer; never auto-start recording. A broad Waveform `sim` sits on a pale-green field, explicitly labelled illustrative with the microphone inactive; IntersectionObserver and reduced-motion preference gate animation. Copy states text remains necessary and nothing is transmitted. A secondary strip below lists Vidéo, SMS, USSD, Téléphone with published codes from research §J.2 (`3737`, `*711#`, phone language menu). These channels remain informational and unavailable in the preview. The columns stack on phones.
- **Impact** (`pv-impact`): fictive stats on a full flag-green `--grain` band (Sligoil, white on brand, subtle count-up on enter; reduced motion keeps final values). Two claim cards stay on white below with the aperçu's own honest claims (research §J.5 #3).
- **Two-stage intake:** (1) write message + optional voice, (2) review message, choose type, optional lieu, demo confirmation → receipt.
- **Tracking:** lookup, dossier card, agent reply loop, status glossary (always open, current status in gold).
- Footer links: Ministry, e-Services, e-Sénégal, and **Obtenir un acte** (outbound only).

## Visual system

- **Mona Sans** (self-hosted variable): one family for titles, body and controls. Tokens: body 450, controls 550, labels 650, large titles 620 at 112.5% width (normal width below 600px).
- **Sligoil:** codes, clocks, counters, dates. Never paragraphs or labels.
- Both faces are OFL and include the Wolof letters ŋ and Ŋ (checked 14 Sep, `research/cash-app-foundations.md`). Choice and rejected faces: `docs/UI-HANDOVER.md` §6.
- Flag green `#00853F` as fill (`--color-brand`); green text uses `--color-brand-text`. Gold `#FDEF42` for wait surfaces and focus halo. Red for errors and record dot only.
- Print grain on large colour fields; ink `#14201A` for dark rails.
- Corners: 16px fields (HeroUI form extra-large), pill buttons, 16px panels. Yellow focus ring: ink outline + gold halo. Flag green accent, not the HeroUI playground purple.
- Foundation roles now include `--surface-page`, `--surface-field`, `--surface-panel`, `--surface-record`, `--surface-selected`, `--border-control`, `--border-divider`, `--border-focus`, `--border-channel`, `--border-on-dark`, `--radius-control`, `--radius-button`, `--radius-panel`, `--radius-track`, `--radius-tile`, and a full `--text-*` scale (`--text-display`, `--text-title`, `--text-heading`, `--text-heading-sm`, `--text-lede`, `--text-body`, `--text-brand`, `--text-ui`, `--text-label`, `--text-caption`, `--text-meta`, `--text-micro`, `--text-data`, `--text-code`). New modules must consume semantic roles instead of palette literals or raw px values.

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
- Step 2 **Confirmer** requires type, demo checkbox; then shows receipt. **Modifier** returns to step 1 with draft preserved.
- No Turnstile on `/preview` (static demo). Production app keeps server Turnstile on real create.
- Receipt: copy reference, print, link to `/preview/suivre`. Non-sequential demo code `PALJ-7K4M-2QX9`.
- Reduced motion: no carousel autoplay animation (the pause button was removed; hover and focus pause the fill).

## Copy and disclosure

Independent-demo banner on every screen. Final checkbox states nothing is transmitted. No coat of arms, seal, or Ministry branding. French UI register.

## Verification

`bun run test` includes `web/test/preview.spec.ts` (server-render regressions). Manual browser pass on write → review → back → confirm → receipt → suivi, 320px and 390px, microphone permission paths.
