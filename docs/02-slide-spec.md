# Slide Spec — Demo Day Deck

**Revision:** 2 · **Date:** 2026-08-04 · **Author:** project-planner
**Brief:** `docs/01-project-brief.md` rev 1 · **Total slides:** 18 · **Runtime:** 27.0 min of a 30-min slot (3.0 min slack)
**Delivery:** Speaker-driven, closing the event ~13:30 – 14:00 EAT

## Revision history

| Rev | Date | Change |
|---|---|---|
| 1 | 2026-08-03 | Initial spec, 18 slides. |
| 2 | 2026-08-04 | User supplied partner identities and logo assets. **Slide 12**: both main partner logos now required, at identical treatment. **Slide 13**: Nairobi Business Angel Network added as a third partner — rendered in its own labelled Partners band, deliberately NOT inside the sponsor grid, with the "paid for it" claim scoped to sponsors only. Headline updated to "sponsors and partners". Slide count, order, `id`s and runtime unchanged. Only slides 12 and 13 changed; the designer re-touches only those.

This document is the contract. The designer implements exactly this; QA verifies against
exactly this. Slide `id`s are stable forever — never renumber, never reuse.

**Placeholder convention:** unconfirmed facts appear as `{{PLACEHOLDER: description}}`.
These must render as *visibly provisional* — never styled to look like confirmed data.

## Order

| # | `id` | Title | Est. min |
|---|------|-------|----------|
| 1 | `title-close` | Demo Day · Cohort 2 | 0.5 |
| 2 | `what-you-just-saw` | What you just watched | 1.5 |
| 3 | `why-today` | Why we're all in this room | 2.0 |
| 4 | `origin-story` | It started with a group chat | 1.5 |
| 5 | `journey-timeline` | How we got here | 2.5 |
| 6 | `community-today` | The community today | 1.5 |
| 7 | `cohort2-programme` | What Cohort 2 actually did | 1.5 |
| 8 | `cohort2-by-numbers` | Cohort 2 by the numbers | 1.5 |
| 9 | `cohort2-showcase-recap` | Everything you saw today | 1.5 |
| 10 | `graduate-voice` | In their words | 1.0 |
| 11 | `mentors-facilitators` | The people who taught this | 1.5 |
| 12 | `partnership-aic` | In partnership with The AI Collective | 1.5 |
| 13 | `sponsors-partners` | Made possible by our sponsors | 2.0 |
| 14 | `sponsor-impact-cta` | What your support built | 1.5 |
| 15 | `whats-next` | What happens next | 2.0 |
| 16 | `get-involved` | How to be part of it | 2.0 |
| 17 | `thank-you` | Thank you | 1.0 |
| 18 | `close-holding` | Stay in touch | 0.5 |
| | | **Total** | **27.0** |

---

## Slide 1 — `title-close`

- **Title:** Demo Day
- **Purpose:** Orient the room as the closing segment begins. Establishes host and partner as co-equals before any content.

**Content**

> Eyebrow: Nairobi AI Community × The AI Collective — Nairobi Chapter
> Headline: Demo Day
> Subhead: AI Automations Training · Cohort 2
> Meta: Nairobi · Saturday, 8 August 2026

**Data**

| Value | Meaning | Status |
|---|---|---|
| Nairobi AI Community | Host | CONFIRMED |
| The AI Collective — Nairobi Chapter | Partner | CONFIRMED |
| AI Automations Training, Cohort 2 | Programme | CONFIRMED |
| Saturday, 8 August 2026 | Event date | CONFIRMED |

- **Visual intent:** Full-bleed title slide. Host and partner names at **equal visual weight** — this is a hard brand constraint, not a preference. Quiet and confident, not busy. No stock imagery of robots or glowing brains.
- **Notes:** "Before we let you go — give yourselves a round of applause. Thirty minutes, and then we eat." Hold this slide while the room settles.

**Acceptance**

1. Host and partner names render at visually equal weight — neither subordinated in size, colour, or position.
2. All four content lines are present: eyebrow, headline, subhead, meta.
3. Contains no placeholder content — every fact on this slide is CONFIRMED.

