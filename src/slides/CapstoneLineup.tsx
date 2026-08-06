import { SlideFrame, Kicker } from '../components/SlideFrame';
import { FactValue } from '../components/Tbc';
import { capstoneLineup as c } from '../content/deck';

/**
 * Slide 9 — `capstone-lineup`
 *
 * Replaces the retired `cohort2-showcase-recap`. That slide was a roll of honour for work the
 * room had already watched; at 12:30 nothing has been presented yet, so this slide sets up the
 * hour that follows instead. It is the handoff from the welcome to the main event.
 *
 * Group count and minutes-per-group each come from a single content value — brief rev 2's run
 * of show says six teams while the rev 3 direction says three, and that conflict is recorded
 * in the spec. Correcting it is one edit in `deck.ts`, not a layout change.
 */
export function CapstoneLineup() {
  return (
    <SlideFrame headline={c.headline}>
      <div className="flex items-start gap-[96px]">
        <p className="text-lead font-medium text-fg">
          <span className="mr-[14px] text-figure font-bold text-blue align-middle">
            <FactValue fact={c.groups} />
          </span>
          {c.introAfter}
        </p>

        <p className="text-lead font-medium text-fg">
          <span className="mr-[14px] text-figure font-bold text-flame align-middle">
            <FactValue fact={c.minutesEach} />
          </span>
          {c.detail}
        </p>
      </div>

      <Kicker>{c.kicker}</Kicker>
    </SlideFrame>
  );
}
