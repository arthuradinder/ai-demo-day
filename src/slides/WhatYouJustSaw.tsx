import { SlideFrame } from '../components/SlideFrame';
import { whatYouJustSaw as c } from '../content/deck';

/**
 * Slide 2 — `what-you-just-saw`
 *
 * One continuous statement, no bullets, no kicker.
 *
 * Recast at rev 3. The deck runs at 12:30, so it cannot open on presentations that have not
 * happened. It opens instead on the two hours the room has already spent at the workstations,
 * which is what "what you just saw" honestly means at this hour.
 */
export function WhatYouJustSaw() {
  return (
    <SlideFrame headline={c.headline} align="center">
      <p className="max-w-[1600px] text-lead text-fg">{c.body}</p>
    </SlideFrame>
  );
}
