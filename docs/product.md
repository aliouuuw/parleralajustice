# Product

Last updated: 12 September 2026.

## Who

Senegalese indie developer. Not the Ministry of Justice. Not a vendor of Jokko Ak Yoon.

Goal: a public civic demo after the 10 September 2026 launch drew bad X feedback (UX, IA, mobile, French, security, professionalism). Proof on X. Not a procurement deck.

Free demo. Paid audit or rebuild is later and is not the launch message.

## Three official products

Do not collapse these in copy or UI.

1. **Jokko Ak Yoon** — dialogue (info, réclamation, signalement, suggestion). Not for acts. Domain `jokkooakyoon.sn` (double o).
2. **e-Justice métier** — court stack, TGI Pikine-Guédiawaye. Not public.
3. **e-Services** — acts at `public.e-service.sn` and `e-senegal.sn`.

Cited briefing: [research/jokko-ak-yoon-e-justice.md](../research/jokko-ak-yoon-e-justice.md).

## Name and host

- Product name: **Parler a la justice** (`parleralajustice`).
- Current host: `https://parleralajustice.aliouuuw.workers.dev`
- Account `workers.dev` subdomain is `aliouuuw` (shared by every Worker on this Cloudflare account).
- Later: `.com` if traction, `.sn` if official interest.
- Do not use a lookalike of `jokkooakyoon.sn`.

## Legal

- Demo data only. Never store a real judicial complaint (loi 2008-12).
- Banner on every screen: this is not the Ministry.
- Two doors in v0:
  - **Parler** — intake demo
  - **Obtenir un acte** — link out to e-Sénégal / e-service. Do not rebuild acts.
- Two identity paths:
  - Anonymous signalement + tracking code
  - Signed-in path for named complaints
  - Guest must be explicit. No silent guest session.
- Voice: MediaRecorder in the browser, then R2. No file-upload fake. Cut video and chat for v0.
- Dual UI: citizen + `/guichet` clerk view with seeded fake cases.

## Stack (frozen)

- One Worker + `assets.directory`. Not Pages plus a second Worker.
- Better Auth + D1. Email OTP first. Resend later. WhatsApp OTP (Kapso) later. Meta limit rungs start at 250, then 2,000 (no 1,000 rung).
- Turnstile + Workers Rate Limiting on case create and OTP.
- Didit only as a clip on the developer CNI. No DAF registry API.

## Auth spike (done)

- Better Auth 1.7.3 accepts `database: env.DB`.
- Routes: `/api/auth/*`.
- OTP is stored in D1 table `spike_otp` for tests. Not production mail.
- `POST /api/demo/otp` reads any email's pending OTP back, no ownership check. This is a demo backdoor to skip real email, not a security boundary. Its 10/60s rate limit only slows how fast that OTP can be read, it does not stop it. Close this before treating the identified path as real auth (T006b).
- Secret: `BETTER_AUTH_SECRET` via `.dev.vars` locally and `wrangler secret` remotely.

## Launch on X

- Two steps: redesign thread around 48 hours after launch, working demo day 7–10.
- Receipts: DNS, WHOIS, Contabo vs sovereignty speech. Craft finding on `/admin` JS, not “hacked”.
- No WHOIS cold-pitch.
