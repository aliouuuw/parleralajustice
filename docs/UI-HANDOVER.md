# UI handover

Written 13 September 2026, updated 14 September 2026. For the next agent
working on the visual design of Parler à la justice.

**Current assignment is §16 (pass 7).** Turn `/preview` into one design system
(typography, components, sections). Cash App gives the type architecture,
HeroUI gives the control shapes, Stripe gives the calibration. All three apply
to every section. Do not restart the information architecture. Do not restyle
the live Worker.

Read in this order:

1. `research/jokko-ak-yoon-e-justice.md` (product truth, especially §J)
2. `research/cash-app-foundations.md` (measured Cash App rules and the font check)
3. This file §3 (locked), §4 (rejected attempts), §6 (type and colour), §16 (the job)
4. `docs/DESIGN.md` (current tokens)
5. `http://localhost:5173/preview` and `/preview/suivre` (`bun run --cwd web dev`)

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

### Typography (current, 14 Sep 2026)

Two faces, both SIL Open Font License, both self-hosted in `web/public/fonts/`:

- **Mona Sans** (variable: weight 200 to 900, width 75% to 125%) for titles,
  body and controls. One family, like Cash App's Cash Sans plus Cash Sans Wide.
- **Sligoil** (Velvetyne) for data only: codes, counters, timestamps.

Tokens on `.pv` in `preview.css`:

| Token | Value | Use |
|---|---|---|
| `--weight-body` | 450 | Body copy (set on `.pv`) |
| `--weight-ui` | 550 | Buttons, nav links |
| `--weight-strong` | 650 | Labels, small headings, brand, status names |
| `--weight-title` | 620 | Large titles (hero, suivi, form, outcome, dossier status) |
| `--stretch-title` | 112.5% | Large titles on desktop only |

Rules:

- Semi-wide (112.5%) only on titles of 26px or more. Everything smaller stays at
  normal width. Cash App: do not mix widths at similar sizes.
- Below 600px, hero and suivi titles drop to normal width, and the hero is
  34px. The hero is 2 lines at 390px and 3 lines at 320px, with no overflow.
- Titles use -0.018em (hero, suivi) or -0.012em (form, outcome) tracking.
  Tighter values crushed the letters in the specimen.
- The product app (`/`, `/parler`, ...) still uses Public Sans from Google Fonts.
  It converges after sign-off.

The licence is a real constraint, not a preference. A design system proposed as
public infrastructure cannot rest on a typeface it may not redistribute.
Cabinet Grotesk looked better in an early specimen but Fontshare's licence is
not OFL, so it was rejected.

A temporary specimen from pass 3 is still at `/spec2.html` with fonts in
`web/public/fonts/cand/`. Delete both.

### Rejected font directions

Compagnon Bold is a script face and reads like a bakery. Anthony is too
decorative. Terminal Grotesque is too techy. General Sans and Figtree read as
generic startup faces. The owner's HeroUI link specifies Figtree; that is the
theme playground default, not a considered choice, and it should not be adopted.

### Pass 7 font decisions (14 Sep 2026)

Evidence: `research/cash-app-foundations.md`,
`research/type-specimen-2026-09-14.png` (body and code faces),
`research/title-specimen-2026-09-14-a.png` and `-b.png` (title faces).

1. **Body:** the review first recommended keeping Public Sans. The owner tried
   Mona Sans and kept it. At 400 and 500 it read too light at 13 to 15px, so
   body is 450 and controls are 550.