---

## Slide 2 — `what-you-just-saw`

- **Title:** What you just watched
- **Purpose:** Open on pride, for graduates. Converts the demos the room just saw into the deck's premise.

**Content**

> Headline: What you just watched
> Body: Ten minutes ago, {{PLACEHOLDER: N}} people showed you automations they built from nothing. Not prototypes someone else wrote. Not tutorials they followed. Their own work, solving problems they chose.
> Kicker: Twelve weeks ago, most of them had never shipped a single automation.

**Data**

| Value | Meaning | Status |
|---|---|---|
| `{{PLACEHOLDER: N}}` | Number of graduates who demoed | PLACEHOLDER |
| Twelve weeks | Programme duration | PLACEHOLDER — confirm actual length before ship |

- **Visual intent:** Text-forward, large type, one idea. No imagery competing with the sentence. The kicker line carries the emotional weight and should be visually distinct from the body.
- **Notes:** Slow down here. Let the "never shipped a single automation" line land before moving. This is the graduates' moment.

**Acceptance**

1. Both placeholders render as visibly provisional, not as confirmed figures.
2. The kicker line is visually distinguished from the body text.
3. Slide contains no list or bullets — it is a single continuous statement.

---

## Slide 3 — `why-today`

- **Title:** Why we're all in this room
- **Purpose:** Give every audience segment an explicit reason they are here. Directly serves the user's requirement that the deck address why people are in attendance.

**Content**

> Headline: Why we're all in this room
> Intro: Demo Day is not a graduation ceremony. It is the moment the work stops being private.
> Groups:
> - **Graduates** — you came to prove it works in front of people who would notice if it didn't.
> - **People thinking about joining** — you came to find out whether this is real before you spend your Saturdays on it.
> - **Sponsors and partners** — you came to see what your support turned into.
> - **Mentors and facilitators** — you came to watch people you taught outgrow the lesson.

**Data**

None. All copy, no figures.

- **Visual intent:** Four labelled groups, equal visual weight, readable as a set at a glance. Not a numbered list — these are parallel, not sequential. Resist icons; the labels do the work.
- **Notes:** Look at each group as you name them. Sponsors especially — this is the first of four times they are addressed directly, and it should feel deliberate.

**Acceptance**

1. All four audience groups appear, each with its label and its full sentence.
2. The four groups render at equal visual weight — no group emphasised over another.
3. The intro line appears above the groups and is visually distinct from them.

---

## Slide 4 — `origin-story`

- **Title:** It started with a group chat
- **Purpose:** Establish that the community is grassroots and recent, which makes the invitation on slide 16 credible — the room can picture themselves in the early version.

**Content**

> Headline: It started with a group chat
> Body: In {{PLACEHOLDER: founding month and year}}, {{PLACEHOLDER: founder count and framing, e.g. "a handful of us"}} started meeting to figure out what AI actually meant for the work we were already doing in Nairobi.
> Kicker: No funding, no venue, no curriculum. Just a recurring calendar invite that people kept showing up to.

**Data**

| Value | Meaning | Status |
|---|---|---|
| `{{PLACEHOLDER: founding month and year}}` | When the community began | PLACEHOLDER |
| `{{PLACEHOLDER: founder count and framing}}` | Who started it | PLACEHOLDER |

- **Visual intent:** Deliberately humble. Same text-forward treatment as slide 2 so the two read as a matched pair — the "now" and the "then". No logos, no stats.
- **Notes:** If the founding story has a specific detail worth telling — the first venue, the first turnout, a moment it nearly stopped — tell it here instead of reading the slide. The slide is a backdrop for 90 seconds of honest talking.

**Acceptance**

1. Both placeholders render as visibly provisional.
2. The kicker line is visually distinguished from the body, matching the treatment used on `what-you-just-saw`.
3. No statistics, logos, or imagery appear on this slide.

---

## Slide 5 — `journey-timeline`

