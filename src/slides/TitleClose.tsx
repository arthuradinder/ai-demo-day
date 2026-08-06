import { Logo } from '../components/Logo';
import { event, logos, logoScale, titleClose } from '../content/deck';

/**
 * Slide 1 — `title-close`
 *
 * Deliberately built as a sibling of the promo poster rather than a generic title slide:
 * the gradient "AI" above a heavy white "DEMO DAY", the three-part SHOWCASE / CONNECT /
 * BUILD THE FUTURE tagline, and the "INNOVATE LOCALLY. IMPACT GLOBALLY." footer are all
 * lifted from it. Anyone who saw the poster should recognise this instantly.
 *
 * Host and partner render as a matched pair at identical size. This is a hard brand
 * constraint, not a styling preference: The AI Collective co-owns the event's credibility
 * and must not read as subordinate to the host anywhere in the deck.
 */
export function TitleClose() {
  return (
    <section className="canvas-glow flex h-[1080px] w-[1920px] flex-col justify-between bg-canvas px-[128px] py-[80px]">
      {/* Equal-weight organisation pairing, echoing the poster's header. */}
      <div className="flex items-center gap-[56px]">
        <Logo src={logos.host} name={event.host} opticalScale={logoScale.host} compact />
        <span aria-hidden className="h-[96px] w-[2px] flex-none bg-edge" />
        <Logo
          src={logos.partner}
          name={event.partner}
          subtitle={event.partnerQualifier}
          opticalScale={logoScale.partner}
          compact
        />
      </div>

      <div className="flex items-end justify-between">
        <div>
          {/*
            Gradient "AI" — the poster's signature mark. inline-block is load-bearing: as a
            block element the gradient spans the full 1664px content width while "AI"
            occupies only the first ~8% of it, so the glyphs sample pure blue and the
            blue→orange transition never appears. Sizing the box to the text fixes it.
          */}
          <p
            aria-hidden
            className="rule-gradient inline-block bg-clip-text text-display font-bold text-transparent"
          >
            {titleClose.headlineAccent}
          </p>
          <h1 className="text-display font-bold text-fg">
            <span className="sr-only">{titleClose.headlineAccent} </span>
            {titleClose.headline}
          </h1>

          <span aria-hidden className="rule-gradient mt-[28px] block h-[8px] w-[420px]" />

          <p className="mt-[28px] text-h2 font-bold">
            <span className="text-blue">{titleClose.tagline[0]} </span>
            <span className="text-flame-bright">{titleClose.tagline[1]}</span>
            <span className="block text-fg">{titleClose.tagline[2]}</span>
          </p>
        </div>

        <div className="pb-[8px] text-right">
          <p className="text-lead font-semibold text-fg">{titleClose.subhead}</p>
          <p className="mt-[12px] text-body text-fg-soft">{titleClose.meta}</p>
        </div>
      </div>

      <p className="text-small font-semibold tracking-[0.28em] text-fg-soft uppercase">
        {titleClose.footerTagline}
      </p>
    </section>
  );
}
