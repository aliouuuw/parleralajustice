# UI handover

Written 13 September 2026, updated 14 September 2026. For the next agent
working on the visual design of Parler à la justice.

**Current assignment is §16 (pass 7).** Upgrade the `/preview` design system
(typography, components, sections) to a mix of HeroUI control language, Cash
App consumer register, and Stripe professional operate. Do not restart the
information architecture. Do not restyle the live Worker.

Read in this order:

1. `research/jokko-ak-yoon-e-justice.md` (product truth, especially §J)
2. This file §3 (locked), §4 (rejected attempts), §6 (type and colour), §16 (the job)
3. `docs/DESIGN.md` (current tokens)
4. `http://localhost:5173/preview` and `/preview/suivre` (`bun run --cwd web dev`)

---

## 1. What the product is

An independent design demonstration that shadows **Jokko Ak Yoon**, the
citizen-dialogue platform the Senegalese Ministry of Justice launched on
10 September 2026.

A citizen writes or records a message. The system returns a tracking code. The
citizen returns to that code to follow the file. That is the whole service.

The live site at `jokkooakyoon.sn` (title « Justice Accessible Sénégal »)
accepts six request types that **differ from the APS dispatch**: Demande
d'information, Réclamation, Difficulté rencontrée, Signalement, Suggestion ou
observation, Autre. There is no Contestation on the live form. The demo shadows
that live list (research §J.3), not the APS list.

It explicitly does **not** deliver administrative or judicial acts; those live on
separate e-Service and e-Sénégal platforms. All of that is documented in the
research file with sources.

## 2. What the owner actually wants

Stated across several sessions, in their own framing:

1. A portfolio piece strong enough to post on X and to open a conversation with
   a government agency or a civic-tech shop.
2. **"The beginning of what could be the Senegalese government design system."**
   This is the real ambition. Not one page: a system.
3. Senegalese flag colours used **appropriately, with a little artistic
   approach**. Not wallpaper, not decoration, not a tricolour band.
4. Reference points they named themselves:
   - **HeroUI** for freshness and softness. They linked a theme at
     `hue 148.79, chroma 0.132, lightness 0.553, radius large, form radius extra-large`.
   - **Tremor** for seriousness, classiness and simplicity in a good way.
5. Specific gaps they called out on the current build: colorization, contrast,
   micro-animations, delightfulness.

They are still not satisfied after the third attempt. Treat the visual direction
as unsolved.

## 3. What is locked, and must not be relitigated

The owner approved these. Changing them is churn, not progress.

- **Information architecture.** GOV.UK start-page pattern. The first viewport
  describes the service, names the six request types, and offers one primary
  action. The form begins immediately below the fold. One URL.
- **The two-stage intake.** Write, then review and submit. The message is the
  centre. Voice supplements text and never replaces it.
- **Honest disclosure everywhere.** Independent demo, not a Ministry service,
  no request reaches the justice system. This is non-negotiable and it is the
  reason several tempting design moves are off the table.
- **No Ministry impersonation.** No coat of arms, no official seal, no borrowed
  state branding. The identity block states its own prototype status.
- **French copy**, in the register of the product.

## 4. The three rejected attempts, and the reason each failed

This is the most useful section. Read it twice.

### Attempt 1: the atmospheric hero

Full-bleed deep green field with grain and a directional light rake. An
oversized watermark wordmark. A live canvas waveform as the hero object. A
récépissé drawn as a tilted ticket with a perforated stub edge.

**Verdict:** *"way too toy-y or game-y. Not something a serious government
agency would really use."*

**Why it failed:** it was a product landing page wearing civic copy. The green
field, the watermark and the tilt are startup-marketing moves. A public service
does not look like that, and a reviewer from an agency reads the register before
they read the craft.

### Attempt 2: the institutional rebuild

White and paper surfaces. A bloc-marque identity block. A start-page structure.
Flag colours as functional roles. A coverage table. A limits section.

