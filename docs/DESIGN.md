# Design

Last updated: 14 September 2026.

## Authority

**`/preview` is the visual north star.** Tokens, typography, colour roles, and composition live in `web/src/client/preview/preview.css` and `Preview.tsx`. The HeroUI app under `web/src/client/pages/` should converge here after sign-off, not the reverse.

## Direction

A civic intake product with one strong compositional idea: **illustrated scenes set the tone; the task workspace stays flat, legible, and honest.** Not a Ministry homepage. Not startup marketing gradients. References: precision of Tremor-style data surfaces, warmth of rounded controls and illustration-led storytelling.

Shadow the live « Justice Accessible Sénégal » platform for **categories and statuses** (research §J). Do not copy its UI chrome, placeholder stats, or contradictory anonymity claims.

## Composition

- Container max ~1184px (`--container`). Task column up to ~720px beside a 260px rail on desktop.
- **Deposit:** optional full-viewport hero (three illustrated scenes, progress frise with pause). After « Commencer », enter **task mode**: hero and taxonomy band hide; workspace fills the viewport.
- Yellow **taxonomy band** educates before the task; **type selection** happens again on step 2 (required).
- **Two-stage intake:** (1) write message + optional voice, (2) review message, choose type, optional lieu, demo confirmation → receipt.
- **Tracking:** lookup, dossier card, agent reply loop, collapsible status glossary.
- Footer links: Ministry, e-Services, e-Sénégal, and **Obtenir un acte** (outbound only).

## Visual system

- **Karrik** — headings and identity (`font-weight: 400` only).
- **Public Sans** — body and controls.
- **Sligoil** — references, counters, timestamps.
- Flag green `#00853F` as fill (`--color-brand`); green text uses `--color-brand-text`. Gold `#FDEF42` for wait surfaces and focus halo. Red for errors and record dot only.
- Print grain on large colour fields; ink `#14201A` for dark rails.
- Corners: 10px controls, 16px panels. Yellow focus ring: ink outline + gold halo.

## Interaction contract (preview)

- Text required: 12–4000 characters trimmed. Voice optional, max 3 minutes, stays on device in this preview (not uploaded).
- Step 1 **Continuer** validates message only; opens review. Recording blocks continue.
- Step 2 **Confirmer** requires type, demo checkbox; then shows receipt. **Modifier** returns to step 1 with draft preserved.
- No Turnstile on `/preview` (static demo). Production app keeps server Turnstile on real create.
- Receipt: copy reference, print, link to `/preview/suivre`. Non-sequential demo code `PALJ-7K4M-2QX9`.
- Reduced motion: no carousel autoplay animation; pause control hidden.

## Copy and disclosure

Independent-demo banner on every screen. Final checkbox states nothing is transmitted. No coat of arms, seal, or Ministry branding. French UI register.

## Verification

`bun run test` includes `web/test/preview.spec.ts` (server-render regressions). Manual browser pass on write → review → back → confirm → receipt → suivi, 320px and 390px, microphone permission paths.