- **Title:** How we got here
- **Purpose:** Show momentum, not just history. A visible upward trajectory is what makes prospective members believe Cohort 3 will happen and sponsors believe renewal is worth it.

**Content**

> Headline: How we got here
> Milestones, earliest to latest:
> - {{PLACEHOLDER: date}} — Community founded
> - {{PLACEHOLDER: date}} — {{PLACEHOLDER: first milestone, e.g. first public meetup}}
> - {{PLACEHOLDER: date}} — Partnership with The AI Collective, Nairobi Chapter
> - {{PLACEHOLDER: date}} — AI Automations Training, Cohort 1 launches
> - {{PLACEHOLDER: date}} — Cohort 1 Demo Day, {{PLACEHOLDER: N}} graduates
> - {{PLACEHOLDER: date}} — Cohort 2 launches
> - **8 August 2026 — today**

**Data**

| Value | Meaning | Status |
|---|---|---|
| All milestone dates | Community history | PLACEHOLDER |
| Cohort 1 graduate count | Prior cohort outcome | PLACEHOLDER |
| 8 August 2026 | Today, the final milestone | CONFIRMED |

Target **6–7 milestones**. Fewer than 5 reads as thin; more than 8 becomes unreadable from the back row. If the user supplies more, the planner selects — the designer does not.

- **Visual intent:** A timeline with clear directional progression. Today's entry is the visual terminus and must be emphasised as the present moment. Every entry must be legible from the back row, which caps the entry count — if the supplied milestones do not fit legibly, that is a `SPEC-DEFECT`, not a font-size problem.
- **Notes:** Do not read the timeline aloud. Pick the two milestones with a story and tell those; the slide carries the rest.

**Acceptance**

1. Milestones render in chronological order, earliest to latest.
2. The "today" entry is visually emphasised as the endpoint and shows 8 August 2026 as confirmed.
3. Every milestone date placeholder renders as visibly provisional.
4. All entries are legible at 1920×1080 from a back-row viewing distance — body text at or above the deck's minimum size, with no entry truncated or overflowing.

---

## Slide 6 — `community-today`

- **Title:** The community today
- **Purpose:** Establish scale for sponsors and prospective members. This is the community-wide impact slide (the standalone impact slide was folded in here — see brief).

**Content**

> Headline: The community today
> Stats:
> - {{PLACEHOLDER: N}} — members
> - {{PLACEHOLDER: N}} — events held
> - {{PLACEHOLDER: N}} — cohorts run
> - {{PLACEHOLDER: N}} — people trained to date
> Footer: Every one of those numbers was zero in {{PLACEHOLDER: founding year}}.

**Data**

| Value | Meaning | Status |
|---|---|---|
| All four figures | Community-wide scale | PLACEHOLDER |
| `{{PLACEHOLDER: founding year}}` | Must match slide 4 | PLACEHOLDER |

- **Visual intent:** A row of large figures with short labels, scannable in under three seconds. Figures dominate; labels support. The footer line reframes the numbers as trajectory rather than bragging, and should read as a quiet aside.
- **Notes:** "Every one of those was zero" is the line that matters, not the numbers themselves. Sponsors have seen big numbers before; they have not seen numbers they helped move.

**Acceptance**

1. All four statistics render with figure and label clearly paired.
2. Every figure renders as visibly provisional while it remains a placeholder.
3. The footer line appears below the statistics and is visually subordinate to them.
4. The founding year matches the value used on `origin-story` — sourced from one place in content, not typed twice.

---

## Slide 7 — `cohort2-programme`

- **Title:** What Cohort 2 actually did
- **Purpose:** Convert prospective members. The one slide that answers "what would I be signing up for?" — deliberately outcome-shaped, not curriculum-shaped.

**Content**

> Headline: What Cohort 2 actually did
> Intro: {{PLACEHOLDER: N}} weeks, in the evenings, alongside full-time jobs.
> Points:
> - Picked a real problem from their own work or community
> - Learned to build automations that solve it, with tools they can keep using
> - Shipped it, broke it, and fixed it in front of mentors
> - Demoed it today to a room of strangers
> Kicker: No prior experience required. That was the point.