**Verdict:** *"I sort of like the IA and UX. UI needs more work: colorization,
contrast, micro-animations, delightfulness."*

**Why it partly succeeded:** the structure landed and is now locked.

**Why it failed:** the visual layer was correct and inert. Restraint with no
invention. It cleared every checklist and had no point of view.

### Attempt 3: the flag palette and the star

Flag-derived OKLCH palette. Filled green identity block. A five-pointed star as
the completion mark. Three state-linked micro-animations. Softer radii.

**Verdict:** still not satisfied.

**Why it probably failed:** the palette and the motion changed, but the
**composition did not**. Every section is still a left-aligned heading with a
paragraph beside a bordered panel, on a 1120px centred container. Adding colour
and motion to an unchanged skeleton does not change how the page reads. If you
take one hypothesis from this document, take that one: *the remaining problem is
probably compositional, not chromatic.*

### The pattern across all three

Each attempt designed first and justified afterwards. None of them started by
committing to adjectives and a positioning. That sequence, repeated three times,
is the actual root cause. Do discovery first. Lock three to five adjectives with
the owner before you write CSS.

## 5. The narrow target

The owner's two references pull in opposite directions, and the brief is to land
between them:

- HeroUI is fresh, soft, rounded, friendly, consumer.
- Tremor is precise, restrained, data-dense, serious, professional.

Attempt 1 overshot toward expressive. Attempt 2 overshot toward austere.
Attempt 3 sat in the middle and read as neither. The target is probably not a
midpoint on that line but a third thing: **a civic system with one strong
idea**, executed with Tremor's precision and HeroUI's surface warmth.

The missing ingredient is most likely a real compositional signature. Candidates
nobody has tried yet:

- Break the centred container. An asymmetric or offset grid.
- Let one element bleed, overlap, or cross a section boundary with intent.
- A density contrast between sections rather than uniform generous spacing.
- Treat the récépissé as a genuinely designed document rather than a card.
- A typographic scale with far more range between smallest and largest.

## 6. Technical findings worth keeping

Do not re-derive these.

### Colour

The Senegalese flag green `#00853F` is `oklch(54% 0.145 151)`. That is almost
exactly the most saturated green that still clears WCAG AA 4.5:1 against white.
The national colour and the accessible colour are the same colour. This is a
genuine gift and the current palette is built on it.

The full palette is authored in OKLCH at the top of
`web/src/client/preview/preview.css`. Every pair was verified against the
rendered pixels, not against source. Twenty-two pairs pass.

Role structure that works and should survive any restyle:

- `--green` is a **fill**; white text sits on it.
- `--green-strong` is the **text** colour. Green type never sits on a tint.
- Green proceeds and completes, gold waits, red refuses.
- Flag yellow cannot carry text at any size. It is a surface and a mark only.

### Typography

Three faces, three roles, all SIL Open Font License:

- **Karrik** (Velvetyne) for identity and headings. One weight only, so pin
  `font-weight: 400` or the browser synthesises a fake bold.
- **Public Sans** for body and controls.
- **Sligoil** (Velvetyne) for data only: codes, counters, timestamps.

The licence is a real constraint, not a preference. A design system proposed as
public infrastructure cannot rest on a typeface it may not redistribute.
Cabinet Grotesk looked better in the specimen but Fontshare's licence is not
OFL, so it was rejected.

A live specimen comparing five candidates in the real layout is served at
`/spec2.html` with the fonts in `web/public/fonts/cand/`. Both are temporary;
delete them once the face is settled. Note that the Atkinson Hyperlegible panel
in that specimen failed to load and fell back to a serif. It was never a real
candidate.

### Rejected font directions

Compagnon Bold is a script face and reads like a bakery. Anthony is too
decorative. Terminal Grotesque is too techy. General Sans and Figtree read as
generic startup faces. The owner's HeroUI link specifies Figtree; that is the
theme playground default, not a considered choice, and it should not be adopted.

