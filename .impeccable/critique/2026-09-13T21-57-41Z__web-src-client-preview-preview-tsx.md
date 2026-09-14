---
target: /preview Preview.tsx
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
timestamp: 2026-09-13T21-57-41Z
slug: web-src-client-preview-preview-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Complete only retitles the same sample card. The code stays PALJ-7K4M-2QX9. |
| 2 | Match System / Real World | 2 | French register is right. Service aux citoyens and Obtenir un acte speak like the Ministry. |
| 3 | User Control and Freedom | 3 | Modifier returns to write. Reload wipes the draft. |
| 4 | Consistency and Standards | 2 | Suivre and Obtenir un acte leave /preview. Form H2 uses Public Sans. Page H1 uses Karrik. |
| 5 | Error Prevention | 2 | Length and fiction checkbox catch errors. Type defaults to Information. Copy works before any dépôt. |
| 6 | Recognition Rather Than Recall | 3 | Labels are visible. PJ and PALJ are unexplained. Six type names appear twice. |
| 7 | Flexibility and Efficiency | 2 | One path. Voice stores nothing and cannot replace text, so it is not an accelerator. |
| 8 | Aesthetic and Minimalist Design | 2 | Every block has the same dignity. Commencer is a 44px chip, not a start-page act. |
| 9 | Error Recovery | 3 | Empty Continuer focuses the alert. Unchecked Simuler le dépôt is only disabled, with no reason. |
| 10 | Help and Documentation | 2 | Help is refusal copy. No help on which of the six types to pick. |
| **Total** | | **23/40** | **Acceptable** |

## Design Specificity Verdict

**Start here.** Category-interchangeable civic SaaS. Swap the French copy for a UK tax start page and the page still reads.

**LLM assessment:** What is authored for this product: Karrik on the H1, Sligoil on PALJ-7K4M-2QX9, gold as wait, green as proceed, honest fiction copy, two-stage write then review. What is not: a 1200px centred column, left-aligned heading plus paragraph plus panel, a six-cell taxonomy, a SaaS forest rail, a mint-header dashboard card. Pass 4 changed chroma and stage logic. Pass 4 did not change space. The authored intro grid does not appear in the screenshot: the yellow Avant de commencer panel sits under Commencer, with dead white to the right of the H1. hidePrint sets display null on the same node as intro grid. Even if that grid is repaired, the layout is still copy-left and card-right. That is the rejected composition.

**Deterministic scan:** CLI detector on Preview.tsx, preview.styles.ts, and tokens.stylex.ts returned `[]` (exit 0). Zero rule hits in source. The mechanical layer is clean.

**Visual overlays:** Overlay injection succeeded on a fresh /preview tab. Banner is user-visible. Four in-page hits, all unused HeroUI CSS with 0 matching elements on /preview: layout-transition (height on error-message / accordion), skeleton shimmer marquee, repeating-conic on color-swatch, tiled radial on color-area. Treat all four as false positives. Detector and design review agree: polish detectors cannot see the remaining problem.

## Overall Impression

The page is a correct public-service skeleton with a flag-derived palette. It is not yet a Senegalese system. The single biggest opportunity is a new spatial idea, not more colour on this container.

## What's Working

1. Honest Operate copy inside the form: Simuler le dépôt, Aucune demande transmise, Données fictives.
2. Two OFL faces that can seed a system: Karrik on display, Sligoil on the tracking code.
3. Colour as role when it is allowed to mean something: gold wait, green proceed, forest destination band.

## Priority Issues

### [P0] The page has no spatial idea

- **What:** Uniform 1200px container. Stacked heading, paragraph, yellow panel, taxonomy, bordered workspace, card.
- **Why it matters:** Four visual passes already failed this way. A portfolio piece that claims to start a government design system cannot be a GOV.UK start page with OKLCH fills.
- **Fix:** Stop CSS on this skeleton. Lock 3–5 adjectives. Present two or three compositions as distinct spatial rules, not palettes. Build only after one composition is chosen.
- **Suggested command:** `$impeccable shape`

### [P1] First viewport argues against speaking

- **What:** At phone width, Commencer is a mid-screen chip. The yellow Avant de commencer panel then occupies the thumb zone. Six types sit before Que souhaitez-vous nous dire ?
- **Why it matters:** Aminata and Casey want to speak now. The Persuade fold sells caution and taxonomy. The Operate question is below the fold.
- **Fix:** Make the first screen the question plus a large start control that focuses #message. Keep one independence line. Move the three yellow rules and the six types behind Commencer or beside the write stage.
- **Suggested command:** `$impeccable distill`

