import { SlideFrame, Kicker } from '../components/SlideFrame';
import { FactValue } from '../components/Tbc';
import { cohort2Programme as c } from '../content/deck';

/**
 * Slide 7 — `cohort2-programme`
 *
 * The conversion slide for anyone deciding about Cohort 3. Deliberately outcome-shaped
 * rather than curriculum-shaped — the brief lists "not a syllabus" as a non-goal.
 *
 * The four points render as a numbered sequence, distinct from the parallel, unnumbered
 * groups on `why-today`, because this is a journey from problem to demo.
 */
export function Cohort2Programme() {
  return (
    <SlideFrame headline={c.headline}>
      <p className="mb-[44px] text-lead font-medium text-teal">
        <FactValue fact={c.introWeeks} /> {c.introAfter}
      </p>

      <ol className="flex flex-col gap-[26px]">
        {c.steps.map((step, i) => (
          <li key={step} className="flex items-start gap-[28px]">
            <span
              aria-hidden
              className="flex h-[60px] w-[60px] flex-none items-center justify-center rounded-full bg-teal-soft text-small font-bold text-teal"
            >
              {i + 1}
            </span>
            <span className="max-w-[1480px] text-body text-ink">{step}</span>
          </li>
        ))}
      </ol>

      <Kicker>{c.kicker}</Kicker>
    </SlideFrame>
  );
}
