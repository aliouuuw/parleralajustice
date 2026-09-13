# Parler a la justice

Indie civic demo of a clearer citizen justice intake for Senegal. Not a Ministry product.

Live Worker: https://parleralajustice.aliouuuw.workers.dev

## What this is

A public proof after the 10 September 2026 launch of Jokko Ak Yoon and e-Justice. Goal: show a better intake on X. Not a procurement pitch.

Demo data only. Do not file a real complaint here.

## Official platforms (not this repo)

Three products, not two. See [research/jokko-ak-yoon-e-justice.md](research/jokko-ak-yoon-e-justice.md).

1. **Jokko Ak Yoon** — citizen dialogue at `jokkooakyoon.sn`. Not for acts.
2. **e-Justice métier** — court stack (TGI Pikine-Guédiawaye). Not public.
3. **e-Services** — acts (casier, nationalité, permis de communiquer) at [public.e-service.sn](https://public.e-service.sn) and [e-senegal.sn](https://e-senegal.sn).

## Layout

```
docs/        product rules and task graph
research/    cited public briefing
web/         Cloudflare Worker (Bun, Vite assets later)
```

## Stack

- One Worker + static assets (`web/`)
- D1 + Better Auth 1.7 email OTP
- R2 for audio (MediaRecorder in the browser)
- Bun for JavaScript

Routes: `/` two doors, `/parler`, `/acte`, `/suivre`, `/d/PALJ-XXXX`, `/connexion`, `/guichet`.

## Run

1. Copy `web/.dev.vars.example` to `web/.dev.vars`.
2. Set `BETTER_AUTH_SECRET` (`openssl rand -base64 32`).
3. From the repo root:

```bash
bun install --cwd web
bun run cf-typegen
bun run test
bun run dev
```

Open http://localhost:8787

Connexion demo: use an e-mail with a domain (`demo@exemple.sn`). The code prints on screen. Real mail is not wired.

## Deploy

```bash
bun run deploy
```

Remote D1: `bun run db:migrate` from `web/` after a new SQL file.

## Rules

- Distinct name and domain. Do not copy `jokkooakyoon.sn`.
- Banner: not the Ministry.
- Guest path must be explicit. Named complaints need sign-in.
- Do not store real judicial complaints (loi 2008-12).
- `/admin` routes in e-service JS are frontend routes, not a proven open API.

## Docs

- [docs/product.md](docs/product.md) — product constraints
- [docs/DESIGN.md](docs/DESIGN.md) — visual rules
- [docs/progress.md](docs/progress.md) — checkpoint
- [AGENTS.md](AGENTS.md) — agent conventions
- [docs/backlog.json](docs/backlog.json) — next tasks
