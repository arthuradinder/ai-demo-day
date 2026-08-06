import { SlideFrame } from '../components/SlideFrame';
import { Qr } from '../components/Qr';
import { getInvolved as c } from '../content/deck';

/**
 * Slide 13 — `get-involved`
 *
 * Rev 3: two routes, not four. Applying has its own QR; mentoring, sponsoring and joining all
 * converge on the community's LinkedIn page, which is how the user wants people to reach them.
 *
 * Collapsing three destinations into one entry is deliberate. Three rows pointing at the same
 * URL reads as padding and buries the one real distinction on the slide — build with us, or
 * talk to us.
 *
 * Every QR sits beside its written URL, never replacing it: a projected code is unscannable
 * from the back of a lit room and unscannable at an angle.
 */
export function GetInvolved() {
  return (
    <SlideFrame headline={c.headline}>
      {/* Codes at full size, not `sm`: the slide has the room, and a bigger code is a code
          that scans from further back. This is the deck's highest-conversion slide. */}
      <div className="grid grid-cols-2 gap-x-[80px]">
        <div className="border-t-[6px] border-flame pt-[28px]">
          <p className="text-body font-semibold text-blue">{c.build.question}</p>
          <p className="mt-[10px] text-h2 font-bold text-fg">{c.build.action}</p>
          <p className="mt-[8px] text-body text-fg-soft">{c.build.detail}</p>
          <div className="mt-[32px]">
            <Qr src={c.build.qr} url={c.build.url} />
          </div>
        </div>

        <div className="border-t-[6px] border-edge pt-[28px]">
          <p className="text-body font-semibold text-blue">{c.reach.question}</p>
          <p className="mt-[10px] text-h2 font-bold text-fg">{c.reach.action}</p>
          <div className="mt-[32px]">
            <Qr src={c.reach.qr} url={c.reach.url} label={c.reach.label} />
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
