/**
 * ALL deck copy and data. Nothing textual or numeric belongs in a slide component.
 *
 * Source of truth: docs/02-slide-spec.md rev 1.
 *
 * Before Saturday 8 August 2026, every `tbc(...)` / `tbcList(...)` below must be replaced
 * with `confirmed(...)` / `confirmedList(...)`. Grep this file for `tbc` to find them all;
 * `docs/03-implementation-report.md` carries the same list as a checklist.
 *
 * NOTHING IN HERE IS INVENTED. There are no sample sponsor names, no filler member
 * counts, and no placeholder graduate names, because sample data has a habit of surviving
 * to the projector — and this deck is presented to sponsors sitting in the room.
 */

import {
  confirmed,
  confirmedList,
  type Fact,
  type Milestone,
  type Person,
  type Sponsor,
  type Stat,
} from './types';

/* -------------------------------------------------------------------------- */
/* Event identity — all confirmed                                             */
/* -------------------------------------------------------------------------- */

/**
 * Logo asset paths. Drop files into `public/logos/` at exactly these names and they appear;
 * if a file is absent the deck renders the organisation name instead of a broken image, so
 * a missing asset degrades rather than embarrasses. See public/logos/README.md.
 *
 * Paths are RELATIVE ("./logos/…"), not absolute ("/logos/…"). An absolute path resolves
 * against the filesystem root when the deck is opened over file://, so the standalone build
 * could never find its own logos. Relative resolves against the HTML file in every case:
 * dev server, served dist/, and double-clicked standalone. scripts/inline-dist.mjs
 * additionally folds these into the standalone file as data URIs so it stays genuinely
 * self-contained.
 */
export const logos = {
  host: './logos/nairobi-ai-community.png',
  partner: './logos/the-ai-collective.png',
  /** Not supplied. null renders the name, which is a correct outcome, not a placeholder. */
  angelNetwork: null as string | null,
} as const;

/**
 * Per-logo optical correction — see `Logo.tsx`.
 *
 * The two supplied marks disagree about their own margins. The AI Collective's roundel
 * fills its 884×884 canvas edge to edge, so it needs no correction. The Nairobi.AI wordmark
 * sits in a narrow band inside a 539×463 canvas with large transparent padding above and
 * below, so fitting the canvas makes the artwork itself render roughly a third of the
 * height of the roundel — one partner reading as an afterthought next to the other, which is
 * precisely what the equal-weight constraint exists to prevent.
 *
 * If either logo is ever re-exported tightly cropped, set its value back to 1.
 */
export const logoScale = {
  host: 2.4,
  partner: 1,
} as const;

export const event = {
  host: 'Nairobi AI Community',
  partner: 'The AI Collective',
  partnerQualifier: 'Nairobi Chapter',
  partnerFull: 'The AI Collective — Nairobi Chapter',
  /** Rendered wherever host and partner appear together, at equal weight. */
  pairing: 'Nairobi AI Community × The AI Collective — Nairobi Chapter',
  programme: 'AI Automations Training',
  cohort: 'Cohort 2',
  city: 'Nairobi',
  dateLong: 'Saturday, 8 August 2026',
  dateShort: '8 August 2026',
  todayLabel: 'today',
  /*
    Venue and start time were placeholders until the promo poster confirmed them. Taken
    verbatim from public/logos/demo-day-poster.png — not inferred.
  */
  venue: 'ALX, The Piano',
  venueAddress: '171 Brookside Dr, Nairobi',
  startTime: '10:00 AM',
} as const;

/* -------------------------------------------------------------------------- */
/* Shared values — single-sourced per spec § Cross-slide requirements #1       */
/* -------------------------------------------------------------------------- */

/** Programme length. Used by `cohort2-programme`. Confirmed at rev 3. */
export const programme = {
  weeks: confirmed(15),
} as const;

export const community = {
  /** Slide 4's leadership meeting. "December last year" relative to Aug 2026. */
  leadershipMeeting: confirmed('December 2025'),
  /**
   * Slide 4 copy says "5 years", but operations began mid-2019 — about 6.5 years by
   * December 2025. Recorded in spec rev 3 as a conflict; the user's wording is used as given.
   */
  yearsBeforeTraining: confirmed(5),
  foundingYear: confirmed('2019'),
  members: confirmed('2,400+'),
  eventsHeld: confirmed('20+'),
  cohortsRun: confirmed(2),
  peopleTrained: confirmed('100+'),
} as const;

export const cohort2 = {
  /** Groups presenting a capstone solution on stage after this deck. */
  presentingGroups: confirmed(3),
  /** Minutes each group gets to demo. */
  minutesPerGroup: confirmed(5),
} as const;

