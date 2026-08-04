import { SlideFrame, Footnote } from '../components/SlideFrame';
import { FactValue } from '../components/Tbc';
import { getInvolved as c } from '../content/deck';

/**
 * Slide 16 — `get-involved`
 *
 * The deck's primary call to action: four parallel routes at equal weight, each pairing an
 * audience question with a single action.
 *
 * Highest-stakes slide for legibility in the whole deck — every link must be readable and
 * photographable from the back row, so link text is set at h2 rather than body size.
 *
 * If a QR code is ever added here it must sit alongside the written URL, never replace it:
 * a projected QR is unusable from the back row and unusable at an angle.
 */
export function GetInvolved() {
  return (
    <SlideFrame headline={c.headline}>
      <div className="grid grid-cols-2 gap-x-[64px] gap-y-[40px]">
        {c.routes.map((r) => (
          <div key={r.question} className="border-t-[6px] border-rule pt-[26px]">
            <p className="text-body font-semibold text-teal">{r.question}</p>
            <p className="mt-[10px] text-h2 font-bold text-ink">{r.action}</p>
            <p className="mt-[14px] text-body font-semibold break-words text-accent">
              <FactValue fact={r.target} />
            </p>
          </div>
        ))}
      </div>

      <Footnote>{c.footer}</Footnote>
    </SlideFrame>
  );
}
