import { Tbc } from './Tbc';
import type { Fact } from '../content/types';

/**
 * A QR code with its URL always written out beside or beneath it.
 *
 * The written URL is not optional. A projected QR is unscannable from the back of a lit room
 * and unscannable at an angle, so anyone beyond the first few rows needs the text — the code
 * is a convenience for the people close enough to use it, not a replacement for the link.
 *
 * The white plate is deliberate even on a dark deck: QR scanning depends on the quiet zone
 * and on high local contrast, and a code floated on a dark ground with a dark module colour
 * is a code that does not scan.
 */
export function Qr({
  src,
  url,
  label,
  size = 'lg',
}: {
  src: string;
  /**
   * The real destination. Takes a `Fact` rather than a bare string so a URL that reverts to a
   * placeholder degrades honestly: the code is withheld (an unscannable or wrong QR is worse
   * than none) and the placeholder marker shows instead.
   */
  url: Fact<string>;
  /** Optional shorter display form; falls back to the raw URL. */
  label?: Fact<string>;
  size?: 'lg' | 'sm';
}) {
  const box = size === 'lg' ? 'h-[260px] w-[260px]' : 'h-[188px] w-[188px]';

  if (url.status === 'placeholder') {
    return (
      <div className="flex items-center gap-[28px]">
        <div
          className={`${box} flex flex-none items-center justify-center rounded-[12px] border-[3px] border-dashed border-tbc-edge bg-tbc-bg`}
        >
          <span className="text-micro font-bold tracking-[0.14em] text-tbc uppercase">
            QR TBC
          </span>
        </div>
        <Tbc hint={url.hint} size="block" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[28px]">
      <div className={`${box} flex-none rounded-[12px] bg-white p-[12px]`}>
        <img src={src} alt={`QR code linking to ${url.value}`} className="h-full w-full" />
      </div>
      <p className="max-w-[620px] text-body font-semibold break-all text-blue">
        {label !== undefined && label.status === 'confirmed' ? label.value : url.value}
      </p>
    </div>
  );
}
