import { Dither } from "./Dither";
import { Actions, Clock, ContactCard, Earlier, Kicker, LabGrid, labNote, ProjectCard, RoleCard, SectionTitle, StackCard, Status, Widget, WritingCard } from "./widgets";
import { profile, roles } from "../src/data/profile";

const nav = [["Work", "#s-work"], ["Lab", "#s-lab"], ["Projects", "#s-projects"], ["Contact", "#s-contact"]];

// The landscape holds still on the left like a window; the widgets scroll past it on the right.
export default function Split() {
  const featured = roles.filter((r) => r.featured);
  return (
    <div className="proto-light min-h-screen lg:grid lg:grid-cols-[minmax(420px,42%)_1fr]">
      <aside className="relative h-[70svh] min-h-[480px] lg:sticky lg:top-0 lg:h-svh">
        <Dither mode="horizon" ink="#3f6f52" paper="#f7f4ee" cell={4} fps={20} seed={2.3} />
        <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4">
            <h1 className="m-0 font-serif text-6xl leading-[0.95] font-normal sm:text-7xl">{profile.name}</h1>
            <nav aria-label="Sections" className="hidden gap-2 lg:flex">
              {nav.map(([label, href]) => (
                <a key={href} href={href} className="pressable rounded-full bg-bg/85 px-3 py-1.5 text-sm text-muted no-underline">{label}</a>
              ))}
            </nav>
          </div>
          <Widget className="flex flex-col gap-5">
            <Status />
            <p className="m-0 text-lg leading-snug text-pretty">
              <span className="font-medium">{profile.title}.</span> <span className="text-muted">{profile.tagline}</span>
            </p>
            <Actions />
          </Widget>
        </div>
      </aside>

      <main className="flex flex-col gap-16 px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <section id="s-work" className="flex scroll-mt-8 flex-col gap-4">
          <div className="flex items-end justify-between gap-4"><SectionTitle>Work</SectionTitle></div>
          <div className="grid gap-4 xl:grid-cols-2">
            <RoleCard role={featured[0]} className="xl:col-span-2" />
            <RoleCard role={featured[1]} detail="short" />
            <RoleCard role={featured[2]} detail="short" />
            <Earlier />
            <Clock />
          </div>
        </section>

        <section id="s-lab" className="flex scroll-mt-8 flex-col gap-6">
          <SectionTitle note={labNote}>Lab</SectionTitle>
          <LabGrid />
        </section>

        <section id="s-projects" className="flex scroll-mt-8 flex-col gap-4">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid gap-4 xl:grid-cols-3">
            {[0, 1, 2].map((i) => <ProjectCard key={i} index={i} />)}
          </div>
          <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <StackCard />
            <WritingCard />
          </div>
        </section>

        <section id="s-contact" className="scroll-mt-8">
          <Kicker className="mb-3">Contact</Kicker>
          <ContactCard />
        </section>
      </main>
    </div>
  );
}
