import { Section } from "../components/Section";
import { TextLink } from "../components/TextLink";
import { writing } from "../data/profile";

export function Writing() {
  return (
    <Section id="writing" title="Writing">
      {writing.map((w) => (
        <p key={w.href} className="m-0 flex flex-col gap-1">
          <TextLink className="text-lg" href={w.href}>{w.title}</TextLink>
          <span className="text-sm text-muted">{w.where}</span>
        </p>
      ))}
    </Section>
  );
}