## 7. Where the code is

```
web/src/client/preview/
  Preview.tsx      the page
  preview.css      the whole design system, tokens at the top
  Waveform.tsx     canvas voice visualiser, reads colours from CSS tokens
web/public/fonts/  karrik-regular.woff2, sligoil-micromedium.woff2, README with licences
research/jokko-ak-yoon-e-justice.md   the source material
```

`/preview` is routed in `web/src/client/App.tsx` and deliberately bypasses the
app shell, so it does not inherit the header, footer or container of the
production prototype at `/`. Nothing in the shipped intake has been changed.

Watch out for one trap: `web/src/client/index.css` is imported globally and sets
`h1, h2, h3 { color: var(--ink) }` plus a global `:focus-visible` outline. Those
leak into `/preview`. A heading with no explicit colour will render dark on a
dark surface. That bug shipped once already.

## 8. Verification, because the tooling is awkward

The Playwright MCP server is configured for the `chrome` channel and Chrome is
not installed on this machine, so it does not work. The working substitute is
the Playwright chromium headless shell driven directly over CDP:

```
~/Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell
  --headless --disable-gpu --hide-scrollbars --window-size=1440,900
  --virtual-time-budget=6000 --screenshot=out.png http://localhost:5173/preview
```

Add `--remote-debugging-port=9333` and drive it with a small Bun script over the
WebSocket for real pointer events, keyboard focus tests and computed-style
reads. That is how every interaction claim in this project was verified.

Two lessons from doing it:

1. `getComputedStyle` returns `oklch(...)` verbatim in Chrome. Parsing it with a
   number regex produces garbage. Resolve every colour through a 1x1 canvas
   before computing contrast. A contrast audit once reported twenty-two false
   failures because of this.
2. A synthetic `.focus()` does not trigger `:focus-visible`. Dispatch a real Tab
   key to test focus rings.

## 9. Known quality state

Current build passes: 13/13 Vitest, TypeScript, production build, zero console
errors, no horizontal overflow, no sub-24px targets, nothing below 11px, WCAG AA
on all twenty-two measured pairs, keyboard focus on every tab stop,
`prefers-reduced-motion` honoured without killing colour feedback.

The build is clean. Clean was never the problem.

## 10. Open items

1. **`docs/DESIGN.md` is authority for the current preview.** It was rewritten
   14 Sep (owner chose A). Pass 7 must update it as tokens and components
   change. Do not restore the attempt-1 spec (Public Sans throughout, no hero,
   accent `#17634E`).
2. **The system is still one surface.** `/preview` and `/preview/suivre` share
   `preview.css`. Product routes (`/`, `/parler`, `/suivre`, `/guichet`) still
   use HeroUI app chrome. Do not restyle those until `/preview` is signed off.
3. **Git.** `main` is at `f49a4a0`, two commits ahead of `origin/main`, not
   pushed. Uncommitted at the start of pass 7: HeroUI control mapping in
   `preview.css` and a DESIGN.md radius note. Do not force-push. Do not commit
   unless the owner asks.
4. **Temporary files to remove when convenient:** `web/public/spec2.html` and
   `web/public/fonts/cand/`. Not the pass 7 job.
5. **The audit framing is deliberately private.** The research shows the real
   platform returning 503 and 500 with broken French in its UI. Keep that out of
   public copy. Confirm before changing this.

## 11. Advice

The owner gives sharp, specific, correct feedback and gives it quickly. They
will tell you when something is wrong. They rejected three passes in one
session, and each rejection was right.

Do not ship another variation of the current page **without a system**.
Attempts 1–3 skipped adjectives. Pass 7 already has them: see §16. Build
that mix. Do not propose three new visual worlds unless the owner rejects
the mix.

---

## 12. Pass 4: StyleX migration (REVERTED 13 Sept 2026)

