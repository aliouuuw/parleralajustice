---
target: /preview Preview.tsx
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-09-14T03-04-00Z
slug: web-src-client-preview-preview-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | After Continuer, step 1 stays « En cours » with aria-current while step 2 reads « Terminé ». Search does not write ?ref= into the URL. |
| 2 | Match System / Real World | 2 | Lede says « écrivez, relisez, suivez ». There is no reread. Six live types sit as a poster. The récépissé is a canned sample, not the words just written. |
| 3 | User Control and Freedom | 2 | No « modifier le message » after Continuer. The write form stays open under a fake completion. Sending a précision has no undo. |
| 4 | Consistency and Standards | 2 | Copy promises two stages. Continuer jumps to an example receipt. The timeline merges « Résolue ou rejetée ». The glossary lists seven statuses including Clôturée. |
| 5 | Error Prevention | 3 | Length, recording block, format check, and code normalisation work. The locked review gate is missing. |
| 6 | Recognition Rather Than Recall | 3 | Glossary and sample code are visible. Type is never chosen, so it cannot return on the dossier. Clipboard copy can fail with no message. |
| 7 | Flexibility and Efficiency | 2 | Voice plus text and tolerant references help. Continuer is type=button, so Enter in the textarea does not advance. No draft. |
| 8 | Aesthetic and Minimalist Design | 2 | Hero and yellow band are authored. The form is a generic civic column. Empty /preview/suivre is a vacant poster. |
| 9 | Error Recovery | 3 | French alerts name the fix. Copy failure has no message. Reply errors stay after the user types enough characters. |
| 10 | Help and Documentation | 3 | « Avant de commencer », format help, status glossary. No help for which of the six types is mine, because the types are not a control. |
| **Total** | | **24/40** | **Acceptable** |

## Design Specificity Verdict

**Start here.** Authored for this product in the first viewport. Category-interchangeable in the Operate chrome.

**LLM assessment:** The first screen cannot move to a tax portal unchanged: Karrik on a civic title, speech-bubble mark, print grain, three domestic scenes, flag green as proceed, flag yellow as wait, red as signal. Jokko's glow blobs, mixed English hero, and fake stat tiles are the interchangeable civic template. This preview refuses that look. Below the yellow band, `/preview` is still an 1184px centred column (dark rail, textarea, mint voice card). Empty `/preview/suivre` is a marketing split on desktop and a form sitting on the footer at 390px. The récépissé is a rounded card on a green field, not the notebook the third illustration promises. Pass 5 solved character in the hero. It did not solve composition in the task.

**Deterministic scan:** CLI detector on `web/src/client/preview/Preview.tsx` returned `[]` (exit 0). Zero rule hits in source.

**Visual overlays:** Injection succeeded on fresh `/preview` and `/preview/suivre` tabs. Console: 1 anti-pattern, 4 finding types (`layout-transition`, `marquee`, `repeating-stripes-gradient`, `codex-grid-background`). Live match count 0. All four live in unused HeroUI CSS from `web/src/client/index.css`, not `preview.css`. Treat as false positives. The live overlay server was stopped after the scan. Detector and design review agree: polish detectors cannot see the remaining problem.

## Overall Impression

The first screen is now a civic story. The service still apologises at the moment it should issue a file. The single biggest opportunity is to make Continuer honour « relisez », then give the récépissé and empty tracking the same authored density as the hero.

## What's Working

1. Independence is a system: dark banner, « Service de démonstration », « Données fictives », no seal, no arms. That is the product against Jokko's official SaaS costume.
2. Colour and type have jobs. Green proceeds, yellow waits, red signals, Sligoil carries PALJ-7K4M-2QX9, Karrik carries the title. The yellow taxonomy band is the first compositional break that is not more green on a white column.
3. When a dossier exists, Operate is serious: agent question, reply, status change, citizen glossary. That is the live platform's job without their title-first form or citizen-chosen priority.

## Priority Issues

### [P1] Continuer skips the locked reread and shows a canned récépissé

- **What:** Lede says « écrivez, relisez, suivez ». Continuer scrolls to « Exemple de confirmation » with PALJ-7K4M-2QX9. The user's message never comes back. Step 1 stays « En cours ».
- **Why it matters:** The locked IA is write, then review, then submit. Trust built in the hero drops at the moment that should be the receipt.
- **Fix:** Stage 2 shows the user's text and clip length, asks for a type, then confirms. Mint the sample code after that confirm. Steal Jokko's story-first order. Do not steal their title field or priority dropdown.
- **Suggested command:** `$impeccable polish` then `$impeccable delight`

