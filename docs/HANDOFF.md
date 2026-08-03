# Handoff Board

Single source of truth for who owns the work right now. Every stage reads this on entry
and updates it on exit. If two stages appear `IN PROGRESS`, stop and resolve that first.

## Pipeline

```
[1] project-planner  ──01-project-brief.md──▶  [2] frontend-designer  ──03-impl-report.md──▶  [3] qa-project-manager  ──▶ SHIP
        ▲              02-slide-spec.md              ▲        │                                        │       │
        │                                            │        └──────── BUILD-DEFECT ─────────────────┘       │
        └────────────────────── SPEC-DEFECT ─────────┴────────────────────────────────────────────────────────┘
```

## Status

| # | Stage | Owns | Status | Artifact |
|---|-------|------|--------|----------|
| 0 | project setup | repo, skills, templates | ✅ COMPLETE | this repo |
| 1 | `project-planner` | narrative, copy, slide spec | 🟢 READY | `docs/01-project-brief.md`, `docs/02-slide-spec.md` |
| 2 | `frontend-designer` | implementation, visual design | ⬜ BLOCKED — waiting on Stage 1 | `docs/03-implementation-report.md` |
| 3 | `qa-project-manager` | verification, git push, sign-off | ⬜ BLOCKED — waiting on Stage 2 | `docs/04-qa-report.md` |

Status values: `⬜ BLOCKED` · `🟢 READY` · `🟡 IN PROGRESS` · `✅ COMPLETE` · `🔴 DEFECT RETURNED`

**Spec revision:** — (set by Stage 1)
**QA round:** 0 of max 3
**Current verdict:** — (`SHIP` · `SHIP WITH NOTES` · `BUILD-DEFECT` · `SPEC-DEFECT`)

## Event deadline

**Saturday, 8 August 2026 · Nairobi**
Event window 10:00–14:00 EAT (4 hours) · **this deck's slot: 30 minutes**

## Open placeholders — must resolve before ship

| Item | Owner | Blocks ship? |
|---|---|---|
| Sponsor names, tiers, logo assets | user | yes |
| Community member / cohort 2 numbers | user | yes |
| Speaker-driven vs self-running deck | user | no |

## Log

Append one dated line per handoff. Newest last.

- **2026-08-03** — Stage 0: repo initialised; three pipeline skills, templates, and handoff board created. Stack locked to Vite + React + TS + Tailwind. Event facts locked; sponsors and member counts remain placeholders. Stage 1 set `READY`.
- **2026-08-03** — Stage 0: deck slot corrected from the full 4-hour event window to **30 minutes**. Planner must budget slide minutes to sum ≤ 30 (~18–26 slides at 60–90s each); QA now verifies runtime fit as a readiness check. GitHub remote wired to `arthuradinder/ai-demo-day`.
