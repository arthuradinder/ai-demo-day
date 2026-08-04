import { SlideFrame } from '../components/SlideFrame';
import { LogoGrid } from '../components/LogoGrid';
import { FactValue } from '../components/Tbc';
import { sponsors as c } from '../content/deck';

/**
 * Slide 13 — `sponsors-partners`
 *
 * The recognition sponsors came for. Two hard rules from the spec are enforced here:
 *
 *  1. No sponsor name is invented anywhere, including as sample or filler data. The grid
 *     renders explicit empty slots until real names arrive.
 *  2. The "free for every participant" claim is a placeholder, not a default. It must be
 *     verified before it is projected, and it cannot be stated by accident.
 */
export function SponsorsPartners() {
  // headlineSize h2: at h1 this headline wraps to two lines and costs the slide ~120px it
  // does not have, now that the partner band shares the space.
  return (
    <SlideFrame headline={c.headline} headlineSize="h2">
      {/*
        The unverified claim sits on its own line, above the sentence it belongs to.
        Inline, the block placeholder forced the following text to wrap around it and the
        sentence became unreadable. Stacking also makes the thing that needs checking the
        first thing a reviewer sees.
      */}
      <div className="mb-[28px] max-w-[1600px]">
        <FactValue fact={c.participantCostClaim} size="block" />
        <p className="mt-[12px] text-body font-medium text-teal">{c.introAfter}</p>
      </div>

      <LogoGrid sponsors={c.list} />

      {/*
        Partners band — spec rev 2 acceptance #5. Deliberately OUTSIDE the sponsor grid and
        separately labelled, because these organisations are partners rather than sponsors
        and nothing here may imply they paid for the cohort. The rule above it and the
        distinct label are what keep the "paid for it" sentence scoped to the grid alone.
      */}
      {c.partners.status === 'confirmed' && c.partners.items.length > 0 ? (
        <div className="mt-[28px] border-t-[6px] border-teal pt-[20px]">
          <p className="text-small font-semibold tracking-[0.16em] text-teal uppercase">
            {c.partnersBandLabel}
          </p>
          <div className="mt-[12px] flex flex-wrap items-center gap-x-[56px] gap-y-[18px]">
            {c.partners.items.map((p) => (
              <p key={p.name} className="text-h2 font-bold text-ink">
                {p.name}
              </p>
            ))}
          </div>
        </div>
      ) : null}

      {/* mt-auto alone leaves this flush against the partner band when space runs out;
          the explicit minimum keeps the thanks visually its own beat. */}
      <p className="mt-auto pt-[32px] text-lead font-bold text-accent">{c.footer}</p>
    </SlideFrame>
  );
}
