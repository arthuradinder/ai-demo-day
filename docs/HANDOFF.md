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
| 1 | `project-planner` | narrative, copy, slide spec | ✅ COMPLETE (rev 2) | `docs/01-project-brief.md`, `docs/02-slide-spec.md` |
| 2 | `frontend-designer` | implementation, visual design | ✅ COMPLETE (spec rev 2) | `docs/03-implementation-report.md` |
| 3 | `qa-project-manager` | verification, git push, sign-off | 🟢 READY | `docs/04-qa-report.md` |

Status values: `⬜ BLOCKED` · `🟢 READY` · `🟡 IN PROGRESS` · `✅ COMPLETE` · `🔴 DEFECT RETURNED`

**Spec revision:** 2 · **18 slides · 27.0 min of a 30-min slot**
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
| 0 | **Partner logo files** — drop into `public/logos/` at the exact names in its README | 12 | no — falls back to the org name, but visibly worse |
| 1 | Sponsor names, tiers, logo assets | 13, 14 | **yes** |
| 1b | Nairobi Business Angel Network's actual contribution — currently unstated on purpose | 13 | no — **must not be guessed** |
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
- **2026-08-03** — Stage 2 COMPLETE (spec rev 1). All 18 slides built: Vite + React 19 + TS strict + Tailwind v4, fixed 1920×1080 scaled stage, keyboard + presenter-remote nav, overview grid, speaker notes. `tsc` and `build` clean, 18/18 render, no console errors, no stage overflow, 14/14 contrast pairs pass (worst 5.09:1), smallest text exactly at the 24px floor. Stage 3 set `READY`. **Not pushed — QA controls the push.**

  **QA must look at:**
  - **Three deviations** from spec rev 1, each argued in the implementation report: `journey-timeline` built vertical instead of horizontal (a horizontal 7-column layout failed the back-row legibility bar — screenshotted and rejected); `title-close` splits the partner qualifier onto its own line; `sponsors-partners` stacks the unverified cost claim above its sentence instead of inline. Accept or route back.
  - Two repo scripts exist so you can verify rather than trust this report: `npm run check:contrast` and `npm run capture` (needs `npm run dev` running). Both exit non-zero on violations. Re-run them.
  - `playwright` was added as a devDependency for the capture script. Not in the deck bundle.
  - **`dist/deck-standalone.html`** — single 243 kB self-contained file, verified rendering all 18 slides over `file://` with no server and no network. This is the venue fallback if the projector laptop has no toolchain.
  - Known gaps are listed in the report: slides 6/8/10 look sparse until real figures land; mentor/project slot counts (8 and 9) are assumed and may force a slide split; no QR codes yet; reduced-motion CSS present but not driven under an emulated setting; never tested on a real projector.
- **2026-08-04** — Spec amended to **rev 2** and Stage 2 re-run (Round 2). User supplied partner identities and logo art: Nairobi AI Community and The AI Collective — Nairobi Chapter are the two main partners; **Nairobi Business Angel Network** is a third partner. Only slides **12** and **13** changed; slide count, order, `id`s and the 27.0 min runtime are unchanged.

  **What changed:**
  - Slide 12 renders both main partner logos in identical boxes, capped on both axes, on identical neutral cards — the cards exist because the two marks differ in shape and one has a solid background, so placing them directly on the tinted ground would have made one partner look privileged.
  - Slide 13 gains a separately labelled "In partnership with" band for NBAN, deliberately **outside** the sponsor grid, with the "paid for it" sentence scoped to the grid alone. Headline is now "Made possible by our sponsors and partners".
  - **NBAN's actual contribution is deliberately unstated.** Its role is unknown and the room includes people who would know; nothing on the slide may imply it funded the cohort.

  **QA must know:**
  - **The logo image files are NOT in the repo** — they could not be written to disk from the conversation. `public/logos/README.md` gives the exact required filenames. Until they are added, slide 12 renders each organisation's name at full weight (the designed fallback), never a broken image. Verified both paths with throwaway test art at the real aspect ratios, then deleted it — no placeholder image ships.
  - Five defects were found and fixed in Round 2, all caught by looking at rendered output rather than by the build: slide 13 overflowing the stage by 109px, the logo fallback printing the org name twice, the `×` separator misaligning without a card, absolute logo paths that would have broken over `file://`, and "Thank you." sitting flush against the partner band.
  - One added deviation: slide 12's body clause ends with a colon instead of the spec's em-dash, because the contribution placeholder now sits on its own line and a trailing dash dangled.
  - `npm run capture` now separates *missing-asset* warnings from real console errors, so absent logos are reported without failing the run. Still printed — never silently swallowed.
  - **`.claude/settings.json` was deliberately left out of the commit.** It accumulated from permission approvals this session and contains a broad `Bash(node -e ' *)` wildcard; whether to commit or ignore it is the user's decision, not the pipeline's.
