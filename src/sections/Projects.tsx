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
            <h3 className="m-0 text-base font-medium">
              <TextLink href={p.href}>{p.name}</TextLink>
              <span className="text-faint" aria-hidden> ↗</span>
            </h3>
            <p className="m-0 text-lg leading-snug">{p.line}</p>
            <p className="m-0 max-w-[65ch] leading-relaxed text-muted">{p.detail}</p>
            <Tags items={p.tags} />
          </Entry>
        ))}
      </EntryList>
    </Section>
  );
}
