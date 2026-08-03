# QA Report — Demo Day Deck

**Round:** N of max 3 · **Date:** YYYY-MM-DD · **Author:** qa-project-manager
**Spec:** rev N · **Commit reviewed:** `sha` · **Deck run for real:** yes / no

## Verdict

> `SHIP` · `SHIP WITH NOTES` · `BUILD-DEFECT` · `SPEC-DEFECT`

One paragraph: what state the deck is in and what happens next.

## Coverage

| Spec `id` | Present | Order OK | Acceptance | Notes |
|---|---|---|---|---|
| `…` | ✅ | ✅ | 3/3 ✅ | |

Extra slides not in spec: …

## Readiness checks

| Check | Result | Evidence |
|---|---|---|
| 1920×1080 16:9 | | |
| Back-row legibility (body ≥ 24px equiv) | | |
| Contrast ≥ 4.5:1 — measured | | |
| Keyboard nav + presenter remote arrows | | |
| No hover-dependent content | | |
| Works offline | | |
| `npm run build` + `tsc --noEmit` clean | | |
| No console errors on a full pass | | |
| No committed secrets; `.gitignore` covers `node_modules`, `dist` | | |

## Defects

| ID | Sev | Slide `id` | Problem | Expected | Actual | Route |
|---|---|---|---|---|---|---|
| `QA-1` | BLOCKER | `…` | | | | frontend-designer |

`BLOCKER` = cannot present · `MAJOR` = visibly off-spec · `MINOR` = polish

## Placeholders still in the deck

Pre-event checklist for the user. Deadline: **Saturday 8 August 2026, 10:00 EAT**.

| Item | Where | Blocks ship? |
|---|---|---|
| Sponsor names + logos | `src/content/deck.ts` | yes |

## Ship actions taken

- [ ] `docs/HANDOFF.md` updated
- [ ] QA report committed
- [ ] `git remote -v` verified
- [ ] Pushed
