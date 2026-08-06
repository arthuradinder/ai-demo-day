import { Logo } from '../components/Logo';
import { event, logos, logoScale, virtualAddress as c } from '../content/deck';

/**
 * Slide 8 — `virtual-address`
 *
 * A holding frame for the live virtual speech, which is 4.0 of the deck's 15.0 minutes.
 *
 * Deliberately the emptiest slide in the deck. The speaker is on a video call, not on the
 * slide, so anything more than "who is talking" competes with them for the room's attention
 * for four solid minutes. No body copy, no bullets, nothing that invites reading.
 */
export function VirtualAddress() {
  return (
    <section className="canvas-glow flex h-[1080px] w-[1920px] flex-col justify-center bg-canvas-alt px-[128px] py-[96px]">
      <p className="text-small font-semibold tracking-[0.2em] text-blue uppercase">
        {c.eyebrow}
      </p>

      <h2 className="mt-[32px] max-w-[1560px] text-h1 font-bold text-fg">{c.headline}</h2>

      <span aria-hidden className="rule-gradient mt-[36px] block h-[8px] w-[320px]" />

      <div className="mt-[56px] flex items-center gap-[48px]">
        <Logo src={logos.host} name={event.host} opticalScale={logoScale.host} compact />
        <span aria-hidden className="h-[80px] w-[2px] flex-none bg-edge" />
        <div>
          <p className="text-h2 font-bold text-fg">{c.role}</p>
          <p className="mt-[8px] text-body text-fg-soft">{c.note}</p>
        </div>
      </div>
    </section>
  );
}
