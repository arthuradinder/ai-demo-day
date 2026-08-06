# Implementation Report — Demo Day Deck

**Round:** 2 · **Date:** 2026-08-04 · **Author:** frontend-designer
**Spec:** `docs/02-slide-spec.md` rev 2 · **Brief:** `docs/01-project-brief.md` rev 1
**Status:** COMPLETE — handed to `qa-project-manager`

> Round 1 (2026-08-03) built all 18 slides against spec rev 1. Round 2 (2026-08-04)
> implements spec rev 2: partner logos on slide 12 and the Nairobi Business Angel Network
> partner band on slide 13. See **Round 2** at the end of this document.

## Build health

| Check | Result | Evidence |
|---|---|---|
| `npx tsc --noEmit` (strict + `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`) | ✅ clean | no output |
| `npm run build` | ✅ clean | `dist/` 19.3 kB CSS + 228.8 kB JS |
| All 18 slides render | ✅ 18/18 | `npm run capture` table |
| Console errors on a full 18-slide pass | ✅ none | "Console: clean across a full pass" |
| Content overflowing the 1080px stage | ✅ none | overflow column all `—` |
| Smallest rendered text ≥ 24px floor | ✅ min 24px | per-slide measured |
| Contrast ≥ 4.5:1 | ✅ 14/14 pairs, worst 5.09:1 | `npm run check:contrast` |
| Runs with no network | ✅ | verified over `file://`, no server |

Two verification tools were written because the design bar asks for things a build cannot
prove. Both are repo scripts so QA can re-run them rather than take this report's word:

- **`npm run check:contrast`** — computes WCAG 2.1 ratios for all 14 foreground/background
  pairs the deck uses. Exits non-zero on any failure.
- **`npm run capture`** — walks all 18 slides in headless Chromium at 1920×1080,
  screenshots each, and reports per slide: did it render, smallest rendered font size,
  stage overflow, console errors. Exits non-zero on any violation.

This added `playwright` as a devDependency (~192 MB browser download, one-off). It does not
enter the deck bundle. A visual deliverable cannot be verified by typechecking, and Stage 3
needs the same capability to check legibility.

## Spec coverage

All 18 spec `id`s implemented, in spec order. Order lives only in `src/slides/index.ts`.

| # | Spec `id` | Component | Min |
|---|---|---|---|
| 1 | `title-close` | `src/slides/TitleClose.tsx` | 0.5 |
| 2 | `what-you-just-saw` | `src/slides/WhatYouJustSaw.tsx` | 1.5 |
| 3 | `why-today` | `src/slides/WhyToday.tsx` | 2.0 |
| 4 | `origin-story` | `src/slides/OriginStory.tsx` | 1.5 |
| 5 | `journey-timeline` | `src/slides/JourneyTimeline.tsx` | 2.5 |
| 6 | `community-today` | `src/slides/CommunityToday.tsx` | 1.5 |
| 7 | `cohort2-programme` | `src/slides/Cohort2Programme.tsx` | 1.5 |
| 8 | `cohort2-by-numbers` | `src/slides/Cohort2ByNumbers.tsx` | 1.5 |
| 9 | `cohort2-showcase-recap` | `src/slides/Cohort2ShowcaseRecap.tsx` | 1.5 |
| 10 | `graduate-voice` | `src/slides/GraduateVoice.tsx` | 1.0 |
| 11 | `mentors-facilitators` | `src/slides/MentorsFacilitators.tsx` | 1.5 |
| 12 | `partnership-aic` | `src/slides/PartnershipAic.tsx` | 1.5 |
| 13 | `sponsors-partners` | `src/slides/SponsorsPartners.tsx` | 2.0 |
| 14 | `sponsor-impact-cta` | `src/slides/SponsorImpactCta.tsx` | 1.5 |
| 15 | `whats-next` | `src/slides/WhatsNext.tsx` | 2.0 |
| 16 | `get-involved` | `src/slides/GetInvolved.tsx` | 2.0 |
| 17 | `thank-you` | `src/slides/ThankYou.tsx` | 1.0 |
| 18 | `close-holding` | `src/slides/CloseHolding.tsx` | 0.5 |
| | | **Total** | **27.0** |