### [P1] The récépissé peak is a spoiler that never pays off

- **What:** PALJ-7K4M-2QX9 is visible as Exemple de confirmation for the whole visit. Complete changes the header to Simulation terminée. Same number. Copier la référence can run before any write.
- **Why it matters:** The service is speak, get a code, come back. The page shows the code first and never issues a new one. Peak-end is flat.
- **Fix:** Hide the numbered artifact until complete. On complete, mint a new demo code still labelled fictive. Treat the récépissé as a designed document, not a dashboard card.
- **Suggested command:** `$impeccable delight`

### [P1] Nav and eyebrow impersonate a ministry portal

- **What:** Eyebrow Service aux citoyens. Nav Obtenir un acte. Footer Ministère de la Justice. Identity PJ in a green rounded square.
- **Why it matters:** Locked rule: no Ministry impersonation. Jordan thinks this desk issues acts. An agency reviewer smells coat-of-arms-lite in five seconds.
- **Fix:** Eyebrow becomes Prototype indépendant. Drop Obtenir un acte from this nav, or label it as an external e-Service. Keep ministry links in the footer as vrais services, quieter than the product name.
- **Suggested command:** `$impeccable clarify`

### [P2] Voice is theatre

- **What:** Tester le micro opens a live waveform. Caption: Aucun son conservé dans cet aperçu. Nothing attaches to Votre message. Continuer is blocked while the mic is live.
- **Why it matters:** The differentiator versus a web form is speech. Here speech is a demo widget next to mandatory text. Delight without consequence reads as toy.
- **Fix:** Bind a “voice note attached (not stored)” chip into review, or remove the recorder from intake and keep waveform only in a specimen.
- **Suggested command:** `$impeccable onboard`

## Persona Red Flags

**Jordan (first-timer):** Reads PJ as an unknown agency. Reads Obtenir un acte as a task. Reads six types as a test. Sees PALJ-7K4M-2QX9 and may copy it before writing. Placeholder about an audience assumes court knowledge.

**Casey (distracted mobile):** Three nav links wrap under the brand. Commencer is not thumb-anchored. Yellow panel fills the first screen after the button. Text is gone after an app switch. Continuer is mid-card, not sticky.

**Aminata (Dakar citizen, phone, daylight):** The page speaks French she can use. Then it tells her three times her words do not count. She never receives a unique code. Voice does not count. Daylight washes the 12px gold banner.

**Mamadou (agency design reviewer):** Attempt 1 toy is gone. What remains is a startup settings page: 8px / 16px radius, green app mark, forest onboarding rail, mint invoice header. He will not buy “beginning of a government design system” from a centred 1200px column with colour bands.

## Minor Observations

1. Intro display:grid is dead. hidePrint on the same node sets display null. Outcome grid works because it sits on an inner div.
2. Form title Que souhaitez-vous nous dire ? is Public Sans 650 at 30px. Karrik stops at the fold.
3. Type glosses are tautologies: Contestation / Contester une décision.
4. History times 13 sept. 05:42 read as server logs, not a civic récépissé.
5. Commencer and Continuer are the same green chip. The start of a public service needs a different mass than a wizard next.

## Questions to Consider

1. If Aminata has 20 seconds of daylight and a thumb, why is the first question not Que souhaitez-vous nous dire ?
2. Why does PALJ-7K4M-2QX9 exist before she has spoken?
3. What spatial rule belongs to a Senegalese civic system that is not 1200px, centred, heading plus card?
4. What does a récépissé look like if it must survive a folded pocket, not a dashboard?
5. Can honesty live in one sentence so the rest of the page can rehearse a serious service instead of apologising for one?

## Cognitive load

7 of 8 checklist items fail (high). Grouping is the only pass. Two decision points exceed 4 options: Six types de demandes, and the Type de demande select.

## Emotional journey

Desired arc: I can speak → I was heard → I hold a code.
Actual arc: You cannot (banner plus yellow 1–2–3) → here are six legal categories → a small Commencer → write fiction → confess it is fiction → look at the same sample card.
Peak-end is spoiled. The destination sits on the page before the citizen speaks.
