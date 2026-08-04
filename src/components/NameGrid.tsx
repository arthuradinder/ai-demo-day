import type { FactList, Person, Project } from '../content/types';

/**
 * Recognition lists — Cohort 2 projects and the mentor roll.
 *
 * Every entry renders at identical weight. Both slides that use this carry a hard
 * equal-weight constraint from the spec, and both are recognition slides where the names
 * are the payload. So type size is fixed and never reduced to make a longer list fit: if
 * the list overflows, that surfaces as a visible defect for QA rather than as text nobody
 * in the back row can read.
 */
export function NameGrid({
  entries,
  columns = 3,
}: {
  entries: FactList<Person>;
  columns?: 2 | 3;
}) {
  const cols = columns === 2 ? 'grid-cols-2' : 'grid-cols-3';

  if (entries.status === 'placeholder') {
    return (
      <div>
        <div className={`grid ${cols} gap-x-[48px] gap-y-[24px]`}>
          {Array.from({ length: entries.slots }, (_, i) => (
            <div
              key={i}
              className="flex h-[92px] items-center rounded-[10px] border-[3px] border-dashed border-tbc-edge bg-tbc-bg px-[24px]"
            >
              <span className="text-micro font-bold tracking-[0.14em] text-tbc uppercase">
                Name TBC
              </span>
            </div>
          ))}
        </div>
        <p className="mt-[24px] text-micro font-medium text-tbc">{entries.hint}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${cols} gap-x-[48px] gap-y-[28px]`}>
      {entries.items.map((p) => (
        <div key={p.name} className="border-l-[6px] border-teal pl-[24px]">
          <p className="text-h2 font-semibold text-ink">{p.name}</p>
          {p.role ? <p className="text-small text-ink-soft">{p.role}</p> : null}
        </div>
      ))}
    </div>
  );
}

/**
 * The Cohort 2 roll of honour. Titles and builder names only — no descriptions and no
 * screenshots, because the room watched the demos an hour earlier.
 */
export function ProjectGrid({ projects }: { projects: FactList<Project> }) {
  if (projects.status === 'placeholder') {
    return (
      <div>
        <div className="grid grid-cols-3 gap-x-[40px] gap-y-[24px]">
          {Array.from({ length: projects.slots }, (_, i) => (
            <div
              key={i}
              className="flex h-[112px] flex-col justify-center gap-[6px] rounded-[10px] border-[3px] border-dashed border-tbc-edge bg-tbc-bg px-[24px]"
            >
              <span className="text-micro font-bold tracking-[0.14em] text-tbc uppercase">
                Project TBC
              </span>
              <span className="text-micro font-medium text-tbc">builder name TBC</span>
            </div>
          ))}
        </div>
        <p className="mt-[24px] text-micro font-medium text-tbc">{projects.hint}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-x-[40px] gap-y-[28px]">
      {projects.items.map((p) => (
        <div key={`${p.title}-${p.builder}`} className="border-l-[6px] border-accent pl-[24px]">
          <p className="text-h2 font-semibold text-ink">{p.title}</p>
          <p className="text-small text-ink-soft">{p.builder}</p>
        </div>
      ))}
    </div>
  );
}
