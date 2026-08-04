import { FactValue } from '../components/Tbc';
import { closeHolding as c } from '../content/deck';

/**
 * Slide 18 — `close-holding`
 *
 * The only slide with no speaker. It stays up while the room mingles and eats, so it must
 * be entirely self-explanatory and readable from across the room — which makes it the
 * deck's legibility ceiling. Link text is set at `display`/`h1` scale, larger than body
 * text anywhere else in the deck.
 *
 * No looping animation: this slide is on screen for a long time and anything that moves
 * becomes an irritant, plus static content avoids projector burn-in.
 *
 * Links reference the same content values as `get-involved`, not separately typed URLs.
 */
export function CloseHolding() {
  return (
    <section className="flex h-[1080px] w-[1920px] flex-col bg-paper px-[128px] py-[88px]">
      <p className="text-small font-semibold tracking-[0.16em] text-ink-soft uppercase">
        {c.eyebrow}
      </p>

      <h2 className="mt-[24px] text-h1 font-bold text-ink">{c.headline}</h2>

      <ul className="mt-[52px] flex flex-col gap-[32px]">
        {c.entries.map((entry) => (
          <li key={entry.label} className="flex items-baseline gap-[32px]">
            {/* 600px keeps every label on one line; at 520px "Join the community" wrapped
                and knocked its link out of alignment with the rows above. */}
            <span className="w-[600px] flex-none text-h2 font-semibold text-ink">
              {entry.label}
            </span>
            {/* Largest link text in the deck — read from across the room. */}
            <span className="text-h2 font-bold break-all text-accent">
              <FactValue fact={entry.target} />
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-auto border-t-[6px] border-rule pt-[32px] text-body font-medium text-ink-soft">
        {c.footer}
      </p>
    </section>
  );
}
