import { SlideFrame, Footnote } from '../components/SlideFrame';
import { NameGrid } from '../components/NameGrid';
import { mentors as c } from '../content/deck';

/**
 * Slide 11 — `mentors-facilitators`
 *
 * The deck's obligation to people who taught unpaid. Names render at a genuinely readable
 * size and are never shrunk to make a longer list fit — if the supplied list overflows,
 * the spec's remedy is to split the slide, which surfaces as a visible defect here rather
 * than as small text nobody in the back row can read.
 */
export function MentorsFacilitators() {
  return (
    <SlideFrame headline={c.headline}>
      <p className="mb-[44px] max-w-[1560px] text-lead font-medium text-blue">{c.intro}</p>

      <NameGrid entries={c.people} columns={3} />

      <Footnote>{c.footer}</Footnote>
    </SlideFrame>
  );
}
