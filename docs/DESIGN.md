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
- **Channels** (`pv-channels`): 6 cards from the live platform's own channel list (research §J.2). Écrit and Voix are live and styled green; Vidéo, SMS, USSD, Téléphone are shown quiet and marked "Annoncé par le service réel" — mocked as content, never as a working control, so the aperçu never claims more than 2 channels.
- **Impact** (`pv-impact`): mirrors the live platform's "Notre Impact" section (research §J.1/J.6), rebuilt honestly — fictive stat row (all 4 numbers labelled "(fictif)"), then 2 cards of claims that are actually true of this aperçu, not the live platform's contradictory security claims (research §J.5 #3).
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

## Next pass (queued)

Pass 7 upgrades this from a styled page into a small system: `--text-*` type
tokens, shared control states, and three density levels (open, working,
record). Spec: `docs/UI-HANDOVER.md` §16. Faces stay as above. Do not change the
locked IA or flag colour roles until the owner says so. Replace this section with
the real type table and control-state list when pass 7 ships.

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
