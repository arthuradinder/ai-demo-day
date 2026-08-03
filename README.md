# Nairobi AI Community — Demo Day Deck

Presentation deck for the **AI Automations Training, Cohort 2 Demo Day**.

| | |
|---|---|
| **Host** | Nairobi AI Community |
| **Partner** | The AI Collective — Nairobi Chapter |
| **Programme** | AI Automations Training, Cohort 2 |
| **When** | Saturday, 8 August 2026 · event window 10:00 – 14:00 EAT |
| **Deck slot** | 30 minutes |
| **Where** | Nairobi, Kenya |
| **Stack** | Vite · React 19 · TypeScript · Tailwind CSS v4 |

## Status

Stage 0 (project setup) complete. See [docs/HANDOFF.md](docs/HANDOFF.md) for who owns the
work right now.

## How this project is built

Three role skills run as a pipeline, each gated on the previous one's artifact. No stage
starts without a signed handoff, and no stage approves its own work.

```
[1] project-planner  ──01-project-brief.md──▶  [2] frontend-designer  ──03-impl-report.md──▶  [3] qa-project-manager  ──▶ SHIP
        ▲              02-slide-spec.md              ▲        │                                        │       │
        │                                            │        └──────── BUILD-DEFECT ─────────────────┘       │
        └────────────────────── SPEC-DEFECT ─────────┴────────────────────────────────────────────────────────┘
```

| Stage | Skill | Owns | Produces |
|---|---|---|---|
| 1 | [`project-planner`](.claude/skills/project-planner/SKILL.md) | Narrative, audience, literal slide copy | `docs/01-project-brief.md`, `docs/02-slide-spec.md` |
| 2 | [`frontend-designer`](.claude/skills/frontend-designer/SKILL.md) | Implementation, visual design | `docs/03-implementation-report.md` |
| 3 | [`qa-project-manager`](.claude/skills/qa-project-manager/SKILL.md) | Verification, git push, sign-off | `docs/04-qa-report.md` |

Rules that make the chain hold:

- **Content and code are separate.** The planner writes copy; the designer never invents it.
- **The spec is the contract.** Slide `id`s are stable; QA verifies acceptance criteria verbatim.
- **QA routes on root cause** — spec wrong → back to Stage 1, implementation wrong → back to Stage 2.
- **Only QA pushes.** Capped at 3 defect rounds before escalating to a human.
- Unconfirmed facts are tagged `PLACEHOLDER` end to end, so nothing gets presented to
  sponsors in the room as a fact when it's a guess.

Start the pipeline with the `/project-planner` skill.

## Running the deck

Not scaffolded yet — Stage 2 builds it. Once it exists:

```bash
npm install
npm run dev     # present at http://localhost:5173
npm run build   # dist/ — static, works offline
```

## Layout

```
.claude/skills/     three pipeline role skills
docs/
  HANDOFF.md        pipeline state board — read this first
  templates/        artifact templates each stage fills in
src/                the deck (Stage 2)
```

## Outstanding before the event

- [ ] Sponsor names, tiers, and logo assets — **blocks ship**
- [ ] Community member and Cohort 2 numbers — **blocks ship**
- [ ] Confirm speaker-driven vs self-running
