# Cash App foundations: what applies to pass 7

Source: https://design.cash.app/foundations, read 14 September 2026. The site is a
client-rendered app. Facts below come from the page data embedded in the HTML,
quoted or paraphrased closely. Nothing here is from memory.

Stripe was not researched. Stripe items in `docs/UI-HANDOVER.md` §16 are
principles, not measured values.

## Typography

System architecture:

- One brand typeface, **Cash Sans**: "a customized version of Söhne by Klim Type
  Foundry", a neo-grotesque. The main change from Söhne is **rounded
  punctuation**, for "warmth and approachability".
- Two widths (Regular and Wide), many weights, italics, plus **Cash Sans Mono**
  in three weights.
- An occasional editorial serif, **Exact Block**, "reserved for occasional and
  intentional use".
- Expressive display type may sit beside Cash Sans, but it "should be distinctly
  different from Cash Sans so as not to visually compete".

Rules:

- **Weights:** "Regular and Medium are our default for typesetting."
  Neutral headline: Semibold. Display headline: Wide Black.
- **Tracking:** "Aim for a value between -3% and 0%." Positive tracking only to
  help legibility at small sizes.
- **Leading:** "between 85% and 120% of the type size. Larger headlines use lower
  values, while body text uses higher values."
- **Hierarchy:** "Aim for high contrast between text sizes across hierarchy
  levels." The site itself uses 90 / 48 / 22 / 14 / 10 pt (page title,
  subsection heading, intro and nav, body, spec).
- Do not mix widths at the same or similar sizes.
- Wide width only for headlines and short copy.
- **Mono:** "Technical data or tertiary information can be used small in mono.
  Avoid setting paragraphs of text in mono." Do not use mono for expressive
  headlines.
- "Body copy should not be expressive."
- "Avoid loose headlines."
- **Ambiguous letterforms** (O/0, I/l): use Slashed Zero, tabular numbers, or
  mono where a string must be read back exactly.

## Colour and accessibility

- Aim for WCAG AAA: "a contrast ratio of at least 7:1 for normal text".
- "Cash Green is specifically created to work with black text, not green text."
  Same logic as our flag gold: a surface, never a text colour.
- Black and white balance the signature green so it "stands out where it matters
  most". Do not flood every surface.
- Do not invent tints or shades. Use the defined palette.

## Motion

- "Straightforward and unfussy. Smooth, polished and flowing. Avoid any sense of
  stiffness."
- Motion is "in service of communication, not decoration".
- Text reveal pattern: "Words appear with a slide up motion."

## Voice

- "Clarity first (style second)."
- "We tell it like it is ... We set clear expectations for outcomes."
- When delivering bad news, be "hyper aware of our customer's emotional state".
  Relevant to status « Clôturé » and error states.

## Font check for this project (same day)

Measured with fontkit on the real files. Specimen:
`research/type-specimen-2026-09-14.png`.

| Face | Licence | French | Wolof ŋ Ŋ | Features |
|---|---|---|---|---|
| Karrik 400 (removed 14 Sep) | OFL | yes | yes | tnum, case, zero, ss01 to ss06 |
| Public Sans (product app only) | OFL | yes | yes (latin-ext subset) | tnum, frac |
| Sligoil Micro | OFL | yes | yes | monospaced (all glyphs 600 units) |
| **Mona Sans (chosen)** | OFL | yes | yes | tnum, width axis |
| Atkinson Hyperlegible Next and Mono | OFL | yes | **no** | tnum |
| Hubot Sans | OFL | yes | yes | width axis |
| Redaction | OFL | yes | yes | serif |
| Apfel Grotezk, Bagnard | OFL | yes | **no** | |

- No face above has U+202F (narrow no-break space). The preview copy does not
  use it today.
- Karrik's slashed zero looks like the letter Ø at display size. Do not enable
  `zero`.
- The tracking-code alphabet (`web/src/cases.ts`) already excludes 0, O, 1 and I,
  so a slashed zero is not needed for codes.
