# Project Brief — Demo Day Deck

**Revision:** 1 · **Date:** 2026-08-03 · **Author:** project-planner
**Status:** COMPLETE — handed to `frontend-designer`

## Event facts

| Field | Value | Status |
|---|---|---|
| Host community | Nairobi AI Community | CONFIRMED |
| Partner | The AI Collective — Nairobi Chapter | CONFIRMED |
| Programme | AI Automations Training, Cohort 2 | CONFIRMED |
| City | Nairobi, Kenya | CONFIRMED |
| Date | Saturday, 8 August 2026 | CONFIRMED |
| Event window | 10:00 – 14:00 EAT | CONFIRMED |
| Deck slot | 30 minutes, **closing the event** (~13:30 – 14:00) | CONFIRMED |
| Delivery | Speaker-driven, with speaker notes | CONFIRMED |
| Graduate demos | Yes — graduates demo live **earlier** in the event | CONFIRMED |
| Venue name / address | … | PLACEHOLDER |
| Sponsors (names, tiers, logos) | … | PLACEHOLDER |
| Community & Cohort 2 numbers | … | PLACEHOLDER |
| Community founding date & milestones | … | PLACEHOLDER |

## Narrative spine

> **You have just watched Cohort 2 build things that did not exist this morning — here is the
> community that made that possible, the people who paid for it and taught it, and how you
> join what happens next.**

Every slide serves that sentence or gets cut.

## This is a closing deck, and that changes everything

The deck runs **last**, after the graduate demos. Two consequences the designer and QA
must hold on to:

1. **Do not explain the projects.** The room watched them work an hour ago. Referencing
   them beats describing them. A closing deck that re-explains the demos insults the
   audience's attention and burns the minutes needed for the call to action.
2. **The close is the payload.** An opening deck can afford a soft ending; this one cannot.
   Everything before slide 15 exists to earn the right to ask for something on slides
   15–17. If the deck overruns, we lose the ask — which is the entire commercial and
   community point of the event.

The emotional arc: *pride in what was seen → context for how it was possible → gratitude
to those who enabled it → invitation to be part of the next one.*

## Audience segments

| Segment | Why they're in the room | The one thing they must leave with |
|---|---|---|
| **Cohort 2 graduates** | They built the work and just demoed it. This is their graduation. | "I am recognised, I am now part of this community permanently, and there is a next step for me." |
| **Prospective members** | Came to see whether this community is real and worth their Saturdays. | "Cohort 3 is how I get there, and I know exactly how to apply." |
| **Sponsors & partners** | Funded or hosted this; want to see their money produce something visible. | "My logo sat next to real outcomes, I was thanked publicly by name, and I know what supporting Cohort 3 buys." |
| **Mentors & facilitators** | Taught the cohort, largely unpaid. | "My work was named in front of the room, not buried in a credits slide." |
| **The AI Collective — Nairobi Chapter** | Partner organisation, co-owns the event's credibility. | "This partnership is presented as a partnership of equals, not a sponsorship line item." |

## Non-goals

- **Not a syllabus.** No curriculum breakdown, no week-by-week module list. Prospective
  members need the outcome and the entry point, not the lesson plan.
- **Not a pitch deck.** No TAM, no fundraise ask, no valuation. Sponsors are thanked and
  invited, not pitched at.
- **Not a project explainer.** The demos already did that job. See above.
- **Not a technology tutorial.** No architecture diagrams, no tool comparisons.
- **Not a farewell.** Cohort 2 graduates stay in the community; the language must be
  "you're now part of this", never "goodbye and good luck".

## Constraints

- Event window 4 hours; **this deck has a 30-minute slot**. Slide minutes sum to **27.0**,
  leaving **3.0 minutes of slack** for overrun and applause.
- **18 slides**, speaker-driven, with speaker notes on every content slide.
- Projector 1920×1080, 16:9, lit room, back row must read every word.
- Offline capable — assume no venue wifi.
- Final slide is a **holding slide** that stays on screen while the room mingles, so it
  must be legible and self-explanatory with no speaker present.
