import { SlideFrame } from '../components/SlideFrame';
import { whyToday as c } from '../content/deck';

/**
 * Slide 3 — `why-today`
 *
 * Four audience groups at equal visual weight — parallel, not sequential, so no numbering
 * and no ordering cues. Every segment in the room gets an explicit reason it is here.
 */
export function WhyToday() {
  return (
    <SlideFrame headline={c.headline}>
      <p className="mb-[52px] max-w-[1560px] text-lead font-medium text-blue">{c.intro}</p>

      <div className="grid grid-cols-2 gap-x-[64px] gap-y-[44px]">
        {c.groups.map((g) => (
          <div key={g.label} className="border-t-[6px] border-edge pt-[26px]">
            <p className="text-h2 font-bold text-flame">{g.label}</p>
            <p className="mt-[14px] text-body text-fg">{g.body}</p>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}
