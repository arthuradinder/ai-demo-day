import type { ReactNode } from 'react';

/**
 * Standard slide chrome: paper ground, consistent margins, optional eyebrow and headline.
 *
 * Side margin is 128px of a 1920px stage, leaving 1664px of content width. Generous by
 * design — back-row legibility beats density, and a tighter margin invites cramming.
 */
export function SlideFrame({
  eyebrow,
  headline,
  children,
  tone = 'canvas',
  align = 'top',
  headlineSize = 'h1',
}: {
  eyebrow?: string;
  headline?: string;
  children?: ReactNode;
  tone?: 'canvas' | 'alt' | 'panel';
  align?: 'top' | 'center';
  /**
   * Drop to `h2` on content-dense slides whose headline would otherwise wrap to two lines
   * at h1 and eat ~120px the slide needs. Used by `sponsors-partners`.
   */
  headlineSize?: 'h1' | 'h2';
}) {
  const ground =
    tone === 'panel' ? 'bg-panel' : tone === 'alt' ? 'bg-canvas-alt' : 'bg-canvas';

  return (
    <section
      className={`canvas-glow flex h-[1080px] w-[1920px] flex-col ${ground} px-[128px] py-[96px] ${
        align === 'center' ? 'justify-center' : ''
      }`}
    >
      {eyebrow ? (
        <p className="mb-[28px] text-small font-semibold tracking-[0.16em] text-fg-soft uppercase">
          {eyebrow}
        </p>
      ) : null}
      {headline ? (
        <div className="mb-[44px]">
          <h2
            className={`max-w-[1560px] font-bold text-fg ${
              headlineSize === 'h2' ? 'text-h2' : 'text-h1'
            }`}
          >
            {headline}
          </h2>
          {/* The poster's blue→orange rule, reused as the headline underline so slides read
              as siblings of the promo art rather than as an unrelated deck. */}
          <span aria-hidden className="rule-gradient mt-[22px] block h-[7px] w-[280px]" />
        </div>
      ) : null}
      {children}
    </section>
  );
}

/** The emphasised closing line used on several slides. Visually distinct from body copy. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mt-auto flex items-start gap-[24px] text-lead font-semibold text-flame-bright">
      <span aria-hidden className="rule-gradient mt-[18px] h-[6px] w-[64px] flex-none" />
      <span className="max-w-[1440px]">{children}</span>
    </p>
  );
}

/** A quiet aside, subordinate to whatever sits above it. */
export function Footnote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-auto max-w-[1440px] text-body text-fg-soft italic">{children}</p>
  );
}
