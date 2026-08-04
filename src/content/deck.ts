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
  tbc,
  tbcList,
  type Fact,
  type FactList,
  type LinkEntry,
  type Milestone,
  type Person,
  type Project,
  type Route,
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
} as const;

/* -------------------------------------------------------------------------- */
/* Shared values — single-sourced per spec § Cross-slide requirements #1       */
/* -------------------------------------------------------------------------- */

/**
 * Programme length. Used by `what-you-just-saw`, `cohort2-programme` and
 * `cohort2-showcase-recap`. Spec rev 1 assumed twelve weeks but flagged it unconfirmed,
 * so it ships as a placeholder rather than as a plausible-looking guess.
 */
export const programme = {
  weeks: tbc<number>('programme length in weeks'),
} as const;

export const community = {
  foundingMonthYear: tbc<string>('founding month and year'),
  foundingYear: tbc<string>('founding year'),
  founderFraming: tbc<string>('who started it — count and framing'),
  members: tbc<number>('total community members'),
  eventsHeld: tbc<number>('events held to date'),
  cohortsRun: tbc<number>('cohorts run to date'),
  peopleTrained: tbc<number>('people trained to date'),
} as const;

export const cohort2 = {
  /** Number of graduates who demoed live earlier in the event. */
  demoCount: tbc<number>('number of graduates who demoed today'),
  applied: tbc<number>('Cohort 2 applicants'),
  enrolled: tbc<number>('Cohort 2 enrolled'),
  graduated: tbc<number>('Cohort 2 graduated'),
  shipped: tbc<number>('Cohort 2 automations shipped'),
} as const;

/**
 * Completion rate is DERIVED, never stored — spec § Cross-slide requirements #2.
 * Two independent fields would drift, and the drift would be discovered on stage.
 */
export const completionRate = (): Fact<string> => {
  const { enrolled, graduated } = cohort2;
  if (enrolled.status === 'confirmed' && graduated.status === 'confirmed') {
    if (enrolled.value <= 0) {
      return tbc<string>('completion rate — enrolled must be greater than zero');
    }
    return confirmed(`${Math.round((graduated.value / enrolled.value) * 100)}%`);
  }
  return tbc<string>('completion rate — derives from enrolled and graduated');
};