No extra slides. Runtime chrome reports `27.0 min budget`, matching the spec.

### Cross-slide requirements

| Req | How it is satisfied |
|---|---|
| Shared values sourced once | `programme.weeks` (slides 2, 7, 9), `community.foundingYear` (4, 6), `cohort2.graduated`/`shipped` (8, 9, 14), `community.peopleTrained` (6, 14), `links.*` (16, 18) each exist once in `deck.ts` and are imported by reference. |
| Derived figures computed | `completionRate()` derives from `cohort2.enrolled`/`graduated`; returns a placeholder unless both are confirmed, and guards divide-by-zero. |
| No fabricated facts | Zero invented sponsor names, member counts, graduate names, or project titles — including as sample data. |
| Placeholders visibly provisional | Every unconfirmed value renders through `Tbc`/`FactValue`/`FactFigure`: amber ground, dashed edge, explicit "TBC"/"TO BE CONFIRMED" marker. |
| Speaker notes for every slide | 18/18 in `deck.speakerNotes`, verbatim from the spec. `N` or `S` toggles the panel; shows the note, the minute budget, and the next slide. |
| Equal-weight constraints | Slides 1 and 12 render host and partner at identical size; 3, 9, 11, 16 use uniform treatment per entry with no per-item emphasis. |

## Placeholders rendered

**40 distinct placeholders.** All render as visibly provisional and all live in
`src/content/deck.ts` — nothing is hardcoded in a component.

| Slides | Placeholder group | Treatment |
|---|---|---|
| 2, 7, 9 | Programme length in weeks | Inline TBC chip |
| 2 | Graduates who demoed | Inline TBC chip |
| 4, 5, 6 | Founding month/year, founder framing | Inline TBC chip |
| 5 | 6 milestone dates + 2 milestone labels | Inline TBC chip per entry |
| 6 | Members, events, cohorts, trained | Dashed figure well at real figure footprint |
| 8 | Applied, enrolled, graduated, shipped, completion rate | Dashed figure well |
| 9 | Project titles + builder names | 9 reserved slots, "Project TBC / builder name TBC" |
| 10 | Quote, graduate name, role | Block TBC; **slide is cut if consent is withheld** |
| 11 | Mentor and facilitator names | 8 reserved slots, "Name TBC" |
| 12 | Partnership contribution sentence | Block TBC |
| 13 | Sponsor names, tiers, logos | 6 reserved slots, "Sponsor TBC / slot N" |
| 13 | "Free for every participant" claim | Block TBC, on its own line above the sentence |
| 14 | Sponsorship total, contact | Inline TBC + block TBC |
| 15 | Cohort 3 dates, meetup cadence, optional initiative | Inline TBC chips |
| 16, 18 | 4 links + social handles | Inline TBC chips |
| 17 | Venue host (conditional) | Inline TBC; removable via `null` |

Grep `tbc` in `src/content/deck.ts` to list them all. **Nothing in this deck can be
presented as a confirmed fact while it is still a placeholder** — that is enforced by the
type system: `Fact<T>` has no way to render a value without a `status`.

## Deviations from spec

Three. All are layout decisions inside the spec's stated intent; none changes copy.