**Data**

| Value | Meaning | Status |
|---|---|---|
| `{{PLACEHOLDER: N}}` weeks | Programme length — must match slide 2 | PLACEHOLDER |

- **Visual intent:** Four sequential steps — the progression from problem to demo should read as a journey, distinct from the parallel groups on `why-today`. The kicker is the conversion line and needs prominence.
- **Notes:** Aimed squarely at anyone in the room deciding about Cohort 3. Say "no prior experience" like you mean it, because several people are waiting for permission.

**Acceptance**

1. All four points render in sequence, and read as sequential rather than parallel.
2. The kicker line is visually prominent.
3. The programme length matches the value used on `what-you-just-saw` — sourced from one place in content.

---

## Slide 8 — `cohort2-by-numbers`

- **Title:** Cohort 2 by the numbers
- **Purpose:** Give sponsors a defensible outcome figure and graduates a sense of what they came through.

**Content**

> Headline: Cohort 2 by the numbers
> Stats:
> - {{PLACEHOLDER: N}} — applied
> - {{PLACEHOLDER: N}} — enrolled
> - {{PLACEHOLDER: N}} — graduated
> - {{PLACEHOLDER: N}} — automations shipped
> Footer: {{PLACEHOLDER: N}}% completion rate. For an unpaid evening programme, that is the number we are proudest of.

**Data**

| Value | Meaning | Status |
|---|---|---|
| All five figures | Cohort 2 outcomes | PLACEHOLDER |

Completion rate must be **derived** from enrolled and graduated, not entered separately — two independent fields will drift and QA will catch the inconsistency on stage.

- **Visual intent:** Same statistical treatment as `community-today` so the two read as a matched pair — one community-wide, one cohort-specific. Applied → enrolled → graduated should read as a narrowing funnel.
- **Notes:** If the completion rate is strong, dwell on it. If it is modest, say so plainly and say what you are changing for Cohort 3 — a room that just watched honest demos will forgive an honest number and will not forgive a spun one.

**Acceptance**

1. All four headline statistics render with figure and label clearly paired.
2. Completion rate is computed from the enrolled and graduated values, not stored as an independent figure.
3. Every figure renders as visibly provisional while it remains a placeholder.
4. The visual treatment matches `community-today`, so the two slides read as a pair.

---

## Slide 9 — `cohort2-showcase-recap`

- **Title:** Everything you saw today
- **Purpose:** Recognise every graduate project by name in one glance. Compressed deliberately — graduates already demoed live.

**Content**

> Headline: Everything you saw today
> Subhead: {{PLACEHOLDER: N}} automations, built by {{PLACEHOLDER: N}} people, in {{PLACEHOLDER: N}} weeks.
> Project list: {{PLACEHOLDER: project titles with builder names — one line each, all Cohort 2 projects}}

**Data**

| Value | Meaning | Status |
|---|---|---|
| Project titles and builder names | Full Cohort 2 output | PLACEHOLDER |
| All three figures in subhead | Must match slides 2 and 8 | PLACEHOLDER |

- **Visual intent:** A single glanceable grid or list of every project. **No project is visually larger or more prominent than another** — this is a hard constraint. Titles and builder names only; no descriptions, no screenshots. The room saw the demos; this is a roll of honour, not a catalogue.
- **Notes:** Do not walk through these. Say "all of it, on one slide" and give the room five seconds to find their own name.

**Acceptance**

1. Every Cohort 2 project renders with both its title and its builder name.
2. No project entry is visually emphasised over any other.
3. No project descriptions or screenshots appear — titles and names only.
4. The layout accommodates the full project count without truncation or scrolling, and remains legible at 1920×1080.

---

## Slide 10 — `graduate-voice`

- **Title:** In their words
- **Purpose:** The only slide where the outcome is stated by a participant rather than the host. Highest-conversion slide for prospective members.

**Content**

