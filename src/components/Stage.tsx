import { useEffect, useState, type ReactNode } from 'react';

const STAGE_W = 1920;
const STAGE_H = 1080;

/**
 * A fixed 1920x1080 stage, uniformly scaled to fit whatever it is projected onto.
 *
 * Every slide is laid out in absolute pixels against this stage, which is what lets the
 * type scale in theme.css be stated in real projector pixels. The same layout then
 * degrades to a laptop screen by scaling down rather than reflowing — so what is reviewed
 * on a laptop is exactly what appears on the projector, just smaller.
 */
export function Stage({
  children,
  scale,
  className = '',
}: {
  children: ReactNode;
  /** Fixed scale, used by the overview grid. Omit to auto-fit the viewport. */
  scale?: number;
  className?: string;
}) {
  const auto = useViewportScale(scale === undefined);
  const applied = scale ?? auto;

  return (
    <div
      className={className}
      style={{
        width: STAGE_W * applied,
        height: STAGE_H * applied,
        overflow: 'hidden',
        flex: 'none',
      }}
    >
      <div
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${applied})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function useViewportScale(enabled: boolean): number {
  const [scale, setScale] = useState(() => fit());

  useEffect(() => {
    if (!enabled) return;
    const update = () => setScale(fit());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [enabled]);

  return scale;
}

function fit(): number {
  if (typeof window === 'undefined') return 1;
  return Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
}

export { STAGE_W, STAGE_H };