| Spec `id` | Spec says | Built | Why |
|---|---|---|---|
| `journey-timeline` | "timeline with clear directional progression"; "every milestone legible from the back row"; overflow is a SPEC-DEFECT not a font-size problem | **Vertical** timeline, top→bottom, today as terminus | A horizontal 7-column timeline gives each milestone ~237px of the 1664px content width. Labels like "Partnership with The AI Collective — Nairobi Chapter" then wrap to 6–7 lines of small text. I built it horizontally first, screenshotted it, and it failed the legibility bar. Vertical gives each label ~1200px on one line and still reads as chronological progression. The spec's binding constraint was legibility; the axis was not specified. |
| `title-close` | eyebrow "Nairobi AI Community × The AI Collective — Nairobi Chapter" | Partner qualifier on its own line beneath the partner name | The full string at equal weight to the host overflows and breaks mid-phrase ("…— Nairobi / Chapter"), which reads as careless about the partner's name. Split keeps both org names on one line at identical size — preserving what the equal-weight constraint protects — and matches slide 12. |
| `sponsors-partners` | Intro: "Cohort 2 was free for every participant. That was only possible because these organisations paid for it." | Unverified claim stacked above the sentence rather than inline | Rendered inline, the block placeholder forced the following sentence to wrap around it and become unreadable. Stacking also puts the thing needing verification first. Copy unchanged. |

## Design decisions worth QA's attention

- **Light palette, not dark.** The deck runs ~13:30 in a lit room. Ambient light lifts the
  blacks of a dark theme and collapses its contrast; a warm paper ground stays readable.
- **Fixed 1920×1080 stage, uniformly scaled** (`src/components/Stage.tsx`). Slides are laid
  out in absolute projector pixels and the whole stage is scaled to fit the viewport, so a
  laptop shows exactly what the projector will, just smaller — no reflow between review
  and the room.
- **`accent-deep` token added.** `accent` on `accent-soft` measured 4.51:1 — passing with
  no margin, and it carried the sponsor contact detail on slide 14, the one string that
  most has to survive a bad projector. The deeper tone measures 6.48:1.
- **Nothing depends on hover.** Click zones are 12vw edge strips, leaving the centre free.
- **Motion**: a single 180ms fade/6px lift on slide change, nothing looping (the holding
  slide is on screen for a long time), and disabled under `prefers-reduced-motion`.

## Known gaps

1. **Sparse slides while placeholders stand.** Slides 6, 8, and 10 have visible empty space
   because a TBC chip is far smaller than the 108px figure or 60px quote that will replace
   it. Layout is correct; density arrives with content. Worth re-screenshotting after the
   real numbers land.
2. **Mentor and project counts are assumed.** 8 mentor slots and 9 project slots reserve
   plausible density. If the real lists are materially longer, slides 9 and 11 may need
   splitting — the spec says to split rather than shrink, so this surfaces as a defect
   rather than silently shrinking names.
3. **No QR codes yet.** Spec permits them on slide 18 alongside written URLs. Not added
   because no URLs exist. Needs a follow-up once links are confirmed.
4. **`prefers-reduced-motion` not verified under an emulated setting** — the CSS rule is
   present and correct, but I did not drive Chromium with the flag set.
5. **Projector-tested only in software.** 1920×1080 verified in headless Chromium; nobody
   has put this through a real projector in a real room.

## How to run

```bash
npm install

npm run dev              # present at http://localhost:5173
npm run build            # typecheck + dist/ + dist/deck-standalone.html
npm run check:contrast   # WCAG ratios for all 14 pairs
npm run capture          # screenshot all 18 slides + measure (needs dev server running)
```

**Presenting.** `npm run dev`, then `F` for fullscreen. Keys:

| Key | Action |
|---|---|
| `→` `↓` `Space` `PgDn` | Next |
| `←` `↑` `PgUp` | Previous |
| `Home` / `End` | First / last |
| `F` | Fullscreen |
| `O` | Overview grid, click to jump |
| `N` or `S` | Speaker notes + next-slide preview |
| `?` or `H` | Key help |
| `Esc` | Close overlay |

A presenter remote sends arrow keys or PageUp/PageDown — both are handled. Clicking the
left or right 12% of the screen also navigates.

**Venue fallback — `dist/deck-standalone.html`.** One 243 kB HTML file with CSS and JS
inlined. No server, no node, no network: copy it to a USB stick and double-click. Verified
rendering all 18 slides over `file://`. This exists because a normal Vite build *cannot*
be opened this way — `<script type="module">` is CORS-blocked on the file protocol, so
`vite.config.ts` emits a classic IIFE bundle that `scripts/inline-dist.mjs` can inline.
`npm run build` produces it automatically.

