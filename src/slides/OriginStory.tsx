import { SlideFrame, Kicker } from '../components/SlideFrame';
import { FactValue } from '../components/Tbc';
import { originStory as c } from '../content/deck';

/**
 * Slide 4 — `origin-story`
 *
 * Matched pair with `what-you-just-saw`: same text-forward treatment, so the deck reads
 * "here is now" then "here is then". No statistics, logos, or imagery — the humility is
 * the point, because it makes the invitation on slide 16 credible.
 */
export function OriginStory() {
  return (
    <SlideFrame headline={c.headline}>
      <p className="max-w-[1600px] text-lead text-ink">
        {c.bodyBefore} <FactValue fact={c.when} />, <FactValue fact={c.who} /> {c.bodyAfter}
      </p>

      <Kicker>{c.kicker}</Kicker>
    </SlideFrame>
  );
}
