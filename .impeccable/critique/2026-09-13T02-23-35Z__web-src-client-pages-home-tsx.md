---
target: IA/UX/UI changes
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-09-13T02-23-35Z
slug: web-src-client-pages-home-tsx
---
Method: dual-agent (A: a31ab115 · B: 31e3ef16)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Submit and voice have status text, but Turnstile mount failure is invisible and voice status is not announced. |
| 2 | Match System / Real World | 3 | Coupon, greffe, and file metaphors fit. Raw enums such as `en_cours` and `repondu` leak into the register. |
| 3 | User Control and Freedom | 2 | No sign-out, no remove-recorded-audio action, and the identified session is a one-way door. |
| 4 | Consistency and Standards | 2 | "Guichet" names both the external acts exit and the internal clerk register. Server errors are unaccented while client copy is accented. |
| 5 | Error Prevention | 3 | Required checkbox, Turnstile, rate limits, and field constraints are present. The dossier does not prevent losing the only access key. |
| 6 | Recognition Rather Than Recall | 2 | The anonymous model depends on remembering or preserving `PALJ-XXXX`; the receipt has no copy, print, or save affordance. |
| 7 | Flexibility and Efficiency | 3 | Deep links, prefilled retry, voice input, and four clear types help. No shortcuts are needed at this scope. |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained paper layout and one meaningful payoff. The demo warning is repeated four times and the CTA is undersized. |
| 9 | Error Recovery | 3 | Unknown-code flow prefills the retry field. Turnstile and upload failures lack a visible recovery path. |
| 10 | Help and Documentation | 3 | Footer and `/acte` explain the official products. No help exists for preserving the anonymous code. |
|  | **Total** | **28/40** | Good civic intent, weak credential preservation and mixed terminology. |

## Design Specificity Verdict

Specific, with a template underbelly.

The rebuild has a clear authored thesis: flag colors as roles, not decoration; legal tape before brand; anonymous identity before the ask; a yellow livret stub as proof. The stamp, perforation, Archivo Narrow code, and Atkinson Hyperlegible body all support a real civic fiction.

The remaining generic layer is mostly in the components: HeroUI pills where the design specifies 10px fields and buttons, default table styling in the clerk view, identical page titles, no favicon, bare loading copy, and raw database enums on the surface meant to prove professionalism.

Deterministic scan: `detect.mjs` returned zero source findings for `web/src/client` and `web/index.html`. Runtime overlay evidence found warning groups on five routes: long legal/footer text, a single-font finding on routes without the ticket code, a likely padding measurement artifact on the HeroUI button, and several framework false positives. The most credible runtime finding is the dossier's missing heading: the loaded coupon view has no `h1`.

## Overall Impression

The IA is better than the old two-door structure. It correctly makes speaking the primary act and treats acts as an exit. The UI is honest, readable, and distinct enough to survive a screenshot on X.

The weak point is the promise after submission. The product gives a citizen a code, but does not tell them that the code is the only way back or help them preserve it. That turns the strongest visual idea into an incomplete credential flow.

## What Is Working

1. The first trust signal is explicit. The legal tape precedes the brand, and the identity line says "Anonyme · un code, pas de nom" before the form asks for content.
2. The dossier payoff is real. The perforated yellow stub, large tracking code, green star, and DEMO stamp create the intended memorable receipt.
3. The demo does not lie. `/connexion` admits email is not wired, `/guichet` admits there is no access control, and the disclaimer appears on every screen.

## Priority Issues

### P1 - The receipt does not defend itself

**Why it matters:** The tracking code is the only credential for an anonymous dossier. `/d/CODE` shows the code but never says to photograph, copy, print, or keep it. Losing the code means losing the dossier. The read route is also not rate-limited and the four-character suffix is enumerable.

**Fix:** Make the stub page a credential page. Add a heading, "Conservez ce code" copy, a copy button, a print action, and a warning that anonymous dossiers cannot be recovered without the code. Rate-limit case reads or increase the code space.