## Round 2 — spec rev 2 (partner logos + NBAN)

Only slides 12 and 13 were touched, per the spec rev 2 note.

| Change | Where |
|---|---|
| Both main partner logos render at identical treatment | `src/components/Logo.tsx` (new), `src/slides/PartnershipAic.tsx` |
| Logo asset paths, single-sourced | `src/content/deck.ts` → `logos` |
| Nairobi Business Angel Network in its own partner band | `src/slides/SponsorsPartners.tsx`, `deck.ts` → `sponsors.partners` |
| Headline → "Made possible by our sponsors and partners" | `deck.ts` → `sponsors.headline` |
| Logos inlined as data URIs in the standalone build | `scripts/inline-dist.mjs` |
| `headlineSize` prop for content-dense slides | `src/components/SlideFrame.tsx` |

### Logo assets are not in the repo yet

The two supplied logos could not be written to disk from the conversation, so
`public/logos/` contains only a README with the **exact required filenames**. Everything is
wired: drop the files in and they appear, no code change. Until then the deck renders each
organisation's name at full weight — the fallback in `Logo.tsx` — which is presentable, and
never a broken-image icon. `npm run build` reports how many logos it inlined and how many
references are still unresolved.

**Verified both paths.** I generated throwaway solid-colour PNGs at the two real aspect
ratios (one square, one wide wordmark), confirmed the logos-present layout keeps both marks
in identical boxes capped on both axes, confirmed the standalone build inlines them as data
URIs and renders clean over `file://`, then deleted the test art. No placeholder image
ships.

### Five defects found and fixed during Round 2

Each was caught by looking at rendered output, not by the build:

1. **Slide 13 overflowed the stage by 109px** once the partner band was added — caught by
   the overflow check in `npm run capture`. Compacted the sponsor grid (slot height
   168→124px, gaps 32→24px) and dropped the headline to `h2`, which also stopped it wrapping
   to two lines.
2. **Logo fallback rendered the organisation name twice** — once inside a fallback card and
   once as the caption beneath it, which read as a bug. The card is now omitted entirely
   when the asset is absent.
3. **`×` separator sat below the partner names** in the fallback state, because it used a
   hardcoded offset that assumed a logo card was present. Now `items-center`.
4. **Absolute logo paths (`/logos/…`) would have failed over `file://`**, resolving against
   the filesystem root — so the standalone build could never have found its logos even once
   the real files existed. Now relative, and inlined as data URIs.
5. **`Thank you.` sat flush against the partner band** with no separation once space got
   tight. Added an explicit minimum gap.

### Deviation added in Round 2

| Slide | Spec rev 2 says | Built | Why |
|---|---|---|---|
| `partnership-aic` | Body clause ends with an em-dash: "…Nairobi Chapter — {contribution}" | Ends with a colon; contribution on its own line | The contribution placeholder is a block element on its own line, so a trailing em-dash dangles at the end of the previous line. Wording is otherwise identical. |

### Note on `sponsors-partners` headline sizing

Set to `h2` rather than `h1`. At `h1` the longer rev 2 headline wraps to two lines and costs
~120px the slide no longer has. It remains the largest text on the slide.

## Round 3 — poster-derived visual redesign (2026-08-05)

The user supplied the promo poster (`public/logos/demo-day-poster.png`) and asked for the
deck's colour and theme to match it. **Structure, slide order, `id`s and narrative copy are
unchanged** — this round is the visual system only, plus the poster's own taglines.

### Palette — light theme replaced with the poster's dark one

| Token | Value | Role |
|---|---|---|
| `canvas` | `#070B14` | slide ground |
| `canvas-alt` | `#0C1422` | secondary ground |
| `panel` | `#111C2E` | cards and accent slides |
| `edge` | `#223148` | rules and borders |
| `fg` / `fg-soft` | `#FFFFFF` / `#9DAAC0` | type |
| `blue` / `blue-bright` | `#2E93F7` / `#5BAEFF` | first accent |
| `flame` / `flame-bright` | `#F0512B` / `#FF7A4D` | second accent |
| `tbc` / `tbc-bg` | `#F7C860` / `#241A08` | placeholder marker, re-tuned for dark |

