import { SlideFrame } from '../components/SlideFrame';
import { Logo } from '../components/Logo';
import { LogoGrid } from '../components/LogoGrid';
import { event, logos, logoScale, sponsors as c } from '../content/deck';

/**
 * Slide 11 — `sponsors-partners`, with the retired `partnership-aic` merged in.
 *
 * Two tiers on one slide:
 *
 *  - **Main partners and sponsors** — the two organisations that ran the cohort, at equal
 *    weight with their marks. Equal weight remains a hard constraint: The AI Collective
 *    co-owns the event's credibility and must never read as subordinate to the host.
 *  - **With support from** — the supporting sponsors, in a uniform grid beneath.
 *
 * The rev 2 arrangement kept a separate partner band so the Nairobi Business Angel Network
 * would not sit inside the sponsor grid. That is superseded: the user listed NBAN among the
 * sponsors, which is their call to make about their own relationships.
 */
export function SponsorsPartners() {
  return (
    <SlideFrame headline={c.headline} headlineSize="h2">
      <p className="text-small font-semibold tracking-[0.18em] text-blue uppercase">
        {c.mainLabel}
      </p>

      <div className="mt-[24px] flex items-center gap-[64px]">
        <Logo src={logos.host} name={event.host} opticalScale={logoScale.host} compact />
        <span aria-hidden className="h-[88px] w-[2px] flex-none bg-edge" />
        <Logo
          src={logos.partner}
          name={event.partner}
          subtitle={event.partnerQualifier}
          opticalScale={logoScale.partner}
          compact
        />
      </div>

      <p className="mt-[40px] text-small font-semibold tracking-[0.18em] text-fg-soft uppercase">
        {c.sponsorsLabel}
      </p>

      <div className="mt-[20px]">
        <LogoGrid sponsors={c.list} pendingSlots={c.remainingSlots} pendingHint={c.remainingHint} />
      </div>

      <p className="mt-auto pt-[28px] text-lead font-bold text-flame-bright">{c.footer}</p>
    </SlideFrame>
  );
}
