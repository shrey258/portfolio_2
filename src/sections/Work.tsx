import { Entry, EntryList, Tags } from "../components/Entry";
import { Section } from "../components/Section";
import { roles } from "../data/profile";

export function Work() {
  return (
    <Section id="work" title="Work">
      <EntryList>
        {roles.map((r) => (
          <Entry key={r.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="m-0 text-base font-medium">
                {r.company} <span className="font-normal text-muted">· {r.title}</span>
              </h3>
              <span className="font-mono text-xs text-faint tabular-nums">{r.dates}</span>
            </div>
            <p className="m-0 max-w-[65ch] leading-relaxed text-pretty text-muted">{r.summary}</p>
            {r.highlights && (
              <ul className="m-0 flex max-w-[65ch] list-none flex-col gap-2 p-0 leading-relaxed">
                {r.highlights.map((h) => (
                  <li
                    key={h}
                    className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-faint"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <Tags items={r.tags} />
          </Entry>
        ))}
      </EntryList>
    </Section>
  );
}
