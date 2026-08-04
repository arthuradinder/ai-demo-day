import { FactValue } from '../components/Tbc';
import { graduateVoice as c } from '../content/deck';

/**
 * Slide 10 — `graduate-voice`
 *
 * The only slide where the outcome is stated by a participant rather than the host, which
 * makes it the highest-conversion slide for prospective members.
 *
 * Attribution consent is a shipping requirement. If `consent` is set to `'withheld'` this
 * slide is removed from the deck entirely by `slides/index.ts` — it is never anonymised,
 * because an anonymous testimonial persuades nobody and reads as fabricated.
 *
 * No portrait renders unless one is explicitly supplied in content.
 */
export function GraduateVoice() {
  return (
    <section className="flex h-[1080px] w-[1920px] flex-col justify-center bg-paper-alt px-[128px] py-[96px]">
      <p className="mb-[40px] text-small font-semibold tracking-[0.16em] text-ink-soft uppercase">
        {c.headline}
      </p>

      <blockquote className="flex items-start gap-[44px]">
        <span aria-hidden className="text-display leading-none font-bold text-accent-deep">
          “
        </span>
        <p className="max-w-[1500px] text-h2 font-medium text-ink">
          <FactValue fact={c.quote} size="block" />
        </p>
      </blockquote>

      <figcaption className="mt-[52px] flex items-center gap-[24px] pl-[100px]">
        {c.portrait ? (
          <img
            src={c.portrait}
            alt=""
            className="h-[112px] w-[112px] flex-none rounded-full object-cover"
          />
        ) : null}
        <p className="text-body font-semibold text-ink-soft">
          <FactValue fact={c.name} /> · <FactValue fact={c.role} /> ·{' '}
          {c.attributionSuffix}
        </p>
      </figcaption>
    </section>
  );
}