export const links = {
  application: tbc<string>('Cohort 3 application URL'),
  join: tbc<string>('community join link — WhatsApp or Discord'),
  mentorSignup: tbc<string>('mentor sign-up route'),
  sponsorContact: tbc<string>('sponsor contact name and email, or prospectus URL'),
  socials: tbc<string>('social handles'),
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 1 — title-close                                                      */
/* -------------------------------------------------------------------------- */

export const titleClose = {
  // Host and partner are read from `event` directly by the slide so they can render as a
  // two-line pair at equal weight; `event.pairing` is used by `close-holding`.
  headline: 'Demo Day',
  subhead: `${event.programme} · ${event.cohort}`,
  meta: `${event.city} · ${event.dateLong}`,
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 2 — what-you-just-saw                                                */
/* -------------------------------------------------------------------------- */

export const whatYouJustSaw = {
  headline: 'What you just watched',
  bodyBefore: 'Ten minutes ago,',
  count: cohort2.demoCount,
  bodyAfter:
    'people showed you automations they built from nothing. Not prototypes someone else wrote. Not tutorials they followed. Their own work, solving problems they chose.',
  kickerBefore: '',
  kickerWeeks: programme.weeks,
  kickerAfter: 'weeks ago, most of them had never shipped a single automation.',
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

export const originStory = {
  headline: 'It started with a group chat',
  bodyBefore: 'In',
  when: community.foundingMonthYear,
  bodyMiddle: '',
  who: community.founderFraming,
  bodyAfter:
    'started meeting to figure out what AI actually meant for the work we were already doing in Nairobi.',
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
      date: tbc<string>('date — community founded'),
      label: confirmed('Community founded'),
    },
    {
      date: tbc<string>('date — first milestone'),
      label: tbc<string>('first milestone, e.g. first public meetup'),
    },
    {
      date: tbc<string>('date — partnership begins'),
      label: confirmed(`Partnership with ${event.partnerFull}`),
    },
    {
      date: tbc<string>('date — Cohort 1 launch'),
      label: confirmed(`${event.programme}, Cohort 1 launches`),
    },
    {
      date: tbc<string>('date — Cohort 1 Demo Day'),
      label: tbc<string>('Cohort 1 Demo Day — N graduates'),
    },
    {
      date: tbc<string>('date — Cohort 2 launch'),
      label: confirmed('Cohort 2 launches'),
    },
    {
      date: confirmed(event.dateShort),
      label: confirmed('today'),
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
    { figure: community.eventsHeld, label: 'events held' },
    { figure: community.cohortsRun, label: 'cohorts run' },
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
    'Picked a real problem from their own work or community',
    'Learned to build automations that solve it, with tools they can keep using',
    'Shipped it, broke it, and fixed it in front of mentors',
    'Demoed it today to a room of strangers',
  ],
  kicker: 'No prior experience required. That was the point.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 8 — cohort2-by-numbers                                               */
/* -------------------------------------------------------------------------- */

export const cohort2ByNumbers = {
  headline: 'Cohort 2 by the numbers',
  stats: [
    { figure: cohort2.applied, label: 'applied' },
    { figure: cohort2.enrolled, label: 'enrolled' },
    { figure: cohort2.graduated, label: 'graduated' },
    { figure: cohort2.shipped, label: 'automations shipped' },
  ] satisfies readonly Stat[],
  footerAfter:
    'completion rate. For an unpaid evening programme, that is the number we are proudest of.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 9 — cohort2-showcase-recap                                           */
/* -------------------------------------------------------------------------- */

export const showcaseRecap = {
  headline: 'Everything you saw today',
  subheadShipped: cohort2.shipped,
  subheadPeople: cohort2.graduated,
  subheadWeeks: programme.weeks,
  projects: tbcList<Project>(
    'Cohort 2 project titles with builder names — one line each, all projects',
    9,
  ) satisfies FactList<Project>,
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 10 — graduate-voice                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Attribution consent is a shipping requirement, not a nicety. Per spec rev 1, if consent
 * is withheld the slide is CUT rather than anonymised — an anonymous testimonial persuades
 * nobody and reads as fabricated. Setting `consent: 'withheld'` removes the slide from the
 * deck order in src/slides/index.ts and the runtime recalculates numbering.
 */
export const graduateVoice = {
  headline: 'In their words',
  consent: 'pending' as 'pending' | 'granted' | 'withheld',
  quote: tbc<string>('verbatim quote from a Cohort 2 graduate — 2 to 3 sentences'),
  name: tbc<string>('graduate name'),
  role: tbc<string>('graduate role or project'),
  attributionSuffix: event.cohort,
  /** Only rendered when explicitly supplied and consented to. */
  portrait: null as string | null,
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 11 — mentors-facilitators                                            */
/* -------------------------------------------------------------------------- */

export const mentors = {
  headline: 'The people who taught this',
  intro:
    'Cohort 2 was taught by people who did it on top of their own jobs, for free.',
  people: tbcList<Person>('mentor and facilitator names, with role where useful', 8),
  footer: 'If you learned something today, one of these people is why.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 12 — partnership-aic                                                 */
/* -------------------------------------------------------------------------- */

export const partnership = {
  headline: `In partnership with ${event.partner}`,
  subhead: event.partnerQualifier,
  // Spec copy ends this clause with an em-dash, which assumed the contribution sentence
  // continued inline. It now sits on its own line, so a colon is the correct punctuation —
  // a trailing em-dash dangles at the end of the line. Wording is otherwise unchanged.
  bodyBefore: `Cohort 2 ran as a partnership between the ${event.host} and ${event.partner}’s ${event.partnerQualifier}:`,
  contribution: tbc<string>(
    'one sentence on what the partnership concretely provided, e.g. venue, mentor network, curriculum support',
  ),
  kicker: 'Two organisations, one cohort, no hierarchy.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 13 — sponsors-partners                                               */
/* -------------------------------------------------------------------------- */

export const sponsors = {
  headline: 'Made possible by our sponsors and partners',
  /**
   * The "free for every participant" claim must be verified before it is projected.
   * It ships as a placeholder precisely so nobody can state it by accident.
   */
  participantCostClaim: tbc<string>(
    'confirm the participant-cost claim — was Cohort 2 free for every participant? Do not state if untrue',
  ),
  introAfter:
    'That was only possible because these organisations paid for it.',
  /**
   * NO SPONSOR NAME IS INVENTED HERE. `slots` reserves realistic layout density so the
   * grid can be reviewed now; real names replace it as a one-line edit.
   */
  list: tbcList<Sponsor>('sponsor names, tiers, and logo assets — none confirmed', 6),
  /**
   * Partners, NOT sponsors — spec rev 2. These render in their own labelled band outside
   * the sponsor grid, and nothing on the slide may imply they paid for the cohort: NBAN's
   * actual contribution is unconfirmed and the room includes people who would know.
   */
  partnersBandLabel: 'In partnership with',
  partners: confirmedList<Sponsor>([
    { name: 'Nairobi Business Angel Network' },
  ]),
  footer: 'Thank you.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 14 — sponsor-impact-cta                                              */
/* -------------------------------------------------------------------------- */

export const sponsorImpact = {
  headline: 'What your support built',
  supportLabel: tbc<string>('sponsorship total, or leave as "Your support"'),
  impactBecame: 'became',
  /** These reference the same values as slides 6 and 8 — not retyped. */
  trained: community.peopleTrained,
  shipped: cohort2.shipped,
  cohortSize: cohort2.graduated,
  ask: 'Cohort 3 needs the same. If you want your name on the next set of demos, talk to us before you leave today.',
  contactLabel: 'Talk to',
  contact: links.sponsorContact,
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 15 — whats-next                                                      */
/* -------------------------------------------------------------------------- */

export const whatsNext = {
  headline: 'What happens next',
  cohort3: {
    label: 'Cohort 3',
    applicationsOpen: tbc<string>('Cohort 3 applications open date'),
    startDate: tbc<string>('Cohort 3 start date'),
  },
  meetups: {
    label: 'Monthly meetups',
    detail: tbc<string>('meetup cadence and next date'),
  },
  graduates: {
    label: 'Cohort 2 graduates',
    detail: 'you are now mentors-in-waiting. We will be asking.',
  },
  /** Set to null to remove cleanly — spec slide 15 acceptance #3. */
  optionalInitiative: {
    label: tbc<string>('any other confirmed initiative'),
    detail: tbc<string>('detail for that initiative — or set optionalInitiative to null'),
  } as { label: Fact<string>; detail: Fact<string> } | null,
  kicker: 'Today is not the end of Cohort 2. It is the start of everyone else’s turn.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 16 — get-involved                                                    */
/* -------------------------------------------------------------------------- */

export const getInvolved = {
  headline: 'How to be part of it',
  routes: [
    {
      question: 'Want to build?',
      action: 'Apply for Cohort 3',
      target: links.application,
    },
    {
      question: 'Want to teach?',
      action: 'Mentor a Cohort 3 project',
      target: links.mentorSignup,
    },
    {
      question: 'Want to fund it?',
      action: 'Sponsor Cohort 3',
      target: links.sponsorContact,
    },
    {
      question: 'Just want in?',
      action: 'Join the community',
      target: links.join,
    },
  ] satisfies readonly Route[],
  footer: 'All four links are on the last slide. It stays up while we eat.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 17 — thank-you                                                       */
/* -------------------------------------------------------------------------- */

export const thankYou = {
  headline: 'Thank you',
  groups: confirmedList([
    { who: 'Cohort 2', reason: 'for doing the work' },
    { who: 'Mentors and facilitators', reason: 'for teaching it for free' },
    { who: 'Our sponsors', reason: 'for paying for it' },
    { who: event.partnerFull, reason: 'for building it with us' },
    { who: 'Everyone in this room', reason: 'for showing up on a Saturday' },
  ]),
  /** Conditional: only if the venue was donated. Set to null to remove cleanly. */
  venueHost: {
    who: tbc<string>('venue host name, if the venue was donated'),
    reason: 'for the room',
  } as { who: Fact<string>; reason: string } | null,
  kicker: 'See you at Cohort 3.',
} as const;

/* -------------------------------------------------------------------------- */
/* Slide 18 — close-holding                                                   */
/* -------------------------------------------------------------------------- */

export const closeHolding = {
  eyebrow: event.pairing,
  headline: 'Stay in touch',
  /** Same values as `getInvolved` — spec slide 18 acceptance #2. */
  entries: [
    { label: 'Apply for Cohort 3', target: links.application },
    { label: 'Join the community', target: links.join },
    { label: 'Sponsor Cohort 3', target: links.sponsorContact },
    { label: 'Find us', target: links.socials },
  ] satisfies readonly LinkEntry[],
  footer: `${event.programme} · ${event.cohort} · ${event.city} · ${event.dateShort}`,
} as const;

/* -------------------------------------------------------------------------- */
/* Speaker notes — spec § Cross-slide requirements #5                         */
/* -------------------------------------------------------------------------- */

export const speakerNotes: Record<string, string> = {
  'title-close':
    'Hold this slide while the room settles. “Before we let you go — give yourselves a round of applause. Thirty minutes, and then we eat.”',
  'what-you-just-saw':
    'Slow down here. Let the “never shipped a single automation” line land before moving. This is the graduates’ moment.',
  'why-today':
    'Look at each group as you name them. Sponsors especially — this is the first of four times they are addressed directly, and it should feel deliberate.',
  'origin-story':
    'If the founding story has a specific detail worth telling — the first venue, the first turnout, a moment it nearly stopped — tell it here instead of reading the slide. The slide is a backdrop for 90 seconds of honest talking.',
  'journey-timeline':
    'Do not read the timeline aloud. Pick the two milestones with a story and tell those; the slide carries the rest.',
  'community-today':
    '“Every one of those was zero” is the line that matters, not the numbers themselves. Sponsors have seen big numbers before; they have not seen numbers they helped move.',
  'cohort2-programme':
    'Aimed squarely at anyone in the room deciding about Cohort 3. Say “no prior experience” like you mean it, because several people are waiting for permission.',
  'cohort2-by-numbers':
    'If the completion rate is strong, dwell on it. If it is modest, say so plainly and say what you are changing for Cohort 3 — a room that just watched honest demos will forgive an honest number and will not forgive a spun one.',
  'cohort2-showcase-recap':
    'Do not walk through these. Say “all of it, on one slide” and give the room five seconds to find their own name.',
  'graduate-voice': 'Read the quote aloud, then stop. Do not explain it or add to it.',
  'mentors-facilitators':
    'Read every name out loud. Ask them to stand. This is the slide that costs the least and matters the most to the people on it.',
  'partnership-aic':
    'Name the specific thing the partnership made possible. Vague partnership language reads as a formality and the partner’s people in the room will notice.',
  'sponsors-partners':
    'Name every sponsor out loud. Ask their representatives to stand. Do not rush this slide to save time — if the deck is running long, cut elsewhere.',
  'sponsor-impact-cta':
    'Say “before you leave today” and mean it. The conversion window closes when the room empties. Name the person to talk to and point at them.',
  'whats-next':
    'The line to graduates matters: they arrived as students and leave with a role. Say it as an expectation, not a hope.',
  'get-involved':
    'Do not read all four. Say “there’s a route here for everyone in this room” and let people find their own. Then tell them the last slide stays up.',
  'thank-you':
    'Say each line looking at the people it refers to. End on “See you at Cohort 3” and stop talking.',
  'close-holding':
    'Leave this up. Do not advance past it. Do not let anyone close the laptop.',
};