**Suggested command:** `$impeccable harden`

### P1 - No sign-out path

**Why it matters:** The product offers an identified path but gives no exit. On a shared phone, the email stays visible in the identity line. This conflicts with the privacy posture implied by the anonymous default.

**Fix:** Add "Se déconnecter" to the identified state and header/session area. Clear the session through Better Auth and return to the anonymous state.

**Suggested command:** `$impeccable harden`

### P2 - The mobile fold contradicts "speak now"

**Why it matters:** On 390×844, the tape takes three lines, the identity/title/lede/name-link stack consumes the next section, and the submit button is below the first viewport. The Type decision also comes before the message field, so categorization precedes speech.

**Fix:** Compress the tape to one sentence, move "Mettre un nom" into the header or identity line, put the message before Type, and make the green submit full-width and taller on mobile.

**Suggested command:** `$impeccable layout`

### P2 - The primary controls use the wrong shape and weight

**Why it matters:** DESIGN.md specifies 10px fields and buttons and bans pills on page structure. The rendered HeroUI buttons are pill-shaped and visually light. The "Déposer" button reads like a secondary control, not the civic action the page exists for.

**Fix:** Override HeroUI button radius to `10px`, increase primary button height to at least 44px, and use full-width on mobile. Keep chips at `4px` as designed.

**Suggested command:** `$impeccable polish`

### P2 - Register and copy break the French civic register

**Why it matters:** `/guichet` displays `information`, `reclamation`, `signalement`, `recu`, `en_cours`, and `repondu`. Seed and server strings are also unaccented. This undercuts the professionalism claim the demo is trying to prove.

**Fix:** Add French label maps for kind, channel, and status. Normalize accented client-facing strings and seed bodies. Add a date column because "File du jour" currently omits the day.

**Suggested command:** `$impeccable clarify`

## Persona Red Flags

- **Low-literacy citizen on a small Android:** Voice is below the textarea and styled as an afterthought, even though speech may be the easier input. The placeholder prohibits instead of helping them start.
- **Identifying citizen:** "Mettre un nom sur le dossier" promises a name, but the API signs every demo user in as "Citoyen demo." There is also no sign-out.
- **Screen-reader user:** Kind choices behave as buttons rather than a labeled radio group. Voice status is plain text, not a live region. The loaded dossier page has no heading.
- **X skeptic:** The visual system is distinct, but raw enum values, a missing favicon, identical document titles, and an unprotected guichet weaken the credibility receipt.

## Minor Observations

- The disclaimer tape is approximately 160 characters wide on desktop and three lines on mobile. Shorten the sentence rather than shrinking text.
- The home link "Mettre un nom sur le dossier" appears only after session loading, causing a small layout shift.
- The terms "guichet officiel" and "Guichet (démo greffe)" point to different destinations. Rename the internal one to "Registre du greffe" or similar.
- `/guichet` footer paragraphs run approximately 141 characters inside the wide container.
- The loaded dossier page has no `h1`; "Coupon de suivi" is styled text.
- The skip link scrolls to `<main id="app">` but does not move focus because the target is not focusable.
- `aria-current` is missing from header navigation.
- Every route shares the same document title and there is no favicon.
- The OTP code field is not required, so an empty submit produces "Code invalide."
- The design says the code stamps onto the stub; the animation currently stamps only the DEMO badge.
- `/parler` is an unlinked alias of `/`.

## Questions to Consider

1. If the code is the only key, should the stub fill the whole success screen with copy, print, and photograph instructions?
2. Should the citizen choose the request type before writing, or should the clerk assign it after submission?
3. Should voice sit beside the message field rather than below it for the audience least comfortable writing French?
4. Is the yellow legal tape doing trust work, or is it consuming the space that should belong to the form?
5. Should the identified path stay in v0 if it cannot yet attach a real name or sign out?
