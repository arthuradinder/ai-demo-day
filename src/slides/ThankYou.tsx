import { FactValue } from '../components/Tbc';
import { thankYou as c } from '../content/deck';

/**
 * Slide 17 — `thank-you`
 *
 * Emotional resolution: every contributing group named once more, all at equal weight.
 *
 * `venueHost` is nullable in content — set it to `null` if the venue was not donated and
 * the line disappears without leaving a gap.
 */
export function ThankYou() {
  const groups = c.groups.status === 'confirmed' ? c.groups.items : [];

  return (
    <section className="flex h-[1080px] w-[1920px] flex-col justify-center bg-paper px-[128px] py-[96px]">
      <h2 className="text-display font-bold text-ink">{c.headline}</h2>

      <ul className="mt-[56px] flex flex-col gap-[20px]">
        {groups.map((g) => (
          <li key={g.who} className="flex items-baseline gap-[20px]">
            <span aria-hidden className="h-[5px] w-[40px] flex-none bg-accent" />
            <span className="text-h2 font-semibold text-ink">{g.who}</span>
            <span className="text-body text-ink-soft">— {g.reason}</span>
          </li>
        ))}

        {c.venueHost ? (
          <li className="flex items-baseline gap-[20px]">
            <span aria-hidden className="h-[5px] w-[40px] flex-none bg-accent" />
            <span className="text-h2 font-semibold text-ink">
              <FactValue fact={c.venueHost.who} />
            </span>
            <span className="text-body text-ink-soft">— {c.venueHost.reason}</span>
          </li>
        ) : null}
      </ul>

      <p className="mt-[64px] text-h1 font-bold text-accent">{c.kicker}</p>
    </section>
  );
}
