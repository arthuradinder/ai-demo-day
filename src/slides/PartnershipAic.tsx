import { Kicker } from '../components/SlideFrame';
import { FactValue } from '../components/Tbc';
import { Logo } from '../components/Logo';
import { event, logos, partnership as c } from '../content/deck';

/**
 * Slide 12 — `partnership-aic`
 *
 * Presents The AI Collective as a partner of equal standing, deliberately NOT as a
 * sponsorship tier. Two design choices enforce that:
 *
 *  1. Both organisation names render side by side at identical size, mirroring slide 1.
 *  2. The layout is a two-column standoff on the teal ground — structurally unlike the
 *     `sponsors-partners` logo grid, so no viewer can confuse the two slides.
 */
export function PartnershipAic() {
  return (
    <section className="flex h-[1080px] w-[1920px] flex-col bg-teal-soft px-[128px] py-[96px]">
      {/*
        Equal-weight standoff: neither organisation is subordinated. Both logos sit in
        identical boxes at identical maximum height (see Logo.tsx for why the neutral card
        matters when one mark has a solid background), with the name beneath each.
      */}
      {/* items-center, not a hardcoded offset: the × must sit level with the pair whether
          or not the logo cards are present, since a missing asset removes the card. */}
      <div className="flex items-center justify-center gap-[72px]">
        <Logo src={logos.host} name={event.host} />

        <span aria-hidden className="text-h1 font-light text-teal">
          ×
        </span>

        <Logo src={logos.partner} name={event.partner} subtitle={c.subhead} />
      </div>

      <div className="mt-[52px] border-t-[6px] border-teal pt-[40px]">
        <h2 className="max-w-[1560px] text-h2 font-bold text-ink">{c.headline}</h2>
        {/* Sentence first, unverified detail on its own line beneath — inline, the block
            placeholder split "Chapter —" onto a line of its own. Same fix as slide 13. */}
        <p className="mt-[24px] max-w-[1560px] text-body text-ink">{c.bodyBefore}</p>
        <div className="mt-[16px]">
          <FactValue fact={c.contribution} size="block" />
        </div>
      </div>

      <Kicker>{c.kicker}</Kicker>
    </section>
  );
}