> Headline: In their words
> Quote: {{PLACEHOLDER: verbatim quote from a Cohort 2 graduate — 2 to 3 sentences, must have attribution consent}}
> Attribution: {{PLACEHOLDER: graduate name}}, {{PLACEHOLDER: role or project}}, Cohort 2

**Data**

| Value | Meaning | Status |
|---|---|---|
| Quote text | Graduate testimonial | PLACEHOLDER — **requires attribution consent** |
| Graduate name and role | Attribution | PLACEHOLDER — **requires attribution consent** |

Consent is a shipping requirement, not a nicety. If consent is not obtained, this slide is **cut** rather than anonymised — an anonymous testimonial persuades nobody and looks fabricated.

- **Visual intent:** Quotation slide. The quote is the entire slide; attribution is small and secondary. No portrait photograph unless the graduate has explicitly consented to their image being projected.
- **Notes:** Read the quote aloud, then stop. Do not explain it or add to it.

**Acceptance**

1. The quote is visually dominant and the attribution is clearly subordinate to it.
2. Quote and attribution both render as visibly provisional while placeholders remain.
3. No portrait image renders unless one is explicitly supplied in content.

---

## Slide 11 — `mentors-facilitators`

- **Title:** The people who taught this
- **Purpose:** Public, by-name recognition for mentors and facilitators who worked largely unpaid. This is the deck's obligation to them.

**Content**

> Headline: The people who taught this
> Intro: Cohort 2 was taught by people who did it on top of their own jobs, for free.
> Names: {{PLACEHOLDER: mentor and facilitator names, with role where useful}}
> Footer: If you learned something today, one of these people is why.

**Data**

| Value | Meaning | Status |
|---|---|---|
| Mentor and facilitator names | Recognition | PLACEHOLDER |

- **Visual intent:** Names presented at a readable size — this is a recognition slide, so the names must be genuinely readable from the back row, not shrunk to fit a decorative grid. All names at equal weight. If the list is long enough to force small type, that is a `SPEC-DEFECT` to resolve by splitting the slide, not by shrinking the names.
- **Notes:** Read every name out loud. Ask them to stand. This is the slide that costs the least and matters the most to the people on it.

**Acceptance**

1. Every supplied mentor and facilitator name renders, none truncated or omitted.
2. All names render at equal visual weight.
3. Names remain legible at 1920×1080 from a back-row viewing distance; the layout does not reduce name text below the deck's minimum body size to make the list fit.

---

## Slide 12 — `partnership-aic`

- **Title:** In partnership with The AI Collective
- **Purpose:** Present The AI Collective — Nairobi Chapter as a partner of equal standing, distinct from sponsorship. Serves the partner's requirement directly.

**Content**

> Headline: In partnership with The AI Collective
> Subhead: Nairobi Chapter
> Body: Cohort 2 ran as a partnership between the Nairobi AI Community and The AI Collective's Nairobi Chapter — {{PLACEHOLDER: one sentence on what the partnership concretely provided, e.g. venue, mentor network, curriculum support}}.
> Kicker: Two organisations, one cohort, no hierarchy.

**Data**

| Value | Meaning | Status |
|---|---|---|
| The AI Collective — Nairobi Chapter | Partner identity | CONFIRMED |
| Nairobi AI Community logo asset | Host mark | CONFIRMED (rev 2) — asset supplied by user |
| The AI Collective logo asset | Partner mark | CONFIRMED (rev 2) — asset supplied by user |
| Partnership contribution sentence | What they provided | PLACEHOLDER |

- **Visual intent:** Both organisation names at **equal visual weight** — hard constraint, mirroring `title-close`. **Both logos now render, at identical treatment: same box, same maximum height, same ground.** The two marks differ in shape (one square, one wide wordmark) and one has a non-transparent white background, so each sits in an identical neutral card rather than directly on the slide ground — otherwise the differing backgrounds alone would make one look privileged. This slide must be visually distinct from `sponsors-partners` so nobody in the room reads the partnership as a sponsorship tier.
- **Notes:** Name the specific thing the partnership made possible. Vague partnership language reads as a formality and the partner's people in the room will notice.

