# QA Report — Demo Day Deck

**Round:** 2 of max 3 · **Date:** 2026-08-06 · **Author:** qa-project-manager
**Spec:** rev 3 · **Deck run for real:** yes · **Supersedes:** round 1 (rev 2, 18 slides)

## Verdict

> **SHIP WITH NOTES**

The deck is correct against spec rev 3 and materially stronger than at round 1: **14 slides,
exactly 15.0 minutes for the 12:30–12:45 slot, and zero placeholders** — down from 40. Every
figure, name, date, URL and QR code is real. No BLOCKER defects in the build.

**Two content conflicts remain, and both are factual claims that will be on screen.** They
are the user's to settle, not the pipeline's, and neither is a code defect. Pushing and
publishing to GitHub Pages; the conflicts are recorded below and on the handoff board.

## Coverage

Verified by extracting `id`s from the spec order table and from `src/slides/index.ts` and
diffing them, not by reading the implementation report.

| Check | Result |
|---|---|
| Spec `id`s / implemented `id`s | 14 / 14 |
| Order match | **exact** — no omissions, no reordering, no extras |
| One component per `id` | 14 components in `src/slides/` |
| Spec minutes vs code minutes | 15.00 vs 15.00 — agree |
| Runtime vs the 15-min slot | **exactly 15.0**, of which 4.0 is the virtual address |
| Retired `id`s not reused | ✅ all 6 confirmed absent |

Retired and verified gone: `cohort2-by-numbers`, `cohort2-showcase-recap`, `graduate-voice`,
`partnership-aic`, `sponsor-impact-cta`, `close-holding`.

## Readiness checks

Every row re-run, not taken from the implementation report.

| Check | Result | Evidence |
|---|---|---|
| All 14 slides render | ✅ 14/14 | `capture-slides.mjs` |
| Content overflowing the stage | ✅ none | overflow column all `—` |
| Smallest rendered text | ✅ 24px+ (mostly 28–44px) | measured per slide; improved as placeholders went |
| Contrast ≥ 4.5:1 — measured | ✅ 16/16, worst 4.81:1 | `check-contrast.mjs` re-run |
| `tsc --noEmit` + `npm run build` | ✅ clean | no output |
| Console errors on a full pass | ✅ none | — |
| Placeholders in content | ✅ **0** | `grep tbc` |
| No invented org names | ✅ | no filler names in `deck.ts` |
| No hover-dependent content | ✅ | zero `hover:` in `src/` |
| `.gitignore` covers build/output | ✅ | `node_modules`, `dist`, `screenshots` |
| Works offline as a single file | ✅ | verified from an **empty directory** |
| Works at a Pages **subpath** | ✅ | simulated `/ai-demo-day/`; index, QR and logos all 200 |
| QR codes encode the intended URLs | ✅ both | re-encoded and byte-compared |

### QR verification

Rather than assume the SVGs on disk match their intended destinations, each was re-encoded
from the URL in `deck.ts` and compared byte-for-byte:

| File | Encodes | Match |
|---|---|---|
| `public/qr/application.svg` | `https://nairobiaicommunityn8ntraining.lovable.app/` | ✅ |
| `public/qr/linkedin.svg` | `https://www.linkedin.com/company/nairobi-ai-community/?viewAsMember=true` | ✅ |

### Subpath verification

GitHub Pages serves at `/<repo>/`, not a domain root, which is where relative-base builds
usually break. I served `dist/` from an `/ai-demo-day/` subpath and rendered the whole deck
through it: all 14 slides clean, and `qr/` and `logos/` both resolved. The relative `base` in
`vite.config.ts` is correct for Pages.

## Defects

No BLOCKER in the build. One MAJOR was found and fixed during the round; the rest are notes.

| ID | Sev | Where | Problem | Status |
|---|---|---|---|---|
| `QA-5` | MAJOR | `scripts/inline-dist.mjs` | The standalone offline build **did not contain the QR codes**. Only `dist/logos` was inlined, so `./qr/*.svg` stayed external and resolved purely because the HTML sat beside `dist/qr/`. Copied alone to a USB stick the codes vanish **silently**, leaving slides that say "scan the code" with no code. | **fixed** — inliner now covers every asset directory; verified from an empty directory |
| `QA-6` | MINOR | slide 11 | Sponsor names overflowed their cells at `h2` | fixed |
| `QA-7` | MINOR | overview chrome | Still advertised a 30-minute slot | fixed |
| `QA-8` | MINOR | docs | Spec per-slide detail sections still describe the 18-slide rev 2 deck | **open** — flagged in the spec itself |

## Blocking questions for the user — not defects

Recorded rather than resolved, because guessing either would put a wrong claim on screen in
front of people who know better.

1. **3 groups or 6 teams?** The run of show in brief rev 2 says *"6 teams present their
   capstone project"* across 12:45–13:45. The rev 3 direction says *"3 groups, each given 5
   minutes"* — 15 minutes, not 60. Slide 9 (`capstone-lineup`) is built with **3**, read from
   one content value, so correcting it is a single edit.
2. **"5 years" vs a mid-2019 start.** Slide 4 says the community ran *"for 5 years"* before the
   December 2025 leadership meeting; slide 5 dates operations to **mid-2019**, which is about
   6.5 years. The speaker will be contradicted by the timeline two slides later.

## Outstanding, non-blocking

- **2 more sponsor logos**, plus logo files for the 3 named sponsors (they render as names
  meanwhile, which is presentable).
- **Nothing stays on screen after ~12:45** now that `close-holding` is removed, while the event
  runs to 14:00. `get-involved` carries the application QR and is the natural slide to leave up.
- **Spec detail sections** need rewriting to rev 3 (`QA-8`).

## Note on this round's independence

As at round 1: all three pipeline roles are executed by the same agent, so this review lacks
the independence the skill's own rules assume. The mitigations are mechanical rather than
social — coverage by diffing extracted `id`s, contrast and overflow by scripts that exit
non-zero, QR correctness by re-encoding and byte-comparing, offline and subpath behaviour by
actually serving and rendering. `QA-5` was found that way and would not have been found by
reading the code. The judgement calls remain reviewable by a human.

## Ship actions taken

- [x] `docs/HANDOFF.md` updated
- [x] QA report committed
- [x] `git remote -v` verified
- [x] Pushed to `origin/main`
- [x] GitHub Pages workflow added (`.github/workflows/deploy.yml`)
- [ ] **User action required:** Settings → Pages → Source = **GitHub Actions**
