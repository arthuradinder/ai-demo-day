import { useState } from 'react';

/**
 * An organisation mark with its name, in one of two lockups taken from the poster.
 *
 * - default (`compact={false}`) — mark above, name centred beneath. Used for the partner
 *   standoff on slide 12, where the two organisations face each other as equals.
 * - `compact` — mark left, name right, mirroring the poster's header bar. Used on the title
 *   and holding slides where the pairing is a credit line rather than the subject.
 *
 * Three things this handles that a bare <img> does not:
 *
 * 1. **Equal treatment across unequal marks.** Every mark gets the same box and the same
 *    maximum height on both axes, with `object-contain` fitting it inside. That is what the
 *    equal-weight constraint protects.
 *
 * 2. **Artwork that disagrees about its own margins.** See `opticalScale` below.
 *
 * 3. **Missing files.** The card is omitted and the name carries the slot alone — never a
 *    broken-image icon. A partner's name set as type is presentable; a broken icon
 *    projected next to their representative is not.
 *
 * No white plate behind either mark: the poster sets both straight onto the dark ground and
 * they hold up there, and a white plate on a deck this dark reads as leftover packaging.
 */
export function Logo({
  src,
  name,
  subtitle,
  opticalScale = 1,
  compact = false,
}: {
  src: string | null;
  name: string;
  subtitle?: string;
  /**
   * Per-mark optical correction. `object-contain` fits the image *canvas*, not the artwork
   * inside it — so a mark supplied with generous transparent padding renders far smaller
   * than one drawn edge to edge, even though both sit in identical boxes. Equal boxes are
   * not equal weight when the source art disagrees about its own margins.
   *
   * Scaling up inside an `overflow-hidden` box clips that dead padding, which is a CSS-only
   * equivalent of trimming the file. Tune per logo in `deck.ts → logoScale`; 1 means the
   * artwork already fills its canvas.
   */
  opticalScale?: number;
  compact?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const hasImage = src !== null && !failed;

  const box = compact ? 'h-[104px] w-[240px]' : 'h-[188px] w-[420px]';
  const cap = compact ? 'max-h-[80px] max-w-[200px]' : 'max-h-[132px] max-w-[352px]';

  const mark = hasImage ? (
    // The box exists purely to clip the optical-scale overflow.
    <div className={`flex ${box} flex-none items-center justify-center overflow-hidden`}>
      <img
        src={src}
        alt=""
        onError={() => setFailed(true)}
        style={opticalScale === 1 ? undefined : { transform: `scale(${opticalScale})` }}
        className={`${cap} object-contain`}
      />
    </div>
  ) : null;

  const label = (
    <p className={`${compact ? 'text-left' : 'text-center'} font-bold text-fg`}>
      <span className={compact ? 'text-small' : 'text-h2'}>{name}</span>
      {subtitle ? (
        <span
          className={`block font-semibold tracking-[0.14em] text-blue uppercase ${
            compact ? 'text-micro' : 'text-small'
          }`}
        >
          {subtitle}
        </span>
      ) : null}
    </p>
  );

  if (compact) {
    return (
      <div className="flex items-center gap-[18px]">
        {mark}
        {label}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-[20px]">
      {mark}
      {label}
    </div>
  );
}