**Acceptance**

1. Both organisation names render at equal visual weight, and both logos render in identical boxes at identical maximum height.
2. This slide's layout is visibly distinct from `sponsors-partners` — a viewer cannot mistake the partnership for a sponsorship tier.
3. The partnership contribution sentence renders as visibly provisional while it remains a placeholder.
4. If a logo asset file is absent, the slide falls back to the organisation name at full weight — never a broken image icon.

---

## Slide 13 — `sponsors-partners`

- **Title:** Made possible by our sponsors and partners
- **Purpose:** Deliver the recognition sponsors came for — their primary reason for being in the room — and recognise partners who contributed without being sponsors.

**Content**

> Headline: Made possible by our sponsors and partners
> Intro: Cohort 2 was free for every participant. That was only possible because these organisations paid for it.
> Sponsors: {{PLACEHOLDER: sponsor names, tiers, and logo assets — none confirmed}}
> Partners band label: In partnership with
> Partners: Nairobi Business Angel Network
> Footer: Thank you.

**Data**

| Value | Meaning | Status |
|---|---|---|
| Sponsor names, tiers, logos | Sponsor recognition | **PLACEHOLDER — none confirmed** |
| "Free for every participant" | Programme was no-cost to participants | PLACEHOLDER — **confirm before ship; do not state if untrue** |
| Nairobi Business Angel Network | Third partner, added rev 2 | CONFIRMED — name only |
| NBAN logo asset | Partner mark | PLACEHOLDER — not supplied |
| NBAN contribution | What NBAN provided | PLACEHOLDER — **role unknown; do not imply they funded the cohort** |

### Partners are not sponsors — rev 2

The Nairobi Business Angel Network is a **partner**, not a sponsor. It must render in its
own labelled band, visually separated from the sponsor grid, and the "these organisations
paid for it" sentence must be scoped so it reads as applying to the sponsor grid alone.
Nothing on this slide may imply NBAN paid for the cohort — that is unverified, and the
room includes people who would know. If NBAN's actual contribution is confirmed later,
it belongs in the partner band's own line, not in the sponsor sentence.

Two hard rules for this slide:

- **Do not invent a sponsor name.** Not as sample data, not as filler, not as `Acme Corp` styled to look real. A fabricated sponsor name that survives to the projector is the single worst failure available to this deck.
- The "free for every participant" claim must be verified. If participants paid anything, the planner rewrites this line before ship.

- **Visual intent:** Logo grid. **Tier ordering is permitted; wildly unequal sizing is not** — a higher tier may be placed first or given modest prominence, but no sponsor should render so small it reads as an afterthought while its representative watches from the room. Until real assets arrive, render clearly-marked empty slots sized for real logos, so the layout is verifiable now and filling it later is a content-only edit.
- **Notes:** Name every sponsor out loud. Ask their representatives to stand. Do not rush this slide to save time — if the deck is running long, cut elsewhere.

**Acceptance**

1. No fabricated or sample sponsor name appears anywhere in the deck or its content file.
2. Placeholder sponsor slots render as visibly and unmistakably provisional, sized for real logo assets.
3. Sponsor entries render at broadly comparable visual weight; no entry is rendered so small it reads as an afterthought relative to the others.
4. Sponsor names, tiers, and logo paths are editable from one place in the content file, with no sponsor data hardcoded in components.
5. Nairobi Business Angel Network renders in a separately labelled partner band, outside the sponsor grid, and no text on the slide states or implies that it paid for the cohort.

---

## Slide 14 — `sponsor-impact-cta`

- **Title:** What your support built
- **Purpose:** Convert sponsor goodwill into Cohort 3 commitment, while they are still in the room and just watched the demos. Separated from slide 13 so gratitude does not read as transactional.

**Content**

