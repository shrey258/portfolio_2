import { Dither } from "./Dither";
import { ButtonLink } from "../src/components/ButtonLink";
import { LocalTime } from "../src/components/LocalTime";
import { TextLink } from "../src/components/TextLink";
import { profile } from "../src/data/profile";
import { Work } from "../src/sections/Work";
import { Lab } from "../src/sections/Lab";
import { Projects } from "../src/sections/Projects";
import { Contact } from "../src/sections/Contact";

// Place: a dithered Darjeeling horizon (sky, sun, tea hills) as the hero; the rest stays paper.
export default function Horizon() {
  return (
    <div className="proto-light min-h-screen">
      <div className="relative h-[68svh] min-h-[440px] w-full overflow-hidden">
        <Dither mode="horizon" ink="#3f6f52" paper="#f7f4ee" cell={4} fps={20} />
        <div className="absolute inset-x-0 top-0 mx-auto max-w-[1080px] px-5 pt-16 sm:px-8 md:pt-24">
          <h1 className="m-0 font-serif text-6xl leading-[0.95] font-normal sm:text-7xl md:text-8xl">{profile.name}</h1>
          <p className="m-0 mt-4 inline-block rounded-full bg-bg/85 px-3 py-1 text-sm text-muted">
            <LocalTime /> in {profile.location} · {profile.hours}
          </p>
        </div>
      </div>

      <main className="relative mx-auto -mt-28 flex max-w-[1080px] flex-col gap-20 px-4 pb-32 sm:px-8">
        <header className="glass flex max-w-[640px] flex-col gap-6 p-6 sm:p-8">
          <p className="m-0 inline-flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-accent" aria-hidden /> Open to new roles
          </p>
          <p className="m-0 text-xl leading-snug text-pretty">
            <span className="font-medium">{profile.title}.</span> <span className="text-muted">{profile.tagline}</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
            <ButtonLink variant="secondary" href={profile.resume} target="_blank" rel="noreferrer">Resume</ButtonLink>
            <nav aria-label="Profiles" className="flex gap-4 text-sm text-muted">
              <TextLink href={profile.github}>GitHub</TextLink>
              <TextLink href={profile.linkedin}>LinkedIn</TextLink>
              <TextLink href={profile.x}>X</TextLink>
            </nav>
          </div>
        </header>
        <Work />
        <Lab />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