A fourth pass migrated `/preview` to StyleX, added a two-stage review
state, and restructured the color rhythm. The owner was **still not
satisfied** ("Better not satisfied yet though") and then asked to revert
to the pre-StyleX state.

**The StyleX migration has been fully reverted.** The preview is back to
CSS-based styling in `preview.css`. The StyleX-specific files
(`tokens.stylex.ts`, `preview.styles.ts`) have been deleted. The Vite
and Vitest configs no longer include the StyleX plugin. The two-stage
review state was removed; "Continuer" goes straight to the receipt again,
matching the pre-pass-4 behavior.

The StyleX packages (`@stylexjs/stylex`, `@stylexjs/unplugin`) are still
in `package.json` but unused. Remove them if a clean revert is needed.

### What the owner asked for in pass 4

1. "Change to stylex and then use impeccable (polish, colorization,
   delight) to improve."
2. The ACP plugin was unavailable. The owner approved the local
   Impeccable skill at `/Users/aliouwade/.claude/skills/impeccable/`.
3. Earlier in the same session the owner said the previous pass was
   "still vibe-coded/amateurish" and named Stripe and the systems on
   `designsystems.surf/design-systems` as the register to aim for.
4. Even earlier the owner said the page was "mostly white/grey + green"
   and asked for more variation and contrast using the flag colors and
   the base black/white/green.

### Why pass 4 was reverted

The owner said the StyleX changes "messed up the UX and UI." No further
specificity was given. The pre-StyleX state (pass 3, CSS-based, color
rhythm) was restored. Treat the visual direction as **still unsolved**.

## 13. Working notes for the next agent

Pass 5–6 notes below are historical. **Do pass 7 as specified in §16.**

1. **Read the live preview first.** Dev server: `bun run --cwd web dev`.
   Port is usually 5173. Routes: `/preview`, `/preview/suivre`.
2. **The preview uses CSS, not StyleX.** All styles live in
   `preview.css`. The StyleX packages are installed but unused. Do not
   re-introduce StyleX unless the owner asks.
3. **The receipt is conditionally rendered.** It appears after a valid
   **Confirmer** on step 2, not after step-1 **Continuer**. Tests in
   `web/test/preview.spec.ts` pin this.
4. **Pass 7 adjectives are already locked** in §16 (Cash App / HeroUI /
   Stripe mix). Do not reopen the “propose three compositions” loop from
   §11 unless the owner rejects the mix.
5. **The Impeccable skill is the approved polish tool.** Invoke it via
   the `skill` tool with `impeccable`. The ACP plugin version is
   unavailable.
6. **Reuse the verification loop.** TypeScript, `bun run test`, build,
   Impeccable detector, and the CDP browser script. They are all in
   place and fast.
7. **The color-rhythm map from pass 3 is the current state.** White
   intro, yellow taxonomy band, black progress rail, green confirmation
   band, red for errors. Change the role map if the owner wants a
   different chromatic structure.
8. **Keep the receipt honest.** No simulated government document, no
   official seal, no real tracking. The "Données fictives" badge is
   load-bearing for the independence claim.

## 14. Pass 5 state (14 Sep 2026)

- `/preview`: full-screen illustrated hero on desktop (3 scenes, soft-focus crossfade, progress frise). Pause control was later removed; hover and `:focus-visible` still pause the fill. Illustration palette across the page (white, green-black, flag green, flag yellow, red as signal only), print grain on colour fields, yellow focus halo.
- `/preview/suivre`: new tracking page in the same system. One fictive dossier `PALJ-7K4M-2QX9` in « En attente d'informations »; the reply form moves it to « En cours de traitement ». Status glossary beside it.
- Voice: real in-browser recording with playback and delete. Nothing uploaded.
- Source illustrations and prompts: `design/illustrations/` (PNG originals, `atelier.png` unused). Web copies in `web/public/images/hero/`.
- Reference product is now the live « Justice Accessible Sénégal » at `jokkooakyoon.sn`. See research §J and `docs/product.md`.

