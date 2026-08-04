import type { ComponentType } from 'react';

import { graduateVoice } from '../content/deck';

import { TitleClose } from './TitleClose';
import { WhatYouJustSaw } from './WhatYouJustSaw';
import { WhyToday } from './WhyToday';
import { OriginStory } from './OriginStory';
import { JourneyTimeline } from './JourneyTimeline';
import { CommunityToday } from './CommunityToday';
import { Cohort2Programme } from './Cohort2Programme';
import { Cohort2ByNumbers } from './Cohort2ByNumbers';
import { Cohort2ShowcaseRecap } from './Cohort2ShowcaseRecap';
import { GraduateVoice } from './GraduateVoice';
import { MentorsFacilitators } from './MentorsFacilitators';
import { PartnershipAic } from './PartnershipAic';
import { SponsorsPartners } from './SponsorsPartners';
import { SponsorImpactCta } from './SponsorImpactCta';
import { WhatsNext } from './WhatsNext';
import { GetInvolved } from './GetInvolved';
import { ThankYou } from './ThankYou';
import { CloseHolding } from './CloseHolding';

export interface SlideDef {
  /** Stable spec `id`. Never renumbered, never reused. */
  readonly id: string;
  /** Spec title, used by the overview and notes panel — not rendered on the slide. */
  readonly title: string;
  /** Budgeted minutes on stage, from the spec order table. */
  readonly minutes: number;
  readonly Component: ComponentType;
}

/**
 * THE single source of presentation order. Spec rev 1, docs/02-slide-spec.md.
 *
 * Order here must match the spec order table exactly; QA verifies that as coverage
 * check #1. Nothing else in the codebase encodes slide order.
 */
const ORDER: readonly SlideDef[] = [
  { id: 'title-close', title: 'Demo Day · Cohort 2', minutes: 0.5, Component: TitleClose },
  { id: 'what-you-just-saw', title: 'What you just watched', minutes: 1.5, Component: WhatYouJustSaw },
  { id: 'why-today', title: "Why we're all in this room", minutes: 2.0, Component: WhyToday },
  { id: 'origin-story', title: 'It started with a group chat', minutes: 1.5, Component: OriginStory },
  { id: 'journey-timeline', title: 'How we got here', minutes: 2.5, Component: JourneyTimeline },
  { id: 'community-today', title: 'The community today', minutes: 1.5, Component: CommunityToday },
  { id: 'cohort2-programme', title: 'What Cohort 2 actually did', minutes: 1.5, Component: Cohort2Programme },
  { id: 'cohort2-by-numbers', title: 'Cohort 2 by the numbers', minutes: 1.5, Component: Cohort2ByNumbers },
  { id: 'cohort2-showcase-recap', title: 'Everything you saw today', minutes: 1.5, Component: Cohort2ShowcaseRecap },
  { id: 'graduate-voice', title: 'In their words', minutes: 1.0, Component: GraduateVoice },
  { id: 'mentors-facilitators', title: 'The people who taught this', minutes: 1.5, Component: MentorsFacilitators },
  { id: 'partnership-aic', title: 'In partnership with The AI Collective', minutes: 1.5, Component: PartnershipAic },
  { id: 'sponsors-partners', title: 'Made possible by our sponsors', minutes: 2.0, Component: SponsorsPartners },
  { id: 'sponsor-impact-cta', title: 'What your support built', minutes: 1.5, Component: SponsorImpactCta },
  { id: 'whats-next', title: 'What happens next', minutes: 2.0, Component: WhatsNext },
  { id: 'get-involved', title: 'How to be part of it', minutes: 2.0, Component: GetInvolved },
  { id: 'thank-you', title: 'Thank you', minutes: 1.0, Component: ThankYou },
  { id: 'close-holding', title: 'Stay in touch', minutes: 0.5, Component: CloseHolding },
];

/**
 * `graduate-voice` is CUT, never anonymised, if attribution consent is withheld — spec
 * slide 10. Setting `graduateVoice.consent = 'withheld'` in content removes it here and
 * the runtime renumbers the deck automatically.
 */
export const slides: readonly SlideDef[] = ORDER.filter(
  (s) => !(s.id === 'graduate-voice' && graduateVoice.consent === 'withheld'),
);

/** Budgeted runtime. The slot is 30 minutes; the spec budgets 27.0. */
export const totalMinutes = slides.reduce((sum, s) => sum + s.minutes, 0);
