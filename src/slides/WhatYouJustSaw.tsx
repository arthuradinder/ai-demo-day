import { SlideFrame, Kicker } from '../components/SlideFrame';
import { FactValue } from '../components/Tbc';
import { whatYouJustSaw as c } from '../content/deck';

/**
 * Slide 2 — `what-you-just-saw`
 *
 * One continuous statement, no bullets. Opens the closing deck on the graduates' moment
 * of pride rather than on housekeeping.
 */
export function WhatYouJustSaw() {
  return (
    <SlideFrame headline={c.headline}>
      <p className="max-w-[1600px] text-lead text-ink">
        {c.bodyBefore} <FactValue fact={c.count} /> {c.bodyAfter}
      </p>

      <Kicker>
        <FactValue fact={c.kickerWeeks} /> {c.kickerAfter}
      </Kicker>
    </SlideFrame>
  );
}
