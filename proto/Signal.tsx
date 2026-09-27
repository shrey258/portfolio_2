import { Dither } from "./Dither";
import { ButtonLink } from "../src/components/ButtonLink";
import { LocalTime } from "../src/components/LocalTime";
import { TextLink } from "../src/components/TextLink";
import { profile } from "../src/data/profile";
import { Work } from "../src/sections/Work";
import { Lab } from "../src/sections/Lab";
import { Projects } from "../src/sections/Projects";
import { Contact } from "../src/sections/Contact";

const models = ["Opus 5", "Fable 5.1", "GPT-6 Astra", "GLM 5.3", "Grok 4.6"];

// Atmosphere: a live dithered field behind the whole page, glass panels over it.
export default function Signal() {
  return (
    <div className="proto-dark relative min-h-screen">
      <div className="fixed inset-0 -z-0">
        <Dither mode="field" ink="#5f7a68" paper="#1a1714" cell={5} fps={20} gain={1.15} />
      </div>
      <main className="relative mx-auto flex max-w-[1080px] flex-col gap-6 px-4 pt-20 pb-32 sm:px-8 md:pt-28">
        <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
          <header className="glass flex flex-col justify-between gap-10 p-6 sm:p-10">
            <p className="m-0 inline-flex items-center gap-2 text-sm text-muted">
              <span className="size-2 rounded-full bg-accent" aria-hidden /> Open to new roles
            </p>
            <div className="flex flex-col gap-5">
              <h1 className="m-0 font-serif text-6xl leading-[0.95] font-normal sm:text-7xl">{profile.name}</h1>
              <p className="m-0 max-w-[34ch] text-lg leading-snug text-pretty sm:text-xl">
                <span className="font-medium">{profile.title}.</span> <span className="text-muted">{profile.tagline}</span>
              </p>
            </div>
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

          <div className="grid gap-4">
            <section className="glass flex flex-col gap-1 p-6" aria-label="Local time">
              <p className="m-0 font-mono text-xs tracking-wide text-faint uppercase">Darjeeling</p>
              <p className="m-0 font-serif text-5xl"><LocalTime /></p>
              <p className="m-0 text-sm text-muted">{profile.hours}</p>
            </section>
            <section className="glass flex flex-col gap-3 p-6" aria-label="Latest work">
              <p className="m-0 font-mono text-xs tracking-wide text-faint uppercase">Shipped at Vibecode</p>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {models.map((m) => (
                  <li key={m} className="rounded-full bg-surface px-3 py-1 text-sm">{m}</li>
                ))}
              </ul>
              <p className="m-0 text-sm text-muted">7 LLMs, picker to Go proxy to sandbox.</p>
            </section>
            <figure className="glass m-0 overflow-hidden p-2">
              <video src="/lab/profile-card.mp4" poster="/lab/profile-card.webp" autoPlay muted loop playsInline
                width={1280} height={830} className="block h-auto w-full rounded-[16px]" aria-label="Profile card animation" />
            </figure>
          </div>
        </div>

        {[Work, Lab, Projects].map((S, i) => (
          <div key={i} className="glass p-6 sm:p-10 [&>section]:border-t-0 [&>section]:pt-0"><S /></div>
        ))}
        <div className="glass p-6 sm:p-10 [&>footer]:border-t-0 [&>footer]:pt-0"><Contact /></div>
      </main>
    </div>
  );
}
