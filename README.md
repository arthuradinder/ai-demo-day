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

Stages 0–2 complete: **18 slides, 27.0 min of a 30-min slot**, awaiting QA sign-off.
See [docs/HANDOFF.md](docs/HANDOFF.md) for who owns the work right now, and the
[placeholder checklist](docs/HANDOFF.md#open-placeholders--must-resolve-before-ship) for
the 11 facts that still block shipping.

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

## Published deck

Every push to `main` builds and deploys to GitHub Pages via
[.github/workflows/deploy.yml](.github/workflows/deploy.yml):

**https://arthuradinder.github.io/ai-demo-day/**

> **One-time setup, required before anything publishes:**
> repo **Settings → Pages → Build and deployment → Source = GitHub Actions**, then re-run the
> latest workflow. Until that is set, the build and contrast checks pass and the job stops at
> `configure-pages`. The workflow token cannot switch Pages on by itself — that was tried.

The deploy is gated on `tsc --noEmit`, `vite build` and `npm run check:contrast`, so a type
error or a failing colour pair blocks publication rather than shipping a broken deck.

`dist/deck-standalone.html` is published alongside it — one self-contained file with the CSS,
JS, logos and QR codes inlined. Download it for a laptop with no network and no toolchain.

## Running the deck

```bash
npm install

npm run dev              # present at http://localhost:5173, then press F for fullscreen
npm run build            # typecheck + dist/ + dist/deck-standalone.html
npm run check:contrast   # WCAG ratios for all 14 colour pairs
npm run capture          # screenshot all 18 slides + measure (dev server must be running)
```

**Presenter keys:** `→ ↓ Space PgDn` next · `← ↑ PgUp` back · `Home`/`End` jump ·
`F` fullscreen · `O` overview grid · `N` speaker notes · `?` help · `Esc` close.
A presenter remote sends arrow keys or PageUp/PageDown; both work. Clicking the left or
right 12% of the screen also navigates.

**Venue fallback:** `dist/deck-standalone.html` is a single self-contained file — CSS and
JS inlined, no server, no node, no network. Copy it to a USB stick and double-click.

## Layout

```
.claude/skills/     three pipeline role skills
docs/
  HANDOFF.md        pipeline state board — read this first
  01..04-*.md       stage artifacts
  templates/        artifact templates each stage fills in
scripts/
  check-contrast.mjs  WCAG verification for every colour pair
  capture-slides.mjs  render + measure all 18 slides in headless Chromium
  inline-dist.mjs     folds dist/ into one standalone HTML file
src/
  App.tsx           deck shell: nav, progress, overview, notes
  slides/index.ts   THE single source of slide order
  slides/*.tsx      one component per spec id
  components/       SlideFrame, Stage, StatRow, Timeline, LogoGrid, NameGrid, Tbc
  content/deck.ts   ALL copy and data — the only file to edit for content
  styles/theme.css  design tokens
```

## Editing content

Everything the audience reads lives in [src/content/deck.ts](src/content/deck.ts). Nothing
is hardcoded in a component. Unconfirmed facts are `tbc(...)` and render as a visibly
provisional amber marker; swap to `confirmed(...)` as each is verified:

```ts
members: tbc<number>('total community members'),   // renders a dashed "TBC" well
members: confirmed(240),                            // renders the figure
```

Grep `tbc` in that file to find everything still outstanding.

## Outstanding before the event

- [ ] Sponsor names, tiers, and logo assets — **blocks ship**
- [ ] Community member and Cohort 2 numbers — **blocks ship**
- [ ] Confirm speaker-driven vs self-running