**All 16 contrast pairs pass, worst 4.81:1** (`scripts/check-contrast.mjs` updated to the new
palette). This *increases* headroom over the light theme: body text went from 17.33:1 to
**19.68:1**.

On the earlier light-theme reasoning — the room is lit and ambient light lifts a dark
theme's blacks — that trade-off is real and unchanged. But white on this ground has roughly
double the headroom the old dark-on-light body text had, so what degrades under a washed-out
projector is the crispness of the background, not the legibility of the text.

### Motifs taken from the poster

- **Blue→orange gradient rule** (`.rule-gradient`) as the headline underline on every framed
  slide, and as the kicker bar — the poster's signature divider.
- **Gradient "AI" lockup** above a heavy white "DEMO DAY" on the title slide.
- **Poster taglines, verbatim**: "SHOWCASE. CONNECT. BUILD THE FUTURE." and
  "INNOVATE LOCALLY. IMPACT GLOBALLY."
- **Faint two-point radial glow** (`.canvas-glow`) echoing the poster's lighting, kept weak
  enough to read as nothing rather than as a smudge on a poor projector.
- **Logos now sit directly on the dark ground.** The white plates existed only because the
  old theme was light; the poster sets both marks on dark and they hold up there.
- **Compact horizontal logo lockup** for the title and holding slides, mirroring the
  poster's header bar; the vertical standoff is retained for slide 12.

### Confirmed facts adopted from the poster

Venue (**ALX, The Piano — 171 Brookside Dr, Nairobi**) and start time (**10:00 AM**) were
placeholders and are now confirmed, taken verbatim from the poster. The venue appears on the
title slide.

### Defects found and fixed this round

1. **Gradient "AI" rendered as flat blue.** As a block element the gradient spanned the full
   1664px content width while "AI" occupied the first ~8%, so the glyphs sampled pure blue
   and the transition never appeared. Fixed with `inline-block` so the gradient box matches
   the text.
2. **`tone="paper"` / `ring-accent` survived the token sweep** — caught by `tsc` and a
   follow-up grep respectively.

### Not done this round

The narrative rework the new run of show demands. See `docs/01-project-brief.md` rev 2 —
the deck's slot is the **12:30 opening welcome (~15 min)**, not a 13:30 closing (30 min), so
the retrospective spine and two slides are now factually wrong. Explicitly deferred to the
content pass at the user's direction.

## Round 4 — spec rev 3 content rework (2026-08-06)

The deck is now **14 slides, 15.0 min**, built for the 12:30 opening welcome. Slide count,
order, several `id`s and almost all copy changed. **Zero placeholders remain in
`src/content/deck.ts`** — down from 40.

### Slide-by-slide

| # | `id` | What changed |
|---|---|---|
| 1 | `title-close` | venue now shown (ALX, The Piano) |
| 2 | `what-you-just-saw` | recast to "Since you walked in the room…"; graduate framing and programme length removed; kicker dropped |
| 3 | `why-today` | unchanged |
| 4 | `origin-story` | real copy — 5 years of community, Dec 2025 leadership meeting; **retitled** "Why we built this training" |
| 5 | `journey-timeline` | 7 real milestones, mid-2019 → 8 Aug 2026 |
| 6 | `community-today` | 2,400+ / 20+ / 2 / 100+, zero in 2019 |
| 7 | `cohort2-programme` | 15 weeks; 4 real steps |
| 8 | `virtual-address` | **new** — replaces retired `cohort2-by-numbers` |
| 9 | `capstone-lineup` | **new** — replaces retired `cohort2-showcase-recap`; 3 groups × 5 min |
| 10 | `mentors-facilitators` | 5 real names + roles; retitled "The people who made it happen" |
| 11 | `sponsors-partners` | `partnership-aic` merged in; main partners + 3 sponsors + 2 pending slots |
| 12 | `whats-next` | live application QR; optional-initiative rows removed |
| 13 | `get-involved` | 2 routes with QR codes |
| 14 | `thank-you` | venue host confirmed; new closing line |

