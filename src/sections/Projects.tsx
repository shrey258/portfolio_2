import { Entry, EntryList, Tags } from "../components/Entry";
import { Section } from "../components/Section";
import { TextLink } from "../components/TextLink";
import { projects } from "../data/profile";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <EntryList>
        {projects.map((p) => (
          <Entry key={p.name} className="gap-2">
            <h3 className="group m-0 text-base font-medium">
              <TextLink className="relative before:absolute before:-inset-x-2 before:-inset-y-2.5" href={p.href}>{p.name}</TextLink>
              <span className="inline-block pl-1 text-faint transition-[translate] duration-150 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" aria-hidden>↗</span>
            </h3>
            <p className="m-0 text-lg leading-snug text-pretty">{p.line}</p>
            <p className="m-0 max-w-[65ch] leading-relaxed text-pretty text-muted">{p.detail}</p>
            <Tags items={p.tags} />
          </Entry>
        ))}
      </EntryList>
    </Section>
  );
}