## 15. Pass 6 (14 Sep 2026) — preview is north star

- Owner chose **A**: `docs/DESIGN.md` documents `/preview` as authority; HeroUI app follows later.
- Two-stage intake is implemented: write → review (type, optional lieu, demo checkbox) → receipt. « Commencer » or step 1 continue enters **task mode** (hero and yellow band hidden).
- Live-platform content: channel honesty line, footer « Obtenir un acte », suivi délai indicatif fictif, status glossary (always open, current status in gold), type passed to suivi via query string.
- Slide timing: `--slide-ms: 3.5s`.
- Tests: `web/test/preview.spec.ts`, 20 passing via `bun run test`. Receipt appears only after **Confirmer**, not after step-1 **Continuer**.

## 16. Pass 7 — design system upgrade (queued, 14 Sep 2026)

Owner request: take the `/preview` that now exists and upgrade it into a **design
system** (typography, components, sections), mixing **HeroUI** surface language
with **Cash App** (closest to the current preview vibe) and **Stripe** (class
and professionalism). This is not a new product. This is not a restyle of `/`.

The ambition in §2 still holds: the beginning of a Senegalese civic design
system. Pass 7 is the first time the owner asked to systematise, not to guess
another page.

### Thesis

Three registers, one product:

| Register | Source | Where it applies |
|---|---|---|
| Consumer first viewport | [Cash App](https://cash.app) | Hero, lede, **Commencer**, yellow type band, illustrated people as identity |
| Soft controls | [HeroUI theme builder](https://heroui.com/en/themes?formRadius=extra-large&radius=large&fontFamily=figtree&hue=274.697354037878&base=0.0097&chroma=0.07768050719273402&lightness=0.8052782776425559) | Buttons, fields, type-pick, lookup, checkboxes |
| Professional operate | [Stripe](https://stripe.com) | Task workspace, progress rail, review, receipt, dossier, history, status glossary, footer |

The mix is **not** a blend of three palettes. Colour stays the flag system in
§6. The mix is **scale and chrome**: Cash App size and confidence, HeroUI
roundness and fill, Stripe calibration and restraint.

An agency reviewer should feel: this is a serious public service that a person
would actually use. Not a Ministry clone. Not a fintech landing page.

### Take / skip

**HeroUI — take**

- `radius=large` on panels (~16px). `formRadius=extra-large` on fields (~16px).
- Buttons as pills (`border-radius: 999px`), weight 500, no outline, press
  scale ~0.97.
- Filled fields (tinted or white-on-soft), thin or no decorative border, hover
  darkens the fill.
- Generous control padding. Soft 150–180ms colour transitions.

**HeroUI — skip**

- Figtree (§6). It is the playground default, not a choice.
- Hue 274 pastel lavender. Accent is flag green `#00853F`.
- `--field-border-width: 0` on a white page. Keep a 1px WCAG 1.4.11 line
  (`--color-field-line`) or an equivalent 3:1 boundary.
- 36px-tall buttons. Civic tap target stays ≥44px (today 48px).
- Rebuilding `/preview` as HeroUI React components. Stay on `preview.css`.

An earlier owner link used the same radii with green `hue 148.79, chroma 0.132,
lightness 0.553`. Radii from that link and the purple playground are the same.
Hue is not.

**Cash App — take**

- Huge display type against white. One short promise. One primary action.
- People in ordinary rooms as the brand (the three illustrations already do
  this). Do not add stock photography.
- Almost no chrome on the first viewport: no card grid, no metric tiles, no
  eyebrow spam.
- Numbers and codes as designed objects (Sligoil on `PALJ-7K4M-2QX9`, counters,
  clocks) the way Cash App treats amounts.
- Section rhythm: full-bleed colour or full-bleed white, not nested cards.
- Direct French. Controls name the action.

**Cash App — skip**

- Cash App green `#00D632`, the cash wordmark, the square logo, Cash Sans.
- Payments, balances, activity feeds, “boost”, dark-mode-first marketing.
- Bounce and spring as a personality. Keep `--ease-standard`. Honour
  `prefers-reduced-motion`.
- Making the récépissé look like a receipt for money.

Cash Sans and Stripe’s Sohne are not OFL. Public infrastructure cannot rest on
them. Keep Karrik, Public Sans, Sligoil.

**Stripe — take**

- Type that feels inevitable: a real scale, consistent measure, optical
  alignment, no fake bold on Karrik.
- Operate density. Task, receipt, and suivi should scan like a product, not
  like a campaign.
- Hairlines and second-tone fills for structure. One elevation language (fill
  **or** a real shadow, not both).
- Complete control states: default, hover, focus, active, disabled, error,
  empty.
- Quiet secondary actions. One loud primary per view.
- Empty `/preview/suivre` as a job (lookup), not a vacant poster.

**Stripe — skip**

- Stripe purple, Sohne, dashboard tables as the homepage, gradient meshes,
  “global scale” marketing copy.
- GOV.UK grey reconstitution (attempt 2 already failed for being inert).
- Turning the illustrated hero into a docs header.

### Locked (do not relitigate)

From §3, plus later passes:

- Two-stage intake: write → review (type, optional lieu, demo checkbox) →
  receipt. Voice optional, never a substitute for text.
- Independent-demo disclosure on every screen. No coat of arms, seal, or
  Ministry branding.
- French UI. Demo data only.
- `/preview` is visual north star. Product HeroUI routes converge later.
- Faces: Karrik 400 headings, Public Sans body/UI, Sligoil data. OFL only.
- Flag roles: green proceeds, gold waits, red signals, ink `#14201A` on dark
  rails. Grain only on large colour fills.
- Live categories and statuses (research §J). No Contestation.
- Sample code `PALJ-7K4M-2QX9`. Non-sequential on purpose.
- CSS in `preview.css`. Do not re-introduce StyleX unless the owner asks.
- No Convex. Bun only. `bun run test` after code changes. No auto-commit.

§3 still says “the form begins immediately below the fold.” Pass 5 replaced
that with a full-viewport hero and **task mode** after **Commencer**. Task mode
is now locked. Do not put the form back under the hero.

### Current tokens (do not throw away)

In `web/src/client/preview/preview.css` on `.pv`:

- Colour: `--color-brand: #00853f`, `--color-brand-text: #00703a`,
  `--color-gold: #fdef42`, `--color-ink: #14201a`, `--color-field: #eef5f0`,
  `--color-field-line: #7d8c83`.
- Radius: `--radius-control: 16px`, `--radius-button: 999px`,
  `--radius-panel: 16px`.
- Type: `--font-heading`, `--font-body`, `--font-data`.
- Motion: `--slide-ms: 3.5s`, `--ease-standard: cubic-bezier(0.2, 0, 0, 1)`.
- Focus: ink 3px outline + gold halo (`.pv :focus-visible`). Fields replace
  that with ink border + 4px gold ring.

There is **no type scale token set**. Sizes are one-off clamps. That is the
first gap pass 7 must close.

### Inventory to upgrade

One stylesheet, one page module. Systematise these; do not add a component
library package.

**Chrome:** `pv-skip`, `pv-notice`, `pv-header`, `pv-brand`, `pv-nav`,
`pv-footer`.

**Type-led sections:** `pv-hero`, `pv-lede`, `pv-type-band` / `pv-types`,
`pv-form__heading`.

**Controls:** `pv-button` (`--primary`, `--secondary`, `--quiet`), `pv-field`,
`pv-lookup`, `pv-type-pick`, `pv-confirm`, `pv-link`.

**Operate:** `pv-workspace`, `pv-rail`, `pv-progress`, `pv-guidance`, `pv-audio`,
`pv-review-block`, `pv-error-summary`, `pv-outcome-band`, `pv-receipt`,
`pv-history`, `pv-track`, `pv-dossier`, `pv-statuses`, `pv-reply`.

**Motion / media:** `pv-slides`, `pv-frise`, `Waveform.tsx` (already reads CSS
tokens).

### Work order

Stay on `/preview` and `/preview/suivre`. Ship in this order so the page does
not thrash.

1. **Typeset (Cash App range + Stripe calibration).**
   Add tokens: display, title, body, ui, data, caption. Keep Karrik at 400.
   Hero display should feel Cash App (large, short, tracking ≥ -0.04em).
   Workspace titles should feel Stripe (smaller than the hero, still Karrik).
   Sligoil only on codes, counters, clocks. Pin a 65–75ch body measure on
   long copy. Check 320px and 390px wrapping, especially the horizontal
   progress rail.
2. **Components (HeroUI feel + Stripe states).**
   Document each control once in CSS. Primary / secondary / quiet must stay
   distinct. Fields stay filled. Type-pick stays cards, not chips. Selected
   type uses brand-soft + brand line. Disabled, error, and focus must be
   visible without the HeroUI purple ring. Do not drop the gold halo.
3. **Sections (Cash App on persuade, Stripe on operate).**
   Hero + type band: more type range, less leftover GOV.UK column habit.
   Workspace: treat the rail and the form as one product, not a landing plus
   an admin. Receipt and dossier: structured records (already honest — keep
   them that way), Stripe density, Sligoil reference as the object.
   Empty suivi: the lookup is the first-screen job; do not bring back vacant
   art as the composition.
4. **Write the system down.**
   Update `docs/DESIGN.md` with the scale, component rules, and section
   roles. This handover stays history; DESIGN.md stays the living spec.
5. **Verify.**
   `bun run test`. Browser path: write → review → back → confirm → receipt →
   suivi (sample code). 320px and 390px. Keyboard focus. Reduced motion.
   Impeccable: `context.mjs --target web/src/client/preview/preview.css`,
   then `typeset` / `extract` / `polish` as needed. Detector at the end:
   `detect.mjs --json` on the files you touched.

### Definition of done

- A stranger can use `/preview` and `/preview/suivre` without noticing a style
  break between sections.
- Tokens, not one-off pixel values, drive type size, radius, and control
  padding.
- `docs/DESIGN.md` matches the CSS.
- 20 existing preview tests still pass, or they are updated for copy you were
  allowed to change (ask before changing claims).
- Owner can judge the mix in the browser in under five minutes.

### Files

| Touch | Leave alone unless the job requires it |
|---|---|
| `web/src/client/preview/preview.css` | `web/src/auth.ts`, migrations |
| `web/src/client/preview/Preview.tsx` (markup only if a component needs a hook) | `web/src/client/pages/*` (product app) |
| `docs/DESIGN.md` | Live Worker deploy |
| `web/test/preview.spec.ts` if selectors or copy change | `docs/product.md` facts, research §J |

### Known defects to absorb, not to ignore

- Mobile progress rail: two steps on a dark pill; labels overflow at ~390px.
- Empty `/preview/suivre` still reads as a marketing split on desktop.
- `web/src/client/index.css` still leaks `h1, h2, h3 { color: var(--ink) }` and
  a global focus ring into `/preview`. Explicit colour on every preview
  heading. Do not “fix” the leak by restyling the product app in this pass.
- Critique snapshot `2026-09-14T03-04-00Z` scored 24/40 against an earlier
  preview (Continuer skipped review). That P1 is fixed. Do not reopen it.
  Remaining compositional P2 (workspace still a 260+720 column) is in scope
  for step 3 if a stronger operate layout appears. Do not break task mode.

### Tools

- Impeccable skill: `/Users/aliouwade/.claude/skills/impeccable/`.
- Browser: Cursor browser tools against `http://localhost:5173`.
- Tests: `bun run test` from repo root.
- Do not impersonate the Ministry. Do not store real complaints.