> Headline: What your support built
> Impact line: {{PLACEHOLDER: sponsorship total or "your support"}} became {{PLACEHOLDER: N}} people trained, {{PLACEHOLDER: N}} automations shipped, and a cohort that is now {{PLACEHOLDER: N}} people strong.
> Ask: Cohort 3 needs the same. If you want your name on the next set of demos, talk to us before you leave today.
> Contact: {{PLACEHOLDER: sponsor contact name and email, or prospectus URL}}

**Data**

| Value | Meaning | Status |
|---|---|---|
| Impact figures | Must match slides 6 and 8 | PLACEHOLDER |
| Sponsor contact or prospectus | Conversion route | PLACEHOLDER |

- **Visual intent:** One clear ask, one clear contact route. Visually calmer than the stat slides — this is a direct address, not a data display. The contact detail must be large enough to photograph from the back row, because that is exactly what an interested sponsor will do.
- **Notes:** Say "before you leave today" and mean it. The conversion window closes when the room empties. Name the person to talk to and point at them.

**Acceptance**

1. Exactly one ask and one contact route render — no competing calls to action on this slide.
2. Contact details are legible from a back-row viewing distance and are visually prominent.
3. Impact figures reference the same content values as `community-today` and `cohort2-by-numbers`, not separately typed numbers.
4. All placeholders render as visibly provisional.

---

## Slide 15 — `whats-next`

- **Title:** What happens next
- **Purpose:** Prove the community continues past today, for every segment. Without this, the deck reads as an ending.

**Content**

> Headline: What happens next
> Items:
> - **Cohort 3** — applications open {{PLACEHOLDER: date}}, starting {{PLACEHOLDER: date}}
> - **Monthly meetups** — {{PLACEHOLDER: cadence and next date}}
> - **Cohort 2 graduates** — you are now mentors-in-waiting. We will be asking.
> - **{{PLACEHOLDER: any other confirmed initiative, or remove this line}}**
> Kicker: Today is not the end of Cohort 2. It is the start of everyone else's turn.

**Data**

| Value | Meaning | Status |
|---|---|---|
| Cohort 3 dates | Application and start dates | PLACEHOLDER |
| Meetup cadence | Ongoing programming | PLACEHOLDER |

- **Visual intent:** A forward-looking list, visually distinct from the backward-looking `journey-timeline`. The Cohort 3 entry carries the most weight — it is the primary conversion target for prospective members.
- **Notes:** The line to graduates matters: they arrived as students and leave with a role. Say it as an expectation, not a hope.

**Acceptance**

1. Cohort 3 renders as the most prominent item in the list.
2. The graduates-become-mentors line renders in full.
3. The optional fourth item is straightforward to remove from content without leaving an empty slot or breaking the layout.
4. All date placeholders render as visibly provisional.

---

## Slide 16 — `get-involved`

- **Title:** How to be part of it
- **Purpose:** Convert every segment with a segment-specific next step. The deck's primary call to action.

**Content**

> Headline: How to be part of it
> Routes:
> - **Want to build?** Apply for Cohort 3 — {{PLACEHOLDER: application URL}}
> - **Want to teach?** Mentor a Cohort 3 project — {{PLACEHOLDER: mentor sign-up route}}
> - **Want to fund it?** Sponsor Cohort 3 — {{PLACEHOLDER: sponsor contact}}
> - **Just want in?** Join the community — {{PLACEHOLDER: community join link}}
> Footer: All four links are on the last slide. It stays up while we eat.

**Content note:** if a QR code is used for any route, it must sit alongside the written URL, never replace it — a projected QR is unusable from the back row and unusable to anyone photographing the slide from an angle.

**Data**

| Value | Meaning | Status |
|---|---|---|
| All four routes/links | Conversion destinations | PLACEHOLDER |

- **Visual intent:** Four parallel routes, equal weight, each pairing an audience question with a single action. This is the highest-stakes slide for legibility — every link must be readable and photographable from the back row.
- **Notes:** Do not read all four. Say "there's a route here for everyone in this room" and let people find their own. Then tell them the last slide stays up.

**Acceptance**

