import { SlideFrame } from '../components/SlideFrame';
import { Timeline } from '../components/Timeline';
import { journey as c } from '../content/deck';

/**
 * Slide 5 — `journey-timeline`
 *
 * Shows momentum rather than history. The upward trajectory is what makes prospective
 * members believe Cohort 3 will happen and sponsors believe renewal is worth it.
 */
export function JourneyTimeline() {
  return (
    <SlideFrame headline={c.headline} align="center">
      <Timeline milestones={c.milestones} />
    </SlideFrame>
  );
}