- Runs at ~13:30, the tail of a 4-hour event. Audience energy is low and attention is
  short: one idea per slide, no dense paragraphs, no slide requiring 3 minutes of talking.

## Structural decisions and what was cut

Recorded per the skill's requirement to justify departures from the minimum section list.

| Decision | Reasoning |
|---|---|
| **No agenda / run-of-show slide.** Replaced by `what-you-just-saw` (slide 2). | An agenda for an event that has already finished is dead weight. The retrospective serves the same orienting purpose, inverted, and opens on a moment of pride. |
| **No standalone `impact-numbers` slide.** Folded into `community-today` (community-wide) and `cohort2-by-numbers` (cohort-specific). | Three separate statistics slides in 27 minutes reads as padding, and with every figure currently a `PLACEHOLDER` a third stat slide multiplies the pre-event fill-in burden for no narrative gain. |
| **Project showcase compressed to one recap slide** (`cohort2-showcase-recap`, 1.5 min). | Graduates demo live earlier. Detailed project slides would be redundant. |
| **Two sponsor slides, not one** — `sponsors-partners` (thanks) and `sponsor-impact-cta` (the ask). | Thanking and asking are different jobs. Merging them makes the gratitude read as transactional, and the ask is the one thing that must land while sponsors are still in the room. |
| **Partner gets its own slide** (`partnership-aic`), separate from sponsors. | The AI Collective is a partner, not a sponsor. Listing it in a sponsor logo grid would misrepresent the relationship to everyone in the room who knows the difference. |
| **Graduate quote slide retained** (`graduate-voice`, 1 min) despite tight budget. | The only slide where the audience hears the outcome in a participant's own voice. It is the highest-conversion slide for prospective members and cheap at 60 seconds. |

## Placeholder policy

Every figure, sponsor name, date, and project title in the spec is tagged `CONFIRMED` or
`PLACEHOLDER`. Placeholders use the form `{{PLACEHOLDER: description}}` so they are
grep-able in one pass before the event.

**This deck is presented to sponsors sitting in the room.** A guessed attendance figure or
an unconfirmed sponsor name projected as fact is the worst available outcome — worse than a
visible "TBC". The designer must render placeholders as *visibly provisional*, and QA
blocks on any placeholder that reads as confirmed.

## Open questions

| # | Question | Owner | Blocks shipping? |
|---|---|---|---|
| 1 | Sponsor names, tiers, and logo asset files | user | **yes** |
| 2 | Community founding date and 4–6 dated milestones for the timeline | user | **yes** |
| 3 | Cohort 2 numbers: applicants, enrolled, graduated, projects shipped | user | **yes** |
| 4 | Community-wide numbers: total members, events held, cohorts run | user | **yes** |
| 5 | Cohort 2 graduate names for the recognition slide | user | **yes** |
| 6 | Mentor and facilitator names | user | **yes** |
| 7 | A usable quote from a Cohort 2 graduate, with attribution consent | user | **yes** |
| 8 | Cohort 3 dates and application URL | user | **yes** |
| 9 | Community links: WhatsApp/Discord, socials, website, for the holding slide | user | **yes** |
| 10 | Sponsor prospectus URL or contact for the sponsor CTA | user | no — falls back to a named contact person |
| 11 | Who delivers the deck, and are they also the one thanking mentors? | user | no — affects notes tone only |
| 12 | Venue name for the thank-you slide, if the venue was donated | user | no — drop the line if not applicable |

Questions 1–9 block shipping. All are **fill-in-the-blank**, not structural: the deck can
be built, reviewed, and QA'd in full while they are outstanding, and each resolves to a
single edit in `src/content/deck.ts`. Nothing in Stage 2 is blocked by them.

## Handoff to `frontend-designer`

Read [`docs/02-slide-spec.md`](02-slide-spec.md) rev 1. It contains literal copy and 2–4
acceptance criteria per slide. Build against it exactly; route anything ambiguous back
here rather than inventing copy.