### [P1] The six live types are wallpaper

- **What:** The yellow band lists Demande d'information through Autre. The form never chooses. The sample dossier hard-codes « Réclamation ».
- **Why it matters:** Research §J.3 makes category a required choice. A first-timer cannot tell whether writing is enough.
- **Fix:** Turn the band into the type control, or move the six types onto stage 2 as one required choice. Keep the short French descriptions. Do not add Jokko's « Titre de la demande » before the story.
- **Suggested command:** `$impeccable clarify` then `$impeccable bolder`

### [P1] Empty `/preview/suivre` has no first-screen job

- **What:** Desktop: lookup plus radial-masked art, then a large white field, then footer. 390px: art hidden, Rechercher mid-screen, footer in the first viewport.
- **Why it matters:** The Operate door looks unfinished next to the illustrated deposit door.
- **Fix:** Give the empty state the yellow/ink density of waiting. Keep the field and the sample helper. Drop the vacant art or make it a notebook fragment. Do not copy Jokko's empty card on a blob field.
- **Suggested command:** `$impeccable bolder`

### [P2] The step rail lies after Continuer

- **What:** Live DOM: step 1 `aria-current="step"` « En cours », step 2 `data-complete="true"` « Terminé ». The form stays editable.
- **Why it matters:** Screen-reader status and visual status disagree.
- **Fix:** On valid continue, mark step 1 complete, move `aria-current` to confirmation, lock or replace the write panel.
- **Suggested command:** `$impeccable polish`

### [P2] Below the hero, composition is still the rejected skeleton

- **What:** Workspace is still 260px rail + 720px form. Receipt is still a 16px-radius card on a green band.
- **Why it matters:** Attempt 3 failed because colour sat on an unchanged centred column. An agency reviewer will call the landing a campaign and the service a GOV.UK restyle.
- **Fix:** Let one Operate object break the container (récépissé as the notebook from slide 3, or type band overlapping the write stage). Do not add more flag paint to the same grid. Avoid Jokko's hover-scale channel cards.
- **Suggested command:** `$impeccable bolder`

## Persona Red Flags

**Jordan (first-timer):** Reads « Deux étapes » and « relisez », then one Continuer. Sees six types and never picks one. The récépissé labelled « Exemple » after a real paragraph reads as « did my text vanish? ». Footer links to Ministère de la Justice fight the banner they just trusted.

**Casey (distracted mobile):** 390px hero works; Commencer focuses `#message`. Continuer sits far down the page. Empty `/suivre` puts Rechercher in the thumb zone, then the footer. Voice copy wraps mid-list.

**Aminata (Dakar citizen, phone, daylight):** Yellow band and green Commencer stay readable in glare. 12px notice on ink is the first thing on a bright street. Empty `/suivre` is mostly white. No Wolof UI; voice names Wolof / pulaar / sérère, then the form is French only.

**Mamadou (agency design reviewer):** First screen is the portfolio shot. They then scroll: yellow taxonomy without a control, GOV.UK workspace with grain, vacant tracking. Autoplay carousel (7s) reads marketing, not guichet.

## Minor Observations

- `(obligatoire)` uses class `pv-optional`.
- Copy can stay « Copier la référence »; the error path has no label.
- Sample code button fills the field and does not search.
- Successful search leaves `/preview/suivre` with no `?ref=` (receipt link includes it).
- Reply `aria-invalid` stays true after the user types 12+ characters, until send.
- Timeline collapses Résolue / Rejetée. Glossary keeps both plus Clôturée.
- Desktop `h1` is `white-space: nowrap` from 1024px.
- Receipt times (« 13 sept. 05:42 ») look like server logs.
- Tracking art uses a radial mask that rhymes with Jokko's glow.

## Questions to Consider

1. What if the six types were the first action, and the kitchen illustration sat behind that choice instead of above a poster?
2. What if Continuer opened the user's own words on paper, and only then issued a code?
3. What if the récépissé were the notebook in slide 3, not a rounded card on green?
4. What if empty `/suivre` used the yellow waiting language of « En attente d'informations » instead of a vacant white split?
5. Does a 7-second hero carousel earn its height on a guichet, or should the three scenes be a still frieze so the form can start sooner?

## Cognitive load

6 of 8 checklist items fail (high). Grouping and visual hierarchy pass. Decision points over 4: the six-type band (no widget), the seven-status glossary.

## Emotional journey

Desired: I can speak → I reread → I hold a code → I come back and answer an agent.
Actual: authored hero → caution and six types → write fiction → canned example receipt. Tracking after a found code is the best end in the product. Deposit does not earn that end.
