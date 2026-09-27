import type { ComponentProps, ReactNode } from "react";
import { ButtonLink } from "../src/components/ButtonLink";
import { LabVideo } from "../src/components/LabVideo";
import { LocalTime } from "../src/components/LocalTime";
import { TextLink } from "../src/components/TextLink";
import { lab, profile, projects, roles, stack, writing } from "../src/data/profile";
import type { Role } from "../src/data/profile";

// The glass card from the Horizon hero, as the one surface every section is built from.
export function Widget({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`glass p-6 sm:p-7 ${className}`} {...props} />;
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`m-0 font-mono text-[11px] tracking-[0.08em] text-faint uppercase ${className}`}>{children}</p>;
}

export const Status = () => (
  <p className="m-0 inline-flex items-center gap-2 text-sm">
    <span className="size-2 rounded-full bg-accent" aria-hidden /> Open to new roles
  </p>
);

export function Intro({ className = "" }: { className?: string }) {
  return (
    <Widget className={`flex flex-col gap-6 ${className}`}>
      <Status />
      <p className="m-0 text-xl leading-snug text-pretty">
        <span className="font-medium">{profile.title}.</span> <span className="text-muted">{profile.tagline}</span>
      </p>
      <Actions />
    </Widget>
  );
}

export const Actions = () => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
    <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
    <ButtonLink variant="secondary" href={profile.resume} target="_blank" rel="noreferrer">Resume</ButtonLink>
    <nav aria-label="Profiles" className="flex gap-4 text-sm text-muted">
      <TextLink href={profile.github}>GitHub</TextLink>
      <TextLink href={profile.linkedin}>LinkedIn</TextLink>
      <TextLink href={profile.x}>X</TextLink>
    </nav>
  </div>
);

export function Clock({ className = "" }: { className?: string }) {
  return (
    <Widget className={`flex flex-col gap-1 ${className}`}>
      <Kicker>Darjeeling</Kicker>
      <p className="m-0 font-serif text-5xl leading-none"><LocalTime /></p>
      <p className="m-0 mt-1 text-sm text-muted">{profile.hours}</p>
    </Widget>
  );
}

const Chips = ({ items }: { items: string[] }) => (
  <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
    {items.map((t) => (
      <li key={t} className="rounded-full bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">{t}</li>
    ))}
  </ul>
);

export function RoleCard({ role, detail = "full", className = "" }: { role: Role; detail?: "full" | "short"; className?: string }) {
  return (
    <Widget className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <Kicker>{role.dates}</Kicker>
        <span className="text-xs text-faint">{role.title}</span>
      </div>
      <h3 className="m-0 font-serif text-4xl leading-none font-normal">{role.company}</h3>
      <p className="m-0 leading-relaxed text-muted">{role.summary}</p>
      {detail === "full" && role.highlights && (
        <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px] leading-relaxed">
          {role.highlights.map((h) => (
            <li key={h} className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-faint">{h}</li>
          ))}
        </ul>
      )}
      <div className="mt-auto"><Chips items={role.tags} /></div>
    </Widget>
  );
}

export function Earlier({ className = "" }: { className?: string }) {
  return (
    <Widget className={`flex flex-col gap-5 ${className}`}>
      <Kicker>Earlier</Kicker>
      <ul className="m-0 flex list-none flex-col gap-4 p-0">
        {roles.filter((r) => !r.featured).map((r) => (
          <li key={r.company} className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="font-medium">{r.company}</span>
              <span className="font-mono text-[11px] text-faint">{r.dates}</span>
            </div>
            <span className="text-sm leading-relaxed text-muted">{r.summary}</span>
          </li>
        ))}
      </ul>
    </Widget>
  );
}

export function ProjectCard({ index, className = "" }: { index: number; className?: string }) {
  const p = projects[index];
  return (
    <Widget className={`group flex flex-col gap-3 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <Kicker>Project</Kicker>
        <span className="text-faint" aria-hidden>↗</span>
      </div>
      <h3 className="m-0 font-serif text-3xl leading-none font-normal">
        <TextLink href={p.href} className="no-underline">{p.name}</TextLink>
      </h3>
      <p className="m-0 text-lg leading-snug">{p.line}</p>
      <p className="m-0 text-sm leading-relaxed text-muted">{p.detail}</p>
      <div className="mt-auto"><Chips items={p.tags} /></div>
    </Widget>
  );
}

export function StackCard({ className = "" }: { className?: string }) {
  return (
    <Widget className={`flex flex-col gap-4 ${className}`}>
      <Kicker>Stack</Kicker>
      <dl className="m-0 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {stack.map((s) => (
          <div key={s.group}>
            <dt className="text-xs text-faint">{s.group}</dt>
            <dd className="m-0 text-sm">{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Widget>
  );
}

export function WritingCard({ className = "" }: { className?: string }) {
  const w = writing[0];
  return (
    <Widget className={`flex flex-col gap-3 ${className}`}>
      <Kicker>Writing</Kicker>
      <TextLink href={w.href} className="text-lg leading-snug">{w.title}</TextLink>
      <span className="text-sm text-muted">{w.where}</span>
    </Widget>
  );
}

export function ContactCard({ className = "" }: { className?: string }) {
  return (
    <Widget className={`flex flex-col gap-6 ${className}`}>
      <p className="m-0 max-w-[18ch] font-serif text-4xl leading-tight text-balance sm:text-5xl">
        Building something people use? Let's talk.
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-lg">
        <TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>
        <TextLink className="text-muted" href={profile.cal}>Book 15 minutes</TextLink>
      </div>
    </Widget>
  );
}

// The Lab layout Shrey liked, unchanged: phone clips in one grid, wide clips in another.
export function LabGrid() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
        {lab.filter((l) => l.height > l.width).map((item) => <LabVideo key={item.src} item={item} />)}
      </div>
      <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2">
        {lab.filter((l) => l.width > l.height).map((item) => <LabVideo key={item.src} item={item} />)}
      </div>
    </div>
  );
}

export function SectionTitle({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
      <h2 className="m-0 font-serif text-4xl leading-none font-normal sm:text-5xl">{children}</h2>
      {note && <p className="m-0 max-w-[48ch] text-sm text-muted">{note}</p>}
    </div>
  );
}

export const labNote = (
  <>
    Interaction studies I build on the side and post on <TextLink className="text-ink" href={profile.xHighlights}>X</TextLink>.
  </>
);