1. All four routes render, each with its question and its action.
2. Every link is legible at 1920×1080 from a back-row viewing distance.
3. Any QR code renders alongside its written URL, never as a replacement for it.
4. The four routes render at equal visual weight.

---

## Slide 17 — `thank-you`

- **Title:** Thank you
- **Purpose:** Close with gratitude, naming every contributing group once more. Emotional resolution.

**Content**

> Headline: Thank you
> Groups:
> - Cohort 2 — for doing the work
> - Mentors and facilitators — for teaching it for free
> - Our sponsors — for paying for it
> - The AI Collective, Nairobi Chapter — for building it with us
> - {{PLACEHOLDER: venue host, if the venue was donated — otherwise remove this line}}
> - Everyone in this room — for showing up on a Saturday
> Kicker: See you at Cohort 3.

**Data**

| Value | Meaning | Status |
|---|---|---|
| Venue host line | Conditional — only if venue donated | PLACEHOLDER |
| All other groups | Confirmed contributors | CONFIRMED |

- **Visual intent:** A gratitude list, warm and readable, all groups at equal weight. The kicker is the last thing the speaker says and should have real presence.
- **Notes:** Say each line looking at the people it refers to. End on "See you at Cohort 3" and stop talking.

**Acceptance**

1. All non-conditional groups render in full.
2. The conditional venue line is removable from content without leaving an empty slot or breaking the layout.
3. The kicker renders with clear visual prominence as the deck's final spoken line.

---

## Slide 18 — `close-holding`

- **Title:** Stay in touch
- **Purpose:** Remain on screen, unattended, while the room mingles and eats. Must work with no speaker present — this is the only slide with that requirement.

**Content**

> Eyebrow: Nairobi AI Community × The AI Collective — Nairobi Chapter
> Headline: Stay in touch
> Links:
> - Apply for Cohort 3 — {{PLACEHOLDER: application URL}}
> - Join the community — {{PLACEHOLDER: community join link}}
> - Sponsor Cohort 3 — {{PLACEHOLDER: sponsor contact}}
> - {{PLACEHOLDER: social handles}}
> Footer: AI Automations Training · Cohort 2 · Nairobi · 8 August 2026

**Data**

| Value | Meaning | Status |
|---|---|---|
| All links and handles | Must match `get-involved` values | PLACEHOLDER |
| Footer event details | Event identity | CONFIRMED |

- **Visual intent:** Designed to be **read unattended from across a room**, which makes it the deck's legibility ceiling — larger link text than any other slide, high contrast, no animation that could loop distractingly or burn in. Everything a person needs in order to act tomorrow, with nobody explaining it. QR codes are welcome here (unlike mid-deck) since viewers can approach the screen, but written URLs must still appear alongside them.
- **Notes:** Leave this up. Do not advance past it. Do not let anyone close the laptop.

**Acceptance**

1. Link text renders larger than the body text on any other slide in the deck.
2. Links reference the same content values as `get-involved` — not separately typed URLs.
3. The slide is fully self-explanatory with no speaker present, and contains no animation that loops indefinitely.
4. Any QR code renders alongside its written URL.

---

## Cross-slide requirements

These apply across the deck and QA verifies them once, not per slide.

1. **Shared values are sourced once.** Programme length (slides 2, 7, 9), founding year (4, 6), graduate and project counts (2, 8, 9, 14), and all links (16, 18) each live in exactly one place in `src/content/deck.ts`. Duplicated literals that could drift are a defect.
2. **Derived figures are computed, not stored.** Completion rate on slide 8 derives from enrolled and graduated.
3. **No fabricated facts anywhere**, including sample or filler data in the content file. This applies with particular force to sponsor names, member counts, and graduate names.
4. **Every `{{PLACEHOLDER: …}}` renders as visibly provisional** and is greppable in the content file in one pass.
5. **Speaker notes exist for every slide** except `title-close` and `close-holding`, which have minimal notes by design.
6. **Equal-weight constraints are hard**: host/partner naming (1, 12), audience groups (3), projects (9), mentor names (11), conversion routes (16).
