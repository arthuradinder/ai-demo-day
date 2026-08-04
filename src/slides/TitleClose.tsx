import { event, titleClose } from '../content/deck';

/**
 * Slide 1 — `title-close`
 *
 * Host and partner render as a matched pair at identical size and colour. This is a hard
 * brand constraint from the spec, not a styling preference: The AI Collective co-owns the
 * event's credibility and must not read as subordinate to the host anywhere in the deck.
 */
export function TitleClose() {
  return (
    <section className="flex h-[1080px] w-[1920px] flex-col justify-between bg-paper px-[128px] py-[96px]">
      {/*
        Equal-weight organisation pairing.

        The partner's qualifier sits on its own line rather than inside the name. Rendering
        "The AI Collective — Nairobi Chapter" as one 60px string overflows the 1664px
        content width and breaks mid-phrase ("...— Nairobi / Chapter"), which reads as
        careless about the partner's name. Splitting it keeps both organisation names on
        one line each at identical size — which is what the equal-weight constraint is
        actually protecting — and matches the treatment on `partnership-aic`.
      */}
      <div className="flex items-center gap-[36px]">
        <p className="text-h2 font-bold whitespace-nowrap text-ink">{event.host}</p>
        <span aria-hidden className="text-h2 font-light text-accent">
          ×
        </span>
        <p className="text-h2 font-bold whitespace-nowrap text-ink">
          {event.partner}
          <span className="block text-small font-semibold tracking-[0.14em] text-ink-soft uppercase">
            {event.partnerQualifier}
          </span>
        </p>
      </div>

      <div>
        <h1 className="text-display font-bold text-ink">{titleClose.headline}</h1>
        <p className="mt-[24px] text-h2 font-semibold text-accent">{titleClose.subhead}</p>
      </div>

      <div className="flex items-end justify-between border-t-[6px] border-rule pt-[36px]">
        <p className="text-lead font-medium text-ink-soft">{titleClose.meta}</p>
        <span aria-hidden className="h-[28px] w-[140px] bg-accent" />
      </div>
    </section>
  );
}
