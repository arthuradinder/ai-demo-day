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