2. **Titles:** the owner said Karrik did not match Mona Sans. Candidates
   rendered with the real preview titles:
   - Karrik 400 (previous): quirky forms fight Mona Sans.
   - Mona Sans Wide 125% at 640: the most Cash App, but too wide for phones.
   - **Mona Sans Semi-wide 112.5% at 620: chosen.** Same family, confident,
     no extra font file.
   - Hubot Sans (GitHub's companion face): heavy, and a second GitHub brand face.
   - Redaction 400 (serif, made for an art project on the justice system):
     classy, but a serif-plus-sans pairing and heavy connotations. Fallback if
     the owner wants an editorial voice.
3. **Karrik removed.** The file and its `@font-face` are deleted (still in git
   history).

Rejected on 14 Sep:

- **Cash Sans, Söhne:** commercial Klim licence. Not OFL.
- **Atkinson Hyperlegible Next and Mono:** no ŋ or Ŋ. Wolof names break.
- **Apfel Grotezk, Bagnard:** no ŋ or Ŋ.
- **Geist, Inter, Instrument Sans, Hanken Grotesk:** default or "tasteful
  default" faces. They read as generated.

Known trade-off: Mona Sans is GitHub's brand face and is on Google Fonts. The
illustrations, the flag palette and the semi-wide titles carry the identity,
not the typeface alone.

## 7. Where the code is

```
web/src/client/preview/
  Preview.tsx      the page
  preview.css      the whole design system, tokens at the top
  Waveform.tsx     canvas voice visualiser, reads colours from CSS tokens
web/public/fonts/  mona-sans-*.woff2, sligoil-micromedium.woff2, README with licences
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

State measured on 13 Sep (tests now 20/20 across 4 files, 14 Sep). Build passed: TypeScript, production build, zero console
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
3. **Git.** Check `docs/progress.md` §Git for the current state. Do not
   force-push. Do not commit unless the owner asks.
4. **The product app loads Public Sans from Google Fonts** (`web/index.html`).
   `/preview` is self-hosted now. A justice intake should not send citizen IP
   addresses to Google. Remove the Google link when the product app moves to
   Mona Sans.
5. **Temporary files to remove when convenient:** `web/public/spec2.html` and
   `web/public/fonts/cand/`. Not the pass 7 job.
6. **The audit framing is deliberately private.** The research shows the real
   platform returning 503 and 500 with broken French in its UI. Keep that out of
   public copy. Confirm before changing this.

## 11. Advice

The owner gives sharp, specific, correct feedback and gives it quickly. They
will tell you when something is wrong. They rejected three passes in one
session, and each rejection was right.

Do not ship another variation of the current page **without a system**.
Attempts 1 to 3 skipped adjectives. Pass 7 has the references (§16), but no
approved layout. Tokens and components can ship first. Before any section
layout changes, show the owner two compositions and let them pick one (§16,
step 3). Four passes were rejected. Do not skip this gate.

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

Pass 5 and 6 notes below are historical. **Do pass 7 as specified in §16.**

1. **Read the live preview first.** Dev server: `bun run --cwd web dev`.
   Port is usually 5173. Routes: `/preview`, `/preview/suivre`.
2. **The preview uses CSS, not StyleX.** All styles live in
   `preview.css`. The StyleX packages are installed but unused. Do not
   re-introduce StyleX unless the owner asks.
3. **The receipt is conditionally rendered.** It appears after a valid
   **Confirmer** on step 2, not after step-1 **Continuer**. Tests in
   `web/test/preview.spec.ts` pin this.
4. **Pass 7 references are set** in §16 (Cash App, HeroUI, Stripe). Section
   layouts are not. Use the two-composition gate in §11 before step 4.
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

## 15. Pass 6 (14 Sep 2026): preview is north star

- Owner chose **A**: `docs/DESIGN.md` documents `/preview` as authority; HeroUI app follows later.
- Two-stage intake is implemented: write → review (type, optional lieu, demo checkbox) → receipt. « Commencer » or step 1 continue enters **task mode** (hero and yellow band hidden).
- Live-platform content: channel honesty line, footer « Obtenir un acte », suivi délai indicatif fictif, status glossary (always open, current status in gold), type passed to suivi via query string.
- Slide timing: `--slide-ms: 3.5s`.
- Tests: `bun run test` runs 20 tests in 4 files (7 in `web/test/preview.spec.ts`), all passing on 14 Sep. Receipt appears only after **Confirmer**, not after step-1 **Continuer**.

## 16. Pass 7: design system upgrade (queued, 14 Sep 2026)

Owner request: upgrade the current `/preview` into a **design system**
(typography, components, sections). References: **HeroUI** style, **Cash App**
(closest to the preview's vibe), **Stripe** (class and professionalism). This is
not a new product. This is not a restyle of `/`.

Rewritten 14 Sep after a review found three defects in the first draft: fonts
were locked against the request, Cash App and Stripe facts came from memory,
and each reference was given its own zone of the page.

### Thesis: one system, three layers

Every reference applies to every section. Sections differ by **density**, not
by which brand they imitate.

| Layer | Source | What it controls |
|---|---|---|
| Type architecture | Cash App (measured, `research/cash-app-foundations.md`) | Face roles, weight defaults, size contrast, tracking, leading |
| Control shape | HeroUI theme link (§2) | Radii, pill buttons, filled fields, transition timing |
| Calibration | Stripe (principles, not measured) | Complete states, one primary per view, one elevation language, record density |

Colour stays the flag system in §6. None of the three references changes a
colour.

An agency reviewer should feel: a serious public service a person would
actually use. Not a Ministry clone. Not a fintech landing page.

### Density levels

| Level | Sections | Type tokens | Spacing |
|---|---|---|---|
| Open | Hero, type band, outcome band, empty suivi | display, title, lede | Large |
| Working | Workspace, review, lookup, reply | heading, body, ui | Medium |
| Record | Receipt, dossier, history, status glossary, footer | ui, caption, data | Tight rows, hairlines |

### Layer 1: type (Cash App architecture)

Faces are decided in §6 "Pass 7 font decisions": Mona Sans for titles, body and
controls, Sligoil for data. Do not reopen unless the owner asks.

Rules taken from Cash App:

1. **Weights:** use the tokens only. Body 450, controls 550, labels and small
   headings 650, large titles 620 at 112.5% width. No raw weight numbers.
2. **Size contrast:** large jumps between levels. Cash App uses
   90 / 48 / 22 / 14 / 10. Adjacent sizes that look alike are a defect.
3. **Tracking:** -2% to 0% on everything above 20px (tighter crushed Mona Sans). 0 to +4% only on small
   caption and data text.
4. **Leading:** 0.95 to 1.05 on display and title. 1.15 to 1.3 on headings and
   controls. Body copy stays at 1.5 or more: WCAG 1.4.12 wins over Cash App's
   120% ceiling for long civic text.
5. **Mono:** Sligoil only on codes, clocks, counters and dates. Never on
   paragraphs, labels, buttons or headlines other than the reference code.
6. **Floor:** 12px minimum. `pv-history time` is 11px today; raise it.

Starting tokens (tune in the browser, keep the contrast):

| Token | Face | Size | Leading | Tracking |
|---|---|---|---|---|
| `--text-display` | Mona Sans 620, 112.5% | `clamp(48px, 7vw, 88px)` | 0.95 | -0.018em |
| `--text-title` | Mona Sans 620, 112.5% | `clamp(32px, 4vw, 48px)` | 1.0 | -0.012em |
| `--text-heading` | Mona Sans 650 | 22px | 1.2 | -0.005em |
| `--text-lede` | Mona Sans 450 | 20px | 1.45 | 0 |
| `--text-body` | Mona Sans 450 | 16px | 1.55 | 0 |
| `--text-ui` | Mona Sans 550 | 15px | 1.2 | 0 |
| `--text-caption` | Mona Sans 550 | 13px | 1.35 | 0.01em |
| `--text-data` | Sligoil | uses the size of its context | 1.2 | 0.04em |

The hero headline must stay on one or two lines at 1440px and at 390px. Display
and title drop to 100% width below 600px.

### Layer 2: controls (HeroUI shape)

Take:

- `radius=large` panels and `formRadius=extra-large` fields: keep the existing
  `--radius-panel` and `--radius-control` (16px).
- Pill buttons (`--radius-button: 999px`), weight 500, press scale 0.97, no
  hover lift.
- Filled fields. Hover darkens the fill. Keep the 1px `--color-field-line` for
  WCAG 1.4.11 (3:1 boundary).
- Colour transitions of 150ms to 180ms on `--ease-standard`.

Skip:

- Figtree and hue 274 (the playground defaults).
- 36px buttons. Targets stay 44px or more (48px today).
- HeroUI React components inside `/preview`. Stay on `preview.css`.

### Layer 3: calibration (Stripe principles)

- Every control has default, hover, focus-visible, active, disabled and error
  styles. Keep the ink outline plus gold halo for focus.
- One loud primary action per view. Secondary and quiet buttons must look
  different from each other and from primary.
- One elevation language: tonal fill, no drop shadows on panels.
- Record surfaces scan like a product: aligned label and value columns,
  hairline rows, tabular numbers.
- Empty `/preview/suivre` is a job (the lookup), not a poster.

Skip: purple, gradient meshes, dashboard tables on the first viewport, docs
header style over the illustrated hero, GOV.UK grey (attempt 2 failed for being
inert).

### Also from Cash App

- One point of focus per composition.
- Flag gold behaves like Cash Green: a surface with ink text, never a text
  colour.
- Motion is "unfussy". Text may slide up into place, but content is visible by
  default and `prefers-reduced-motion` removes the movement.
- Direct French. Say what happens next, including bad news (« Clôturé »,
  errors).
- Skip: Cash Green `#00D632`, the wordmark, payment vocabulary, spring bounce, a
  récépissé that looks like a money receipt.

### Locked (do not relitigate)

- Two-stage intake: write, then review (type, optional lieu, demo checkbox),
  then receipt. Voice optional, never a substitute for text.
- Task mode after **Commencer** (replaces the §3 "form below the fold" line).
- Independent-demo disclosure on every screen. No coat of arms, seal or
  Ministry branding.
- French UI. Demo data only. Live categories and statuses (research §J). No
  Contestation.
- Flag roles: green proceeds, gold waits, red signals, ink `#14201A` on dark
  rails. Grain only on large colour fields.
- Sample code `PALJ-7K4M-2QX9`, non-sequential on purpose.
- CSS in `preview.css`. No StyleX. No Convex. Bun only. No auto-commit.

### Current tokens (do not throw away)

In `web/src/client/preview/preview.css` on `.pv`:

- Colour: `--color-brand: #00853f`, `--color-brand-text: #00703a`,
  `--color-gold: #fdef42`, `--color-ink: #14201a`, `--color-field: #eef5f0`,
  `--color-field-line: #7d8c83`.
- Radius: `--radius-control: 16px`, `--radius-button: 999px`,
  `--radius-panel: 16px`.
- Type: `--font-heading` and `--font-body` (both Mona Sans), `--font-data`
  (Sligoil), `--weight-body`, `--weight-ui`, `--weight-strong`,
  `--weight-title`, `--stretch-title`. No size tokens yet.
- Motion: `--slide-ms: 3.5s`, `--ease-standard: cubic-bezier(0.2, 0, 0, 1)`.

Baseline on 14 Sep: **76** one-off `font-size` values and **13** one-off
`border-radius` values in `preview.css`.

### Inventory

**Chrome:** `pv-skip`, `pv-notice`, `pv-header`, `pv-brand`, `pv-nav`,
`pv-footer`.

**Open:** `pv-hero`, `pv-lede`, `pv-type-band`, `pv-types`, `pv-channels`,
`pv-impact`, `pv-outcome-band`, `pv-slides`, `pv-frise`. `pv-channels` and
`pv-impact` were added 14 Sep to cover the live platform's channel list and
"Notre Impact" section (research §J.2, §J.6). See `docs/DESIGN.md` for the
honesty rules that shaped their content.

**Controls:** `pv-button` (`--primary`, `--secondary`, `--quiet`), `pv-field`,
`pv-lookup`, `pv-type-pick`, `pv-confirm`, `pv-link`.

**Working:** `pv-workspace`, `pv-rail`, `pv-progress`, `pv-guidance`,
`pv-audio`, `pv-form__heading`, `pv-review-block`, `pv-error-summary`,
`pv-reply`.

**Record:** `pv-receipt`, `pv-history`, `pv-track`, `pv-dossier`,
`pv-statuses`, `pv-code`.

`Waveform.tsx` reads colour tokens already.

### Work order

1. **Type tokens.** Add the `--text-*` tokens. Replace every one-off
   `font-size`. Fonts are already self-hosted for `/preview`. No layout
   changes.
2. **Controls.** Apply layers 2 and 3 to the control inventory. Replace the
   one-off radii. No layout changes.
3. **Owner gate.** Screenshot two compositions for the working and record
   levels (workspace plus receipt, at 1440px and 390px). Show them to the
   owner. Wait for a pick. Do not start step 4 without it.
4. **Sections.** Build the picked composition. Fix the known defects below.
5. **Write it down.** Update `docs/DESIGN.md`: type table, control states,
   density levels. DESIGN.md is the living spec. This file is history.
6. **Verify.** Run the checks in "Definition of done".

### Definition of done

Each line is a check someone can run.

1. `grep -nE "font-size:\s*(clamp|[0-9])" web/src/client/preview/preview.css`
   returns only lines inside the `.pv` token block.
2. `grep -nE "border-radius:\s*[0-9]" web/src/client/preview/preview.css`
   returns only `50%` circles or lines inside the token block.
3. `/preview` loads no font from `fonts.googleapis.com`. Today `web/index.html`
   loads Public Sans for every route. Move that link into the product app, or
   switch the product app to Mona Sans (owner decision).
4. `bun run test`: 20 of 20 pass, or new tests replace changed selectors.
5. Hero headline is one or two lines in screenshots at 1440x900 and 390x844.
6. No horizontal scroll at 320px. Progress rail labels are not clipped at 390px.
7. Every control in the inventory has hover, focus-visible, active, disabled
   and error rules (list them in DESIGN.md).
8. All text pairs reach 4.5:1. Body copy reaches 7:1 (Cash App AAA target).
9. Tab through the full path: write, review, back, confirm, receipt, suivi.
   Focus is visible at every stop.
10. The owner picked a composition in step 3, and DESIGN.md token values match
    the CSS.

### Files

| Touch | Leave alone unless the job requires it |
|---|---|
| `web/src/client/preview/preview.css` | `web/src/auth.ts`, migrations |
| `web/src/client/preview/Preview.tsx` (markup only when a component needs it) | `web/src/client/pages/*` (product app) |
| `web/index.html` (font links only) | Live Worker deploy |
| `web/public/fonts/` | `docs/product.md` facts, research §J |
| `docs/DESIGN.md` | |
| `web/test/preview.spec.ts` if selectors or copy change | |

### Known defects to fix in step 4

- Mobile progress rail: two steps on a dark pill; labels overflow near 390px.
- **Fixed 14 Sep:** empty `/preview/suivre` had no first-screen job (marketing
  split on desktop, footer landing under the button on phones). A yellow
  `pv-track-help` band now explains the wait in 3 steps and gives the section
  a sibling, which drops the old flex-centred dead space automatically
  (`.pv-track:not(:only-child)` was already the rule for this).
- **Fixed 14 Sep:** clipboard copy failure was silent (`copyState === "error"`
  was set but never rendered). It now shows an inline message and still falls
  back to text selection.
- **Already fixed before this handover was written:** the review stage
  (locked reread, type picker, step-rail wording) was live in code by the time
  §16 first listed it as open. The critique snapshot below predates the
  commit that added it. Verified 14 Sep by driving write → review → confirm →
  receipt in a real browser: the user's own text appears at review, the type
  choice is required there, and step 1/2 labels never disagree with
  `aria-current`.
- Workspace is still a 260px rail beside a 720px column (critique snapshot
  `2026-09-14T03-04-00Z`, P2). Keep task mode.
- `web/src/client/index.css` leaks `h1, h2, h3 { color: var(--ink) }` and a
  global focus ring into `/preview`. Set explicit colour on every preview
  heading. Do not restyle the product app to fix it.

### Tools

- Impeccable skill: `/Users/aliouwade/.claude/skills/impeccable/`.
  `scripts/context.mjs --target web/src/client/preview/preview.css` before
  step 1, `scripts/detect.mjs --json` on touched files after step 5.
- Browser: the headless shell in §8, or editor browser tools, against
  `http://localhost:5173`.
- Tests: `bun run test` from the repo root.

## 17. Pass 8: turn the channels and impact sections back up (queued, 14 Sep 2026)

Owner verdict on `pv-channels` and `pv-impact` (shipped in commit `4b032eb`,
still on `main` unchanged. This pass has **not started**, nothing is
uncommitted): *"correct and needed but design level was dropped here. We need
to turn it up again."* Content and honesty rules stay. Only the execution
changes. Explicit instruction: use `$impeccable`, specifically **bolder,
delight, slight overdrive, colorize**.

### Why the verdict is right

`pv-channels` is 6 identical cards (icon, heading, one line, a state label).
`pv-impact` is a stat row plus 2 identical cards. That is exactly the
`craft-floor.md` refusal: *"Same-size cards of icon plus heading plus text as
the page structure. Cards are the lazy container."* Everything around these
two sections earns its composition (the illustrated hero, the yellow band
that breaks the container, the ink progress rail, the green outcome band).
These two sections are the one place pass 7 defaulted to the generic
scaffold. Fix the scaffold, not the copy.

### Chosen direction: illustration-led

Presented 3 directions; owner picked this one over a dark "guichet board"
readout and a feature-phone demo (rejected as closest to attempt 1's
"toy-y" failure, §4).

- **Écrit** and **Voix** stop being 1-of-6 cards. They become 2 large tiles
  using real crops of the existing hero illustrations
  (`/images/hero/ecrire-1280.webp`, `parler-1280.webp`, already licensed,
  already in the hero carousel, do not source new art). Each tile is a real
  control: clicking it calls `beginTask()` and jumps straight into task mode,
  focused on the matching input (the message textarea for Écrit, the
  **Enregistrer** button for Voix. Never auto-start recording: the
  microphone prompt stays the visitor's own choice).
- The **Voix** tile shows a live-looking waveform at rest, reusing
  `Waveform.tsx`'s existing `"sim"` source (already built for exactly this:
  a synthetic speech envelope, no microphone needed). Gate it behind
  `IntersectionObserver` so it only animates on screen, and behind
  `prefers-reduced-motion`.
- The 4 announced channels (Vidéo, SMS, USSD, Téléphone) move into one
  compact list beside a third illustration crop (`atelier-1280.webp`,
  currently unused, see §7's asset list), each row carrying the **real
  code the live platform published** (research §J.2): SMS `3737`, USSD
  `*711#`, phone's language menu. Real numbers in Sligoil read as evidence,
  not as a mocked control. Still no button, still not simulated, still
  captioned "Pas encore ouverts."
- **Impact** moves onto full flag-green grain (`--color-brand` +
  `--grain`), matching the outcome band's own treatment, with the 4 numbers
  set huge in Sligoil, white on green, and a subtle count-up on scroll-into-
  view (respect `prefers-reduced-motion`). The 2 claim cards sit below on
  white, unchanged in content.
- Overdrive, kept slight per the owner's own wording: scroll-driven parallax
  on the two illustration crops only (`animation-timeline: view()` with a
  static-position fallback per `craft-floor.md`'s motion rule (one
  authored moment, not scattered effects).

### Locked, unchanged from pass 7

- Still exactly 2 real channels. The 4 "announced" ones stay non-interactive
  content, never a button, never simulated (§16's channel honesty rule).
- Impact numbers stay fictive and stay labelled as such. Moving them onto a
  bolder green band does not make them more true.
- The 2 claim cards' copy stays ours (§16: not the live platform's
  contradictory "Anonymat possible" / "Chiffrement end-to-end").
- Colour stays the flag system. "Colorize" here means using more of
  `--color-brand` and `--grain` with intent (a full band, not a tint), not
  introducing a new hue.

### Before building

Run `$impeccable` bolder + delight + overdrive + colorize scoped to
`pv-channels` and `pv-impact` only (both commands want scope named up front).
Load `craft-floor.md` before editing. Verify contrast on every new pairing
computed, not eyeballed. Pass 7 shipped one accidental miss this way
(`text-tertiary` on `--color-field`, 4.38:1, since fixed) and the green band
in this pass introduces several new white/gold-on-brand pairs to check.
