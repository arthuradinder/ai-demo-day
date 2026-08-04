import { FactValue } from '../components/Tbc';
import { sponsorImpact as c } from '../content/deck';

/**
 * Slide 14 — `sponsor-impact-cta`
 *
 * The ask, separated from the thanks on slide 13 so gratitude does not read as
 * transactional. Exactly one ask and one contact route — no competing calls to action.
 *
 * Contact detail is set large because an interested sponsor will photograph it from where
 * they are sitting rather than walk to the screen.
 *
 * Impact figures reference the same content values as slides 6 and 8; nothing is retyped.
 */
export function SponsorImpactCta() {
  return (
    <section className="flex h-[1080px] w-[1920px] flex-col justify-center bg-accent-soft px-[128px] py-[96px]">
      <h2 className="text-h1 font-bold text-ink">{c.headline}</h2>

      <p className="mt-[40px] max-w-[1620px] text-lead text-ink">
        <FactValue fact={c.supportLabel} /> {c.impactBecame}{' '}
        <FactValue fact={c.trained} /> people trained, <FactValue fact={c.shipped} />{' '}
        automations shipped, and a cohort that is now <FactValue fact={c.cohortSize} />{' '}
        people strong.
      </p>

      <p className="mt-[56px] max-w-[1620px] border-l-[10px] border-accent pl-[36px] text-h2 font-bold text-ink">
        {c.ask}
      </p>

      <div className="mt-[56px] flex items-baseline gap-[24px]">
        <span className="text-body font-semibold tracking-[0.14em] text-ink-soft uppercase">
          {c.contactLabel}
        </span>
        {/* accent-deep, not accent: 6.47:1 on this ground rather than 4.51:1. */}
        <span className="text-h2 font-bold text-accent-deep">
          <FactValue fact={c.contact} size="block" />
        </span>
      </div>
    </section>
  );
}
