# Implementation Report — Demo Day Deck

**Round:** N · **Date:** YYYY-MM-DD · **Author:** frontend-designer
**Spec:** `docs/02-slide-spec.md` rev N · **Commit:** `sha`

## Build health

| Check | Result |
|---|---|
| `npx tsc --noEmit` | ✅ / ❌ |
| `npm run build` | ✅ / ❌ |
| Full pass in `npm run dev`, no console errors | ✅ / ❌ |
| Renders at 1920×1080 16:9 | ✅ / ❌ |

## Spec coverage

| Spec `id` | Component | Content source | Done |
|---|---|---|---|
| `…` | `src/slides/….tsx` | `src/content/deck.ts → …` | ✅ |

## Placeholders rendered

Everything the spec tagged `PLACEHOLDER`, and how it visibly reads as provisional.

| Spec `id` | Placeholder | Treatment | Where to edit |
|---|---|---|---|
| `…` | Sponsor logos | Dashed slot + "Sponsor TBC" | `src/content/deck.ts` |

## Deviations from spec

Each with reasoning. Anything unjustified is a defect QA will route back.

| Spec `id` | Spec says | I built | Why |
|---|---|---|---|
| `…` | | | |

## Known gaps

- …

## How to run

```bash
npm install
npm run dev     # present at http://localhost:5173
npm run build   # dist/ — static, works offline
```

Keyboard: ←/→ or Space navigate · Home/End jump · `F` fullscreen · `O` overview.

## Round N (defect fixes only)

| Defect | Fix | File:line |
|---|---|---|
| `QA-1` | | |
