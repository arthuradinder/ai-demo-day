import { SlideFrame, Kicker } from '../components/SlideFrame';
import { Qr } from '../components/Qr';
import { whatsNext as c } from '../content/deck';

/**
 * Slide 12 — `whats-next`
 *
 * Rev 3: Cohort 3 applications are open and the URL is real, so this leads with a scannable
 * QR rather than a date placeholder. The optional-initiative rows are gone; the closing line
 * stays because it is the one that gives the graduates a role rather than a goodbye.
 */
export function WhatsNext() {
  return (
    <SlideFrame headline={c.headline}>
      {/* Cohort 3 — the slide's primary conversion target, so it gets the QR and the card. */}
      <div className="border-l-[12px] border-flame bg-panel px-[44px] py-[36px]">
        <p className="text-h2 font-bold text-fg">{c.cohort3.label}</p>
        <p className="mt-[10px] text-body text-fg-soft">{c.cohort3.detail}</p>
        <div className="mt-[28px]">
          <Qr src={c.cohort3.qr} url={c.cohort3.url} />
        </div>
      </div>

      <div className="mt-[36px] border-l-[6px] border-edge pl-[32px]">
        <p className="text-h2 font-semibold text-fg">{c.graduates.label}</p>
        <p className="mt-[10px] text-body text-fg-soft">{c.graduates.detail}</p>
      </div>

      <Kicker>{c.kicker}</Kicker>
    </SlideFrame>
  );
}
