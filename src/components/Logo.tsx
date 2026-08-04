import { useState } from 'react';

/**
 * An organisation mark with its name beneath, for the partner standoff on slide 12.
 *
 * Two things this handles that a bare <img> does not:
 *
 * 1. **Equal treatment across unequal marks.** The supplied logos differ in shape — one is
 *    a square glyph, one a wide wordmark — so matching heights alone would let the wordmark
 *    dominate. Every mark gets the same box and the same maximum height on both axes, with
 *    `object-contain` fitting it inside. That is what the equal-weight constraint protects.
 *
 * 2. **Non-transparent source art.** At least one supplied mark has a solid white
 *    background. Placed directly on the tinted slide ground it would read as a white patch
 *    while the other sat flush, making one partner look privileged. Both sit on identical
 *    neutral cards, which normalises the difference.
 *
 * When the asset file is absent the card is omitted entirely and the name carries the slot
 * on its own. An earlier version rendered the name inside a fallback card *and* as the
 * caption, which showed the organisation twice and looked like a bug. Never a broken-image
 * icon either way: a partner's name set as type is presentable, a broken icon projected
 * next to their representative is not.
 */
export function Logo({
  src,
  name,
  subtitle,
}: {
  src: string | null;
  name: string;
  subtitle?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hasImage = src !== null && !failed;

  return (
    <div className="flex flex-col items-center gap-[20px]">
      {hasImage ? (
        <div className="flex h-[188px] w-[420px] flex-none items-center justify-center rounded-[16px] bg-white px-[24px]">
          <img
            src={src}
            alt=""
            onError={() => setFailed(true)}
            className="max-h-[132px] max-w-[352px] object-contain"
          />
        </div>
      ) : null}

      <p className="text-center text-h2 font-bold text-ink">
        {name}
        {subtitle ? (
          <span className="block text-small font-semibold tracking-[0.14em] text-teal uppercase">
            {subtitle}
          </span>
        ) : null}
      </p>
    </div>
  );
}
