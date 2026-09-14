# Design

## Direction

A focused application product, not a decorated government homepage. The user rejected the civic-modernism pass: oversized editorial copy, unrelated motifs and multiple accent colors. References are the craft of Stripe onboarding, Mercury applications and Linear submission/tracking, not their marketing layouts.

The approved interaction is a two-stage intake: write, then review and submit. The user's message is the central content. Do not add simulated chat, legal classifications, document requirements or promises unsupported by the backend.

## Composition

- Shared container: 1080px maximum. The task column stays at or below 640px.
- Desktop: a neutral step rail beside an open white workspace. No hero, decorative card stack, patterned background or invented institutional illustration.
- Mobile: compact progress above the task. Navigation and the footer retain tracking and official-service links.
- The writing stage shows one question, the textarea, optional audio and Continue.
- Review shows the actual message, optional audio playback, request type, identity mode and demo confirmation.
- The receipt shows a readable reference, preservation actions, original message and chronological history.

## Visual system

- Public Sans throughout. Weight, spacing and alignment establish hierarchy, not a second display font.
- Display headings: 28-38px. Controls and messages: 13-16px. Input text remains 16px on mobile. Supporting text stays at least 12px.
- White workspace `#FFFFFF`, neutral rail `#F6F8FA`, text `#242B32`, secondary text `#616D79`.
- One interaction accent: green `#17634E`, hover `#10503E`.
- Rules `#E3E7EB`; input borders `#88939E`. Error and status colors express state, not branding.
- Controls use 7px corners. Record surfaces use 12px corners and a single border, without decorative shadows.
- No flag bands, seals, abstract weaving, colored arcs, serif headlines, gradient wordmarks or Ministry branding.

## Interaction contract

- Text remains required: 12-4000 characters after trimming. Audio supplements the text.
- Continue cannot submit. It validates the message and opens review.
- Microphone permission, recording and upload block Continue until resolved.
- Back and Modify preserve message, request type and completed audio. Editing requires renewed demo confirmation.
- Keep the recorder mounted across stages. Disable and hide the writing fieldset during review so hidden required fields cannot block submission.
- Mount Turnstile explicitly on review and remove the widget when leaving review. Keep server-side verification unchanged.
- Final submission needs a demo confirmation and a Turnstile token. Errors preserve the draft on the current page.
- No persistent draft or recovery promise: a reload or route exit can discard unsent work.
- Step changes focus the current heading. Short transform-only feedback respects reduced motion.

## Copy and disclosure

One concise independent-demo disclosure stays on every screen. The final checkbox states that the submission is not a judicial procedure. Use contextual help instead of repeating the full disclaimer in each paragraph. Account access never means verified legal identity.

## Verification

Run Worker and client TypeScript checks, `bun run test`, and the production build. Initial intake markup has Vitest server-render regression checks; those tests do not establish interactive correctness.

The user chose manual browser review. Check writing, review, back/edit, audio replacement, Turnstile loading/expiry, submission errors, receipt copying/printing, and 320px/390px layouts before visual sign-off.
