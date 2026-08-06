import type { FactList, Sponsor } from '../content/types';

/**
 * Sponsor recognition grid.
 *
 * Deliberate constraint: tier ordering is permitted, wildly unequal sizing is not. Every cell
 * is the same size regardless of tier; a higher tier gets position, never a larger box. The
 * reason is social rather than aesthetic — a sponsor rendered small while its representative
 * watches from the room is a worse outcome than a flat grid.
 *
 * `pendingSlots` renders extra clearly-marked empty cells after the confirmed ones, so a
 * partly-known sponsor list shows both what is settled and what is still coming. That matters
 * here: three sponsors are confirmed and two are not, and a grid that quietly showed only
 * three would hide the gap rather than surface it.
 */
export function LogoGrid({
  sponsors,
  pendingSlots = 0,
  pendingHint,
}: {
  sponsors: FactList<Sponsor>;
  pendingSlots?: number;
  pendingHint?: string;
}) {
  const items = sponsors.status === 'confirmed' ? sponsors.items : [];
  const blanks = sponsors.status === 'confirmed' ? pendingSlots : sponsors.slots;
  const hint = sponsors.status === 'confirmed' ? pendingHint : sponsors.hint;

  return (
    <div>
      <div className="grid grid-cols-3 gap-[24px]">
        {items.map((s) => (
          <div
            key={s.name}
            className="flex h-[152px] flex-col items-center justify-center gap-[8px] rounded-[14px] border-[2px] border-edge bg-panel px-[28px]"
          >
            {s.logo ? (
              // Uniform max footprint: no sponsor renders larger than another.
              <img
                src={s.logo}
                alt={s.name}
                className="max-h-[76px] max-w-[340px] object-contain"
              />
            ) : (
              /* `lead`, not `h2`: at 60px a two-line name like "Nairobi Business Angel
                 Network" breaks out of the cell. These name-only cells are placeholders
                 until the logo files arrive anyway. */
              <span className="text-center text-lead font-bold text-fg">{s.name}</span>
            )}
            {s.tier ? (
              <span className="text-micro font-semibold tracking-[0.14em] text-fg-soft uppercase">
                {s.tier}
              </span>
            ) : null}
          </div>
        ))}

        {Array.from({ length: blanks }, (_, i) => (
          <div
            key={`pending-${i}`}
            className="flex h-[152px] flex-col items-center justify-center gap-[6px] rounded-[14px] border-[3px] border-dashed border-tbc-edge bg-tbc-bg"
          >
            <span className="text-micro font-bold tracking-[0.16em] text-tbc uppercase">
              Sponsor TBC
            </span>
            <span className="text-micro font-medium text-tbc">
              slot {items.length + i + 1}
            </span>
          </div>
        ))}
      </div>

      {hint ? <p className="mt-[16px] text-micro font-medium text-tbc">{hint}</p> : null}
    </div>
  );
}
