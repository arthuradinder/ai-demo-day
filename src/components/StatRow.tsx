import { FactFigure } from './Tbc';
import type { Stat } from '../content/types';

/**
 * A row of large figures with short labels, scannable in under three seconds.
 *
 * Used by both `community-today` and `cohort2-by-numbers` with identical treatment, so the
 * two slides read as a matched pair — one community-wide, one cohort-specific.
 * Spec slide 8 acceptance #4 depends on this component being shared rather than duplicated.
 */
export function StatRow({ stats }: { stats: readonly Stat[] }) {
  return (
    // w-full is load-bearing: inside the centring wrapper the slides use, a bare flex row
    // shrinks to content width and the columns bunch up on the left.
    <div className="flex w-full items-stretch gap-[40px]">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-1 flex-col items-start gap-[20px] border-t-[6px] border-edge pt-[32px]"
        >
          <FactFigure fact={stat.figure} />
          <p className="text-body font-medium text-fg-soft">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
