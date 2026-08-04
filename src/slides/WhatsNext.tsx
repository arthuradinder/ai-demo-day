import { SlideFrame, Kicker } from '../components/SlideFrame';
import { FactValue } from '../components/Tbc';
import { whatsNext as c } from '../content/deck';

/**
 * Slide 15 — `whats-next`
 *
 * Forward-looking, deliberately unlike the backward-looking `journey-timeline`. Cohort 3
 * is the most prominent item because it is the primary conversion target.
 *
 * `optionalInitiative` is nullable in content: setting it to `null` removes the entry with
 * no empty slot left behind.
 */
export function WhatsNext() {
  return (
    <SlideFrame headline={c.headline}>
      {/* Cohort 3 — most prominent item on the slide. */}
      <div className="mb-[40px] border-l-[12px] border-accent bg-accent-soft px-[44px] py-[36px]">
        <p className="text-h2 font-bold text-ink">{c.cohort3.label}</p>
        <p className="mt-[14px] text-body text-ink">
          applications open <FactValue fact={c.cohort3.applicationsOpen} />, starting{' '}
          <FactValue fact={c.cohort3.startDate} />
        </p>
      </div>

      <ul className="flex flex-col gap-[28px]">
        <li className="border-l-[6px] border-rule pl-[32px]">
          <p className="text-h2 font-semibold text-ink">{c.meetups.label}</p>
          <p className="mt-[10px] text-body text-ink-soft">
            <FactValue fact={c.meetups.detail} />
          </p>
        </li>

        <li className="border-l-[6px] border-rule pl-[32px]">
          <p className="text-h2 font-semibold text-ink">{c.graduates.label}</p>
          <p className="mt-[10px] text-body text-ink-soft">{c.graduates.detail}</p>
        </li>

        {c.optionalInitiative ? (
          <li className="border-l-[6px] border-rule pl-[32px]">
            <p className="text-h2 font-semibold text-ink">
              <FactValue fact={c.optionalInitiative.label} />
            </p>
            <p className="mt-[10px] text-body text-ink-soft">
              <FactValue fact={c.optionalInitiative.detail} />
            </p>
          </li>
        ) : null}
      </ul>

      <Kicker>{c.kicker}</Kicker>
    </SlideFrame>
  );
}