Removed: `graduate-voice`, `sponsor-impact-cta`, `close-holding`. Six `id`s retired and
never reusable.

### QR codes — generated at build time, not at runtime

`scripts/gen-qr.mjs` renders both codes to **SVG** in `public/qr/`, run automatically by
`npm run build`. Three deliberate choices:

- **SVG, not PNG** — a raster code scaled onto a 1920×1080 stage softens at the edges, and
  soft edges are exactly what stops a projected code scanning from the back of a room.
- **Error correction level H** (~30% damage tolerance) — a projected code gets photographed
  at an angle, partly glared out, and sometimes with a head in the way.
- **URLs parsed from `deck.ts`**, so there is still one source of truth; the script fails
  loudly if a URL stops being a `confirmed(...)` value rather than silently emitting a stale code.

`Qr` takes a `Fact<string>` rather than a bare string: if a URL ever reverts to a placeholder
the code is **withheld** and the placeholder marker shows instead. A wrong or unscannable QR
is worse than no QR.

Every code renders beside its written-out URL. A projected code is unusable from the back of
a lit room and unusable at an angle, so the text is not decoration.

### Defects found and fixed this round

1. **The standalone build did not actually contain the QR codes.** `inline-dist.mjs` only
   inlined `dist/logos`, so `./qr/*.svg` stayed as external references. They resolved in
   testing purely because the HTML sat inside `dist/` next to `dist/qr/` — copy that one file
   to a USB stick and the codes vanish, silently, leaving slides that say "scan the code" with
   no code. The inliner now covers every asset directory, and I verified it by copying the
   HTML **alone into an empty directory** and rendering all 14 slides from it.
2. **Sponsor names overflowed their cells.** "Nairobi Business Angel Network" at `h2` broke
   out of the card. Dropped to `lead` and raised card height to 152px.
3. **Overview chrome still said "of 30 min".** Now reads the real 15-minute slot and reports
   how much of the budget is the virtual address.
4. Stale `tone="paper"` default and `ring-accent` class survived the earlier token sweep.

### Two conflicts NOT resolved — they need a human

1. **3 groups or 6 teams?** Brief rev 2's run of show says six teams across 12:45–13:45; the
   rev 3 direction says three groups at five minutes each, which is 15 minutes of a 60-minute
   window. Built with **3**, read from one content value in `deck.ts`.
2. **"5 years" vs mid-2019.** Slide 4 says the community ran for 5 years before the December
   2025 meeting; slide 5 dates the start to mid-2019, which is ~6.5 years. The user's wording
   is used as given, but the timeline is on screen two slides later.

### Also worth a decision

Removing `close-holding` means the deck ends on `thank-you` at ~12:45 while the event runs to
14:00, so nothing is left on screen. `get-involved` carries the application QR and would be
the natural slide to leave up.

## Handoff to `qa-project-manager`

Spec rev 2, 18 slides, 27.0 min. Suggested starting points:

- The three deviations above — each is a judgment call you should either accept or route back.
- **Slide 13 is the highest-stakes slide.** Confirm no invented sponsor name exists anywhere
  including `src/content/deck.ts`, and confirm nothing states or implies that the Nairobi
  Business Angel Network paid for the cohort — its actual contribution is unknown, and the
  room includes people who would know (spec rev 2 acceptance #5).
- Slide 12 vs 13: confirm the partnership cannot be mistaken for a sponsorship tier.
- **Logo assets are absent from the repo.** Verify the name-fallback is presentable, and
  treat the missing files as a pre-event checklist item rather than a build defect.
- Slide 11 and 18 legibility, which carry the spec's unusual size requirements.
- Re-run both verification scripts rather than trusting this report's numbers.
