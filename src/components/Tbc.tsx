import type { Fact } from '../content/types';

/**
 * Placeholder rendering.
 *
 * The whole point of this component is that an unconfirmed fact can never be mistaken for
 * a confirmed one. Amber ground, dashed edge, and an explicit "TBC" marker — deliberately
 * loud, because the failure mode it prevents is a guessed figure being projected to
 * sponsors sitting in the room.
 *
 * Contrast: #8A5A00 on #FBF1DC measures 5.28:1 — verified by scripts/check-contrast.mjs,
 * not estimated.
 */
export function Tbc({ hint, size = 'inline' }: { hint: string; size?: 'inline' | 'block' }) {
  if (size === 'block') {
    return (
      <span
        role="mark"
        aria-label={`To be confirmed: ${hint}`}
        className="inline-flex flex-col items-start gap-[6px] rounded-[10px] border-[3px] border-dashed border-tbc-edge bg-tbc-bg px-[20px] py-[12px] align-middle text-tbc"
      >
        <span className="text-micro font-bold tracking-[0.14em] uppercase">To be confirmed</span>
        <span className="text-micro font-medium">{hint}</span>
      </span>
    );
  }

  return (
    <span
      role="mark"
      aria-label={`To be confirmed: ${hint}`}
      className="mx-[4px] inline-flex items-baseline gap-[10px] rounded-[8px] border-[2px] border-dashed border-tbc-edge bg-tbc-bg px-[14px] py-[2px] align-baseline text-tbc"
    >
      <span className="text-micro font-bold tracking-[0.12em] uppercase">TBC</span>
      <span className="text-micro font-medium italic">{hint}</span>
    </span>
  );
}

/** Renders a fact's value when confirmed, or an unmistakable placeholder when not. */
export function FactValue<T extends string | number>({
  fact,
  size = 'inline',
}: {
  fact: Fact<T>;
  size?: 'inline' | 'block';
}) {
  if (fact.status === 'confirmed') return <>{fact.value}</>;
  return <Tbc hint={fact.hint} size={size} />;
}

/**
 * A statistic figure. Placeholder figures render as a dashed well at the same footprint
 * as a real figure, so the layout can be reviewed at realistic density now.
 */
export function FactFigure({ fact }: { fact: Fact<string | number> }) {
  if (fact.status === 'confirmed') {
    return <span className="text-figure font-bold text-accent">{fact.value}</span>;
  }
  return (
    <span
      role="mark"
      aria-label={`To be confirmed: ${fact.hint}`}
      title={fact.hint}
      className="flex h-[108px] min-w-[168px] items-center justify-center rounded-[12px] border-[3px] border-dashed border-tbc-edge bg-tbc-bg px-[16px] text-tbc"
    >
      <span className="text-micro font-bold tracking-[0.14em] uppercase">TBC</span>
    </span>
  );
}
