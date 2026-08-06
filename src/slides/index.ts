import type { ComponentType } from 'react';

import { TitleClose } from './TitleClose';
import { WhatYouJustSaw } from './WhatYouJustSaw';
import { WhyToday } from './WhyToday';
import { OriginStory } from './OriginStory';
import { JourneyTimeline } from './JourneyTimeline';
import { CommunityToday } from './CommunityToday';
import { Cohort2Programme } from './Cohort2Programme';
import { VirtualAddress } from './VirtualAddress';
import { CapstoneLineup } from './CapstoneLineup';
import { MentorsFacilitators } from './MentorsFacilitators';
import { SponsorsPartners } from './SponsorsPartners';
import { WhatsNext } from './WhatsNext';
import { GetInvolved } from './GetInvolved';
import { ThankYou } from './ThankYou';

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
 * THE single source of presentation order. Spec rev 3, docs/02-slide-spec.md.
 *
 * Order here must match the spec order table exactly; QA verifies that as coverage check #1.
 * Nothing else in the codebase encodes slide order.
 *
 * Retired at rev 3 and never to be reused: `cohort2-by-numbers`, `cohort2-showcase-recap`,
 * `graduate-voice`, `partnership-aic`, `sponsor-impact-cta`, `close-holding`.
 */
export const slides: readonly SlideDef[] = [
  { id: 'title-close', title: 'AI Demo Day · Cohort 2', minutes: 0.5, Component: TitleClose },
  { id: 'what-you-just-saw', title: 'What you have already seen', minutes: 0.75, Component: WhatYouJustSaw },
  { id: 'why-today', title: 'Why we’re all in this room', minutes: 1.0, Component: WhyToday },
  { id: 'origin-story', title: 'Why we built this training', minutes: 0.75, Component: OriginStory },
  { id: 'journey-timeline', title: 'How we got here', minutes: 1.25, Component: JourneyTimeline },
  { id: 'community-today', title: 'The community today', minutes: 0.75, Component: CommunityToday },
  { id: 'cohort2-programme', title: 'What Cohort 2 actually did', minutes: 1.0, Component: Cohort2Programme },
  { id: 'virtual-address', title: 'A word from our Lead Organizer', minutes: 4.0, Component: VirtualAddress },
  { id: 'capstone-lineup', title: 'What you’re about to see', minutes: 1.0, Component: CapstoneLineup },
  { id: 'mentors-facilitators', title: 'The people who made it happen', minutes: 1.0, Component: MentorsFacilitators },
  { id: 'sponsors-partners', title: 'Partners and sponsors', minutes: 1.25, Component: SponsorsPartners },
  { id: 'whats-next', title: 'What happens next', minutes: 0.75, Component: WhatsNext },
  { id: 'get-involved', title: 'How to be part of it', minutes: 0.5, Component: GetInvolved },
  { id: 'thank-you', title: 'Thank you', minutes: 0.5, Component: ThankYou },
];

/** Budgeted runtime. The 12:30–12:45 slot is 15 minutes; the spec budgets exactly 15.0. */
export const totalMinutes = slides.reduce((sum, s) => sum + s.minutes, 0);

/**
 * Of the total, this much is the live virtual address rather than spoken slides — useful
 * context when judging whether the deck fits its slot.
 */
export const virtualAddressMinutes =
  slides.find((s) => s.id === 'virtual-address')?.minutes ?? 0;
