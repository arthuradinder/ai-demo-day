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
| 1 | `project-planner` | narrative, copy, slide spec | ✅ COMPLETE (rev 1) | `docs/01-project-brief.md`, `docs/02-slide-spec.md` |
| 2 | `frontend-designer` | implementation, visual design | 🟢 READY | `docs/03-implementation-report.md` |
| 3 | `qa-project-manager` | verification, git push, sign-off | ⬜ BLOCKED — waiting on Stage 2 | `docs/04-qa-report.md` |

Status values: `⬜ BLOCKED` · `🟢 READY` · `🟡 IN PROGRESS` · `✅ COMPLETE` · `🔴 DEFECT RETURNED`

**Spec revision:** 1 · **18 slides · 27.0 min of a 30-min slot**
**QA round:** 0 of max 3
**Current verdict:** — (`SHIP` · `SHIP WITH NOTES` · `BUILD-DEFECT` · `SPEC-DEFECT`)

## Event deadline

**Saturday, 8 August 2026 · Nairobi**
Event window 10:00–14:00 EAT (4 hours) · **this deck's slot: 30 minutes, closing the event (~13:30–14:00)**
Speaker-driven · graduates demo live earlier in the event

## Open placeholders — must resolve before ship

All are fill-in-the-blank, not structural. Stage 2 and Stage 3 can proceed in full while
they are outstanding; each resolves to a single edit in `src/content/deck.ts`.

| # | Item | Slides | Blocks ship? |
|---|---|---|---|
| 1 | Sponsor names, tiers, logo assets | 13, 14 | **yes** |
| 2 | Community founding date + 6–7 dated milestones | 4, 5, 6 | **yes** |
| 3 | Cohort 2 numbers: applied / enrolled / graduated / shipped | 2, 8, 9, 14 | **yes** |
| 4 | Community-wide numbers: members, events, cohorts, trained | 6, 14 | **yes** |
| 5 | Cohort 2 project titles + builder names | 9 | **yes** |
| 6 | Mentor and facilitator names | 11 | **yes** |
| 7 | Graduate quote **+ attribution consent** | 10 | **yes** — slide is cut, not anonymised, if consent is absent |
| 8 | Cohort 3 dates + application URL | 15, 16, 18 | **yes** |
| 9 | Community join link + social handles | 16, 18 | **yes** |
| 10 | Programme length in weeks | 2, 7, 9 | **yes** — spec assumes twelve, unconfirmed |
| 11 | "Free for every participant" claim | 13 | **yes** — must not ship if untrue |
| 12 | Sponsor contact or prospectus URL | 14, 16, 18 | no — falls back to a named person |
| 13 | Partnership contribution sentence | 12 | no |
| 14 | Venue host name, if venue was donated | 17 | no — line is removable |

## Log

Append one dated line per handoff. Newest last.

- **2026-08-03** — Stage 0: repo initialised; three pipeline skills, templates, and handoff board created. Stack locked to Vite + React + TS + Tailwind. Event facts locked; sponsors and member counts remain placeholders. Stage 1 set `READY`.
- **2026-08-03** — Stage 0: deck slot corrected from the full 4-hour event window to **30 minutes**. Planner must budget slide minutes to sum ≤ 30 (~18–26 slides at 60–90s each); QA now verifies runtime fit as a readiness check. GitHub remote wired to `arthuradinder/ai-demo-day`.
- **2026-08-03** — Stage 1 COMPLETE (rev 1). Brief and slide spec written: **18 slides, 27.0 min, 3.0 min slack**. Confirmed with user: deck **closes** the event (~13:30), speaker-driven, graduates demo live earlier. Stage 2 set `READY`.

  **Designer must watch:**
  - This is a **closing** deck. Do not build slides that explain the projects — the room watched them demo an hour earlier. Slide 9 is a one-glance roll of honour, not a catalogue.
  - **Slides 15–17 are the payload.** If anything gets squeezed, it must not be the call to action.
  - Two slides carry unusual legibility requirements: **11** (mentor names must not be shrunk to fit — split the slide instead) and **18** (read unattended from across a room; largest link text in the deck).
  - **Equal-weight constraints are hard, not stylistic**: host/partner (1, 12), audience groups (3), projects (9), mentor names (11), routes (16). Slide 12 must not be mistakable for a sponsorship tier.
  - **Never invent a sponsor name**, not even as sample or filler data in the content file.
  - Completion rate on slide 8 is **derived** from enrolled/graduated, never stored separately.
  - See `docs/02-slide-spec.md` § Cross-slide requirements for the shared-value single-sourcing rules.