export const links = {
  application: confirmed('https://nairobiaicommunityn8ntraining.lovable.app/'),
  /** One route for mentoring, sponsoring and joining — the community's LinkedIn page. */
  linkedIn: confirmed(
    'https://www.linkedin.com/company/nairobi-ai-community/?viewAsMember=true',
  ),
  linkedInLabel: confirmed('linkedin.com/company/nairobi-ai-community'),
} as const;

/**
 * QR codes are pre-rendered to SVG at build time by scripts/gen-qr.mjs so the deck needs no
 * QR library at runtime and works with the network off. Paths are relative for the same
 * reason the logo paths are — see `logos` above.
 */
export const qr = {
  application: './qr/application.svg',
  linkedIn: './qr/linkedin.svg',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 1 — title-close                                                      */
/* -------------------------------------------------------------------------- */

export const titleClose = {
  // Host and partner are read from `event` directly by the slide so they can render as a
  // two-line pair at equal weight; `event.pairing` is used by `close-holding`.
  /** The poster sets "AI" in a blue→orange gradient above "DEMO DAY". Same lockup here. */
  headlineAccent: 'AI',
  headline: 'DEMO DAY',
  /** Poster tagline, verbatim. */
  tagline: ['SHOWCASE.', 'CONNECT.', 'BUILD THE FUTURE.'],
  subhead: `${event.programme} · ${event.cohort}`,
  meta: `${event.venue} · ${event.dateLong}`,
  /** Poster footer line, verbatim. */
  footerTagline: 'INNOVATE LOCALLY. IMPACT GLOBALLY.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 2 — what-you-just-saw                                                */
/* -------------------------------------------------------------------------- */

/*
  Recast at rev 3. The deck now runs at 12:30, so it cannot open on presentations that have
  not happened. It opens instead on the two hours the room has already spent at the
  workstations — which is genuinely "what you just saw" at this hour. No graduate framing and
  no programme length here, per the user's direction.
*/
export const whatYouJustSaw = {
  headline: 'What you have already seen',
  body:
    'Since you walked in the room, people showed you automations they built from nothing. Not prototypes someone else wrote. Not tutorials they followed. Their own work, solving problems they chose.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 3 — why-today                                                        */
/* -------------------------------------------------------------------------- */

export const whyToday = {
  headline: 'Why we’re all in this room',
  intro:
    'Demo Day is not a graduation ceremony. It is the moment the work stops being private.',
  groups: [
    {
      label: 'Graduates',
      body: 'you came to prove it works in front of people who would notice if it didn’t.',
    },
    {
      label: 'People thinking about joining',
      body: 'you came to find out whether this is real before you spend your Saturdays on it.',
    },
    {
      label: 'Sponsors and partners',
      body: 'you came to see what your support turned into.',
    },
    {
      label: 'Mentors and facilitators',
      body: 'you came to watch people you taught outgrow the lesson.',
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 4 — origin-story                                                     */
/* -------------------------------------------------------------------------- */

/*
  Retitled at rev 3. "It started with a group chat" described a scrappy founding moment, but
  the real story is a five-year-old community whose leadership team sat down in December 2025
  to decide what AI meant for work they were already doing — a different, and better, story.
*/
export const originStory = {
  headline: 'Why we built this training',
  bodyBefore: 'After running the',
  host: event.host,
  bodyMiddleA: 'for',
  years: community.yearsBeforeTraining,
  bodyMiddleB: 'years, in',
  when: community.leadershipMeeting,
  bodyAfter:
    'the Nairobi AI leadership team met to figure out what AI actually meant for the work we were already doing in Nairobi.',
  kicker:
    'No funding, no venue, no curriculum. Just a recurring calendar invite that people kept showing up to.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 5 — journey-timeline                                                 */
/* -------------------------------------------------------------------------- */

export const journey = {
  headline: 'How we got here',
  /**
   * Spec targets 6–7 milestones: fewer than 5 reads as thin, more than 8 stops being
   * legible from the back row. The final entry is today and is always confirmed.
   */
  milestones: [
    {
      date: confirmed('Mid 2019'),
      label: confirmed(`${event.host} starts operations`),
    },
    {
      date: confirmed('2024'),
      label: confirmed('Our first physical meetup'),
    },
    {
      date: confirmed('September 2025'),
      label: confirmed(
        `${event.partner} expands globally and launches its ${event.partnerQualifier} — with ${event.host} as its first community partner`,
      ),
    },
    {
      date: confirmed('March 2026'),
      label: confirmed(`${event.programme}, Cohort 1 launches`),
    },
    {
      date: confirmed('Late May 2026'),
      label: confirmed('Cohort 1 ends with a virtual graduation'),
    },
    {
      date: confirmed('June 2026'),
      label: confirmed('Cohort 2 launches'),
    },
    {
      date: confirmed(event.dateShort),
      label: confirmed('Cohort 2 graduates'),
      isToday: true,
    },
  ] satisfies readonly Milestone[],
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 6 — community-today                                                  */
/* -------------------------------------------------------------------------- */

export const communityToday = {
  headline: 'The community today',
  stats: [
    { figure: community.members, label: 'members' },
    { figure: community.eventsHeld, label: 'events held, online and physical' },
    { figure: community.cohortsRun, label: 'cohorts of AI automations run' },
    { figure: community.peopleTrained, label: 'people trained to date' },
  ] satisfies readonly Stat[],
  footerBefore: 'Every one of those numbers was zero in',
  footerYear: community.foundingYear,
  footerAfter: '.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 7 — cohort2-programme                                                */
/* -------------------------------------------------------------------------- */

export const cohort2Programme = {
  headline: 'What Cohort 2 actually did',
  introWeeks: programme.weeks,
  introAfter: 'weeks, in the evenings, alongside full-time jobs.',
  steps: [
    'Attended our bi-weekly training sessions',
    'Did the assignments',
    'Were matched with real businesses to tackle their bottlenecks',
    'Learnt to build automations that solve those bottlenecks',
  ],
  kicker: 'No prior experience required. That was the point.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 8 — virtual-address  (replaces the retired `cohort2-by-numbers`)      */
/* -------------------------------------------------------------------------- */

/*
  A holding frame for the live virtual speech in the 12:30 slot. It carries 4.0 of the deck's
  15.0 minutes but almost no reading: the speaker is on the call, not on the slide, so the
  slide's whole job is to say who is talking and get out of the way.
*/
export const virtualAddress = {
  eyebrow: 'Joining us live',
  headline: 'A word from our Lead Organizer',
  role: 'Lead Organizer',
  organisation: event.host,
  note: 'Speaking to us virtually.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 9 — capstone-lineup  (replaces the retired `cohort2-showcase-recap`)  */
/* -------------------------------------------------------------------------- */

/*
  Forward-looking at rev 3. At 12:30 nothing has been presented yet, so a roll of honour is
  impossible; this slide sets up the hour that follows instead.

  `groups` and `minutesEach` are single content values. Brief rev 2's run of show says six
  teams over 12:45–13:45 while the rev 3 direction says three groups at five minutes each —
  recorded as an open conflict in spec rev 3. Correcting it is one edit here.
*/
export const capstoneLineup = {
  headline: 'What you’re about to see',
  groups: cohort2.presentingGroups,
  minutesEach: cohort2.minutesPerGroup,
  introAfter: 'groups. One solution each, built for a real business bottleneck.',
  detail: 'minutes on stage per group, then the judges decide the Cohort 2 winner.',
  kicker: 'You have already met them at the workstations. Now watch them present.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 10 — mentors-facilitators                                            */
/* -------------------------------------------------------------------------- */

export const mentors = {
  headline: 'The people who made it happen',
  intro:
    'Cohort 2 was taught and supported by people who did it on top of their own jobs.',
  people: confirmedList<Person>([
    { name: 'Willie Macharia', role: 'Lead Instructor' },
    { name: 'Wawira Muchiri', role: 'Course Instructor' },
    { name: 'Felistus Asene', role: 'Facilitator' },
    { name: 'Dancan Angwenyi', role: 'Quality Assurance' },
    { name: 'Arthur Adinda', role: 'Commercialization & Partnerships' },
  ]),
  footer: 'If you learned something today, one of these people is why.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 11 — sponsors-partners  (slide 12 `partnership-aic` merged in here)   */
/* -------------------------------------------------------------------------- */

/*
  Merged at rev 3. Main partners and sponsors now share one slide: the two organisations that
  ran the cohort sit on top at equal weight, with the supporting sponsors in a grid beneath.

  The rev 2 arrangement — a separate partner band that deliberately kept NBAN out of the
  sponsor grid — is superseded by the user's direction to list NBAN among the sponsors.

  The rev 1/2 "Cohort 2 was free for every participant" claim is dropped rather than left as
  a placeholder: it was never confirmed, and the merged slide no longer has a natural place
  for it. If it is true and worth saying, it belongs in the speaker's mouth, not on a slide
  where an unverified funding claim sits next to real sponsor names.
*/
export const sponsors = {
  headline: 'Partners and sponsors',
  mainLabel: 'Main partners and sponsors',
  sponsorsLabel: 'With support from',
  /**
   * Three names confirmed by the user; two slots still to come. No name here is invented —
   * the unconfirmed entries are placeholders, not filler.
   */
  list: confirmedList<Sponsor>([
    { name: 'The Boy Who Believed' },
    { name: 'ALX' },
    { name: 'Nairobi Business Angel Network' },
  ]),
  remainingSlots: 2,
  remainingHint: '2 more sponsor logos to come',
  footer: 'Thank you.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 12 — whats-next                                                      */
/* -------------------------------------------------------------------------- */

/*
  Rev 3: Cohort 3 applications are open now and the URL is real, so the slide leads with a QR
  code rather than a date placeholder. The optional-initiative rows are gone per the user's
  direction; the closing line stays.
*/
export const whatsNext = {
  headline: 'What happens next',
  cohort3: {
    label: 'Cohort 3 applications are open',
    detail: 'Scan to apply.',
    url: links.application,
    qr: qr.application,
  },
  graduates: {
    label: 'Cohort 2 graduates',
    detail: 'you are now mentors-in-waiting. We will be asking.',
  },
  kicker: 'Today is not the end of Cohort 2. It is the start of everyone else’s turn.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 13 — get-involved                                                    */
/* -------------------------------------------------------------------------- */

/*
  Rev 3: two routes rather than four. Applying has its own QR; mentoring, sponsoring and
  joining all converge on the community's LinkedIn page, which is how the user wants people
  to reach them. Collapsing three identical destinations into one entry is honest — three
  rows pointing at the same URL reads as padding and makes the real distinction harder to see.
*/
export const getInvolved = {
  headline: 'How to be part of it',
  build: {
    question: 'Want to build?',
    action: 'Apply for Cohort 3',
    detail: 'Scan the code.',
    url: links.application,
    qr: qr.application,
  },
  reach: {
    question: 'Want to mentor, sponsor, or just join us?',
    action: `Reach out to ${event.host} on LinkedIn`,
    url: links.linkedIn,
    label: links.linkedInLabel,
    qr: qr.linkedIn,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 14 — thank-you                                                       */
/* -------------------------------------------------------------------------- */

export const thankYou = {
  headline: 'Thank you',
  groups: confirmedList([
    { who: 'Cohort 2', reason: 'for doing the work' },
    { who: 'Our instructors and facilitators', reason: 'for teaching it' },
    { who: 'Our partners and sponsors', reason: 'for making it possible' },
    { who: event.partnerFull, reason: 'for building it with us' },
    { who: 'Everyone in this room', reason: 'for showing up on a Saturday' },
  ]),
  /** Confirmed at rev 3 — the venue is ALX, The Piano. */
  venueHost: {
    who: confirmed(event.venue),
    reason: 'for the room',
  } as { who: Fact<string>; reason: string } | null,
  kicker: 'Now let’s see what they built.',
} as const;

/* -------------------------------------------------------------------------- */
/* Speaker notes — spec § Cross-slide requirements #5                         */
/* -------------------------------------------------------------------------- */

export const speakerNotes: Record<string, string> = {
  'title-close':
    'Hold this while the room settles after the snacks. Welcome them, introduce yourself, and say plainly what the next hour and a half looks like: a short welcome, a word from our Lead Organizer, then the teams present and the judges pick a winner.',
  'what-you-just-saw':
    'Point at the workstations. The room has spent two hours with these automations already — this line just names what they were looking at. Do not oversell it; they were there.',
  'why-today':
    'Look at each group as you name them. Sponsors and partners especially — this is the first of several times they are addressed directly, and it should feel deliberate.',
  'origin-story':
    'The honest version is better than the slide. Tell them what the leadership team actually argued about in December, and why training was the answer rather than another meetup.',
  'journey-timeline':
    'Do not read the timeline aloud. Pick the two milestones with a story — the first physical meetup, and becoming the AI Collective’s first community partner — and tell those. The slide carries the rest.',
  'community-today':
    '“Every one of those numbers was zero in 2019” is the line that matters, not the numbers themselves. Say it slowly.',
  'cohort2-programme':
    'Aimed squarely at anyone in the room deciding about Cohort 3. Say “no prior experience” like you mean it, because several people are waiting for permission.',
  'virtual-address':
    'Hand over cleanly and get out of shot. Check audio before you start the slot, not during it. If the call fails, say so plainly, move on, and come back to it — do not fill the silence by ad-libbing over a black screen.',
  'capstone-lineup':
    'This is the handoff to the main event. Name the groups if you can, tell the room how the judging works, and set the expectation that five minutes means five minutes.',
  'mentors-facilitators':
    'Read every name out loud and ask them to stand. This is the slide that costs the least and matters the most to the people on it.',
  'sponsors-partners':
    'Name every partner and sponsor out loud. Ask their representatives to stand. Do not rush this to save time — if the deck is running long, cut elsewhere.',
  'whats-next':
    'Tell them the QR code is live now and applications are genuinely open. The line to graduates matters too: they arrived as students and leave with a role. Say it as an expectation, not a hope.',
  'get-involved':
    'Two routes, so you can actually say both. Give the room a few seconds with the QR codes before moving — people need time to get their phones out.',
  'thank-you':
    'Say each line looking at the people it refers to. End on “Now let’s see what they built” and hand straight over to the first group.',
};
