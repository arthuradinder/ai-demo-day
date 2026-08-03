# CLAUDE.md

Presentation deck for the Nairobi AI Community × The AI Collective (Nairobi Chapter)
**AI Automations Training, Cohort 2 Demo Day** — Nairobi, Saturday 8 August 2026, 10:00–14:00 EAT.

## Work through the pipeline, not around it

This project is built by three gated role skills. Do not freehand changes that belong to
a stage — invoke the stage.

1. `project-planner` — narrative + literal slide copy → `docs/01-project-brief.md`, `docs/02-slide-spec.md`
2. `frontend-designer` — implementation → `docs/03-implementation-report.md`
3. `qa-project-manager` — verification, push, sign-off → `docs/04-qa-report.md`

**Read [docs/HANDOFF.md](docs/HANDOFF.md) first** to see which stage owns the work.

Routing when something is wrong: content/narrative/copy → Stage 1. Layout/code/behaviour
→ Stage 2. Verification, git push, ship decision → Stage 3 only.

## Hard rules

- **All copy and data live in `src/content/deck.ts`.** Never hardcode text, sponsor names,
  or numbers in JSX. Sponsors and member counts are placeholders and will change.
- **Never invent facts.** Sponsor names, attendance figures, funding, partner
  relationships, and outcomes come from the brief or they are tagged `PLACEHOLDER` and
  render as visibly provisional. This deck is presented to sponsors in the room.
- Slide `id`s from the spec are permanent. One `id` = one component in `src/slides/`.
  Presentation order comes only from `src/slides/index.ts`.
- Only `qa-project-manager` pushes to the remote.

## Stack

Vite · React 19 · TypeScript (strict) · Tailwind CSS v4. No slide framework, no UI kit,
no animation library. Must run offline after `npm install` — assume no venue wifi.

## Presentation constraints

Designed for a projector at **1920×1080, 16:9** in a lit room. Body text ≥ 24px
equivalent, contrast ≥ 4.5:1, one idea per slide, no hover-dependent content, keyboard
nav must work with a presenter remote (arrow keys).

## Commands

```bash
npm install
npm run dev          # present at http://localhost:5173
npm run build        # dist/ — static, offline-capable
npx tsc --noEmit     # must be clean before any handoff
```
