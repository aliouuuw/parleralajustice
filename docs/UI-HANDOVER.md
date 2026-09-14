# UI handover

Written 13 September 2026, for the next agent working on the visual design of
Parler à la justice. The information architecture and the interaction flow are
settled. The visual layer is not: three attempts have been rejected. This
document exists so you do not repeat them.

Read `research/jokko-ak-yoon-e-justice.md` before you read anything else.

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

1. **`docs/DESIGN.md` is stale and actively wrong.** It still documents the
   direction rejected in attempt 1: Public Sans throughout, no hero, accent
   `#17634E`, rail `#F6F8FA`. Any agent reading it will rebuild the wrong thing.
   Rewrite it or delete it early.
2. **The system is one page.** The owner wants a system. `/suivre`, `/d/CODE`,
   `/connexion` and `/guichet` are untouched and still use the old styling.
3. **Nothing is committed.** The whole React rebuild, including `/preview`, is
   uncommitted on `main` alongside a deleted `web/public/`. Task T009 is still
   `pending` in `docs/backlog.json`. Commit before doing anything destructive.
4. **Temporary files to remove:** `web/public/spec2.html` and
   `web/public/fonts/cand/`.
5. **The audit framing is deliberately private.** The research shows the real
   platform returning 503 and 500 with broken French in its UI. That is the
   strongest argument for why this demo exists, and it is intentionally kept out
   of the public copy: a page that names a state platform's failures reads as
   hostile to the agency the owner wants to work with. Confirm before changing
   this.

## 11. Advice

The owner gives sharp, specific, correct feedback and gives it quickly. They
will tell you when something is wrong. They rejected three passes in one
session, and each rejection was right.

Do not ship another variation of the current page. Establish the adjectives
first, propose two or three genuinely different compositions, and get one
chosen before building. That step was skipped three times.

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

1. **Read the live preview first.** Dev server: `bun run --cwd web dev`.
   The port drifts (5173, 5174, 5175); read the printed line. Route:
   `/preview`.
2. **The preview uses CSS, not StyleX.** All styles live in
   `preview.css`. The StyleX packages are installed but unused. Do not
   re-introduce StyleX unless the owner asks.
3. **The receipt is conditionally rendered.** It only appears after a
   valid "Continuer." The initial render shows only the form. The test
   in `web/test/preview.spec.ts` pins this behavior.
4. **Ask for a sharper critique before pass 5.** "Better not satisfied
   yet" is not actionable on its own. Propose 2 to 3 compositional
   directions with adjectives locked first, per section 11, and let the
   owner pick.
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

- `/preview`: full-screen illustrated hero on desktop (3 scenes, soft-focus crossfade, progress line with pause), illustration palette across the page (white, green-black, flag green, flag yellow, red as signal only), print grain on colour fields, yellow focus halo.
- `/preview/suivre`: new tracking page in the same system. One fictive dossier `PALJ-7K4M-2QX9` in « En attente d'informations »; the reply form moves it to « En cours de traitement ». Status glossary beside it.
- Voice: real in-browser recording with playback and delete. Nothing uploaded.
- Source illustrations and prompts: `design/illustrations/` (PNG originals, `atelier.png` unused). Web copies in `web/public/images/hero/`.
- Reference product is now the live « Justice Accessible Sénégal » at `jokkooakyoon.sn`. See research §J and `docs/product.md`.

## 15. Pass 6 (14 Sep 2026) — preview is north star

- Owner chose **A**: `docs/DESIGN.md` documents `/preview` as authority; HeroUI app follows later.
- Two-stage intake is implemented: write → review (type, optional lieu, demo checkbox) → receipt. « Commencer » or step 1 continue enters **task mode** (hero and yellow band hidden).
- Live-platform content: channel honesty line, footer « Obtenir un acte », suivi délai indicatif fictif, collapsible status glossary, type passed to suivi via query string.
