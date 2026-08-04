import { SlideFrame } from '../components/SlideFrame';
import { ProjectGrid } from '../components/NameGrid';
import { FactValue } from '../components/Tbc';
import { showcaseRecap as c } from '../content/deck';

/**
 * Slide 9 — `cohort2-showcase-recap`
 *
 * A roll of honour, not a catalogue. Compressed to a single slide on purpose: the room
 * watched these projects demo live an hour earlier, so re-explaining them would waste the
 * minutes the call to action needs.
 *
 * No project is visually larger than another — hard constraint from the spec.
 */
export function Cohort2ShowcaseRecap() {
  return (
    <SlideFrame headline={c.headline}>
      <p className="mb-[44px] text-lead font-medium text-teal">
        <FactValue fact={c.subheadShipped} /> automations, built by{' '}
        <FactValue fact={c.subheadPeople} /> people, in <FactValue fact={c.subheadWeeks} />{' '}
        weeks.
      </p>

      <ProjectGrid projects={c.projects} />
    </SlideFrame>
  );
}
