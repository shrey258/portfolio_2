import { Tags } from "../components/Tags";
import { Section } from "../components/Section";
import { TextLink } from "../components/TextLink";
import { projects } from "../data/profile";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="m-0 flex list-none flex-col divide-y divide-rule p-0">
        {projects.map((p) => (
          <li key={p.name} className="flex flex-col gap-2 py-6 first:pt-0">
            <h3 className="group m-0 text-base font-medium">
              <TextLink data-track="project_clicked" data-project={p.name} className="hit" href={p.href}>{p.name}</TextLink>
              <span className="inline-block pl-1 text-faint transition-[translate] duration-150 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" aria-hidden>↗</span>
            </h3>
            <p className="m-0 text-lg leading-snug text-pretty">{p.line}</p>
            <p className="m-0 max-w-[65ch] leading-relaxed text-pretty text-muted">{p.detail}</p>
            <Tags items={p.tags} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
