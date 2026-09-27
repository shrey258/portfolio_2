import { useEffect, useRef } from "react";
import { Dither } from "./Dither";
import { Clock, ContactCard, Earlier, Intro, LabGrid, labNote, ProjectCard, RoleCard, SectionTitle, StackCard, Widget, WritingCard } from "./widgets";
import { profile, roles } from "../src/data/profile";

// One landscape behind the whole page. The sun sets as you scroll, so the calm carries to the end.
export default function Valley() {
  const sun = useRef(0.66);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      sun.current = 0.66 - 0.5 * (max > 0 ? scrollY / max : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  const featured = roles.filter((r) => r.featured);

  return (
    <div className="proto-light relative min-h-screen">
      <div className="fixed inset-0">
        <Dither mode="horizon" ink="#3f6f52" paper="#f7f4ee" cell={4} fps={20} sunRef={sun} />
      </div>
      <main className="relative mx-auto flex max-w-[1180px] flex-col gap-24 px-4 pt-16 pb-40 sm:px-8 md:pt-24">
        <header className="flex flex-col gap-8">
          <h1 className="m-0 font-serif text-6xl leading-[0.95] font-normal sm:text-7xl md:text-8xl">{profile.name}</h1>
          <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
            <Intro />
            <Clock />
          </div>
        </header>

        <section className="flex flex-col gap-6">
          <Widget className="self-start py-4"><SectionTitle>Work</SectionTitle></Widget>
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:none]">
            {featured.map((r) => (
              <RoleCard key={r.company} role={r} className="w-[85vw] shrink-0 snap-start sm:w-[440px]" />
            ))}
            <Earlier className="w-[85vw] shrink-0 snap-start sm:w-[380px]" />
          </div>
        </section>

        <Widget className="flex flex-col gap-8 sm:p-10">
          <SectionTitle note={labNote}>Lab</SectionTitle>
          <LabGrid />
        </Widget>

        <section className="flex flex-col gap-6">
          <Widget className="self-start py-4"><SectionTitle>Projects</SectionTitle></Widget>
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((i) => <ProjectCard key={i} index={i} />)}
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <StackCard />
          <WritingCard />
        </div>
        <ContactCard />
      </main>
    </div>
  );
}
