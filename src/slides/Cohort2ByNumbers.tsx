import { SlideFrame, Footnote } from '../components/SlideFrame';
import { StatRow } from '../components/StatRow';
import { FactValue } from '../components/Tbc';
import { cohort2ByNumbers as c, completionRate } from '../content/deck';

/**
 * Slide 8 — `cohort2-by-numbers`
 *
 * Uses the same `StatRow` as `community-today` so the two slides read as a matched pair.
 *
 * The completion rate in the footer is computed by `completionRate()` from enrolled and
 * graduated — never stored. Two independent fields would drift, and the drift would be
 * discovered on stage.
 */
export function Cohort2ByNumbers() {
  return (
    <SlideFrame headline={c.headline}>
      {/* Matches `community-today` exactly so the two slides stay a visual pair. */}
      <div className="flex flex-1 items-center">
        <StatRow stats={c.stats} />
      </div>

      <Footnote>
        <FactValue fact={completionRate()} /> {c.footerAfter}
      </Footnote>
    </SlideFrame>
  );
}
