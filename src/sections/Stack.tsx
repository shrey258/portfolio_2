import { Section } from "../components/Section";
import { stack } from "../data/profile";

export function Stack() {
  return (
    <Section id="stack" title="Stack">
      <dl className="m-0 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {stack.map((s) => (
          <div key={s.group} className="flex flex-col gap-1">
            <dt className="font-mono text-xs tracking-wide text-faint uppercase">{s.group}</dt>
            <dd className="m-0">{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
