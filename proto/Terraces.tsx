import type { ReactNode } from "react";
import { Dither } from "./Dither";
import { Clock, ContactCard, Earlier, Intro, LabGrid, labNote, ProjectCard, RoleCard, SectionTitle, StackCard, Widget, WritingCard } from "./widgets";
import { LocalTime } from "../src/components/LocalTime";
import { profile, roles } from "../src/data/profile";

// Each section gets its own strip of hills, stepping down the page like tea terraces;
// the section's widgets overlap the strip's lower edge, the same move as the Horizon hero.
function Band({ seed, sunY, height = "h-[34svh]", children }: { seed: number; sunY: number; height?: string; children?: ReactNode }) {
  return (
    <div className={`relative w-full overflow-hidden ${height} min-h-[240px]`}>
      <Dither mode="horizon" ink="#3f6f52" paper="#f7f4ee" cell={4} fps={20} seed={seed} sunY={sunY} />
      {children && <div className="absolute inset-x-0 top-0 mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 md:pt-16">{children}</div>}
    </div>
  );
}

const Lift = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto -mt-24 flex max-w-[1180px] flex-col gap-4 px-4 sm:px-8">{children}</div>
);

export default function Terraces() {
  const [vibecode, fleek, gomini] = roles.filter((r) => r.featured);
  return (
    <div className="proto-light min-h-screen pb-32">
      <Band seed={0} sunY={0.62} height="h-[62svh]">
        <h1 className="m-0 font-serif text-6xl leading-[0.95] font-normal sm:text-7xl md:text-8xl">{profile.name}</h1>
        <p className="m-0 mt-4 inline-block rounded-full bg-bg/85 px-3 py-1 text-sm text-muted">
          <LocalTime /> in {profile.location} · {profile.hours}
        </p>
      </Band>
      <Lift>
        <Intro className="max-w-[640px]" />
      </Lift>

      <div className="mt-24"><Band seed={3.1} sunY={0.52}>
        <Widget className="inline-block py-4"><SectionTitle>Work</SectionTitle></Widget>
      </Band></div>
      <Lift>
        <div className="grid gap-4 md:grid-cols-6">
          <RoleCard role={vibecode} className="md:col-span-4" />
          <RoleCard role={fleek} className="md:col-span-2" />
          <RoleCard role={gomini} detail="short" className="md:col-span-2" />
          <Earlier className="md:col-span-2" />
          <Clock className="md:col-span-2" />
        </div>
      </Lift>

      <div className="mt-24"><Band seed={6.7} sunY={0.44}>
        <Widget className="inline-block py-4"><SectionTitle>Lab</SectionTitle></Widget>
      </Band></div>
      <Lift>
        <Widget className="flex flex-col gap-6 sm:p-10">
          <p className="m-0 text-muted">{labNote}</p>
          <LabGrid />
        </Widget>
      </Lift>

      <div className="mt-24"><Band seed={9.4} sunY={0.34}>
        <Widget className="inline-block py-4"><SectionTitle>Projects</SectionTitle></Widget>
      </Band></div>
      <Lift>
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => <ProjectCard key={i} index={i} />)}
        </div>
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <StackCard />
          <WritingCard />
        </div>
      </Lift>

      <div className="mt-24"><Band seed={12.2} sunY={0.22} /></div>
      <Lift>
        <ContactCard />
      </Lift>
    </div>
  );
}
