import { FactValue } from './Tbc';
import type { Milestone } from '../content/types';

/**
 * The journey timeline: chronological, top to bottom, terminating on today.
 *
 * Vertical, not horizontal, and that is a legibility decision rather than a taste one.
 * Seven milestones laid out across a 1664px content width give each entry ~237px — labels
 * like "Partnership with The AI Collective — Nairobi Chapter" then wrap to six or seven
 * lines of small text, which is exactly what the design bar's "back-row legibility beats
 * density" rule exists to prevent. Stacked vertically, each label gets ~1200px on one or
 * two lines at full body size, and top-to-bottom still reads as chronological progression.
 *
 * This component deliberately does not shrink text to fit more entries. Spec slide 5 is
 * explicit that milestones which cannot render legibly are a SPEC-DEFECT to resolve by
 * dropping milestones — so overflow stays visible in review instead of being hidden.
 */
export function Timeline({ milestones }: { milestones: readonly Milestone[] }) {
  return (
    <ol className="flex flex-col">
      {milestones.map((m, i) => {
        const today = m.isToday === true;
        const isLast = i === milestones.length - 1;

        return (
          <li key={i} className="flex items-stretch gap-[40px]">
            {/* Rail: hollow node before today, filled node on today. */}
            <div className="flex w-[30px] flex-none flex-col items-center" aria-hidden>
              <span
                className={
                  today
                    ? 'mt-[10px] h-[30px] w-[30px] flex-none rounded-full bg-flame'
                    : 'mt-[14px] h-[22px] w-[22px] flex-none rounded-full border-[5px] border-blue bg-canvas'
                }
              />
              {!isLast ? <span className="w-[5px] flex-1 bg-edge" /> : null}
            </div>

            <div className={`flex flex-1 items-baseline gap-[40px] ${isLast ? '' : 'pb-[28px]'}`}>
              <p
                className={
                  today
                    ? 'w-[400px] flex-none text-h2 font-bold whitespace-nowrap text-flame'
                    : 'w-[400px] flex-none text-body font-semibold tracking-[0.04em] text-blue'
                }
              >
                <FactValue fact={m.date} />
              </p>

              <p
                className={
                  today
                    ? 'flex-1 text-h2 font-bold tracking-[0.08em] text-flame uppercase'
                    : 'flex-1 text-body font-medium text-fg'
                }
              >
                <FactValue fact={m.label} />
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
