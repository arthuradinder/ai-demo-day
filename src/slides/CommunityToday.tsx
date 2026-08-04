import { SlideFrame, Footnote } from '../components/SlideFrame';
import { StatRow } from '../components/StatRow';
import { FactValue } from '../components/Tbc';
import { communityToday as c } from '../content/deck';

/**
 * Slide 6 — `community-today`
 *
 * Community-wide scale. The standalone impact-numbers slide was folded in here per the
 * brief — three separate statistics slides in 27 minutes reads as padding.
 *
 * The footer's founding year is the same content value as `origin-story`, not retyped.
 */
export function CommunityToday() {
  return (
    <SlideFrame headline={c.headline}>
      {/* flex-1 centres the figures in the space between headline and footnote instead of
          stranding them at the top with a void beneath. */}
      <div className="flex flex-1 items-center">
        <StatRow stats={c.stats} />
      </div>

      <Footnote>
        {c.footerBefore} <FactValue fact={c.footerYear} />
        {c.footerAfter}
      </Footnote>
    </SlideFrame>
  );
}
