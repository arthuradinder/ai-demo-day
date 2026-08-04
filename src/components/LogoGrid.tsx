import type { FactList, Sponsor } from '../content/types';

/**
 * Sponsor recognition grid.
 *
 * Deliberate constraint from spec slide 13: tier ordering is permitted, wildly unequal
 * sizing is not. Every cell here is the same size regardless of tier; a higher tier gets
 * position (earlier in the grid) and a small tier label, never a larger box. The reason is
 * social, not aesthetic — a sponsor rendered small while its representative watches from
 * the room is a worse outcome than a flat grid.
 *
 * While sponsors are unconfirmed this renders empty slots at real logo footprint, so the
 * layout is reviewable now and filling it later is a content-only edit.
 */
export function LogoGrid({ sponsors }: { sponsors: FactList<Sponsor> }) {
  if (sponsors.status === 'placeholder') {
    return (
      <div>
        <div className="grid grid-cols-3 gap-[24px]">
          {Array.from({ length: sponsors.slots }, (_, i) => (
            <div
              key={i}
              className="flex h-[124px] flex-col items-center justify-center gap-[8px] rounded-[14px] border-[3px] border-dashed border-tbc-edge bg-tbc-bg"
            >
              <span className="text-micro font-bold tracking-[0.16em] text-tbc uppercase">
                Sponsor TBC
              </span>
              <span className="text-micro font-medium text-tbc">slot {i + 1}</span>
            </div>
          ))}
        </div>
        <p className="mt-[16px] text-micro font-medium text-tbc">
          {sponsors.hint}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[24px]">
      {sponsors.items.map((s) => (
        <div
          key={s.name}
          className="flex h-[124px] flex-col items-center justify-center gap-[8px] rounded-[14px] border-[3px] border-rule bg-paper px-[28px]"
        >
          {s.logo ? (
            // Uniform max footprint: no sponsor renders larger than another.
            <img
              src={s.logo}
              alt={s.name}
              className="max-h-[76px] max-w-[340px] object-contain"
            />
          ) : (
            <span className="text-h2 font-bold text-ink text-center">{s.name}</span>
          )}
          {s.tier ? (
            <span className="text-micro font-semibold tracking-[0.14em] text-ink-soft uppercase">
              {s.tier}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
