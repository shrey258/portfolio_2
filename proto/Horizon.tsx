import type { ReactNode } from "react";
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
// Sun by day, moon from 6pm to 6am in Darjeeling, matching the clock under the name.
const hourInDarjeeling = () =>
  Number(new Date().toLocaleString("en-GB", { hour: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }));

export default function Horizon({ work = <Work /> }: { work?: ReactNode }) {
  const hour = hourInDarjeeling();
  const night = hour >= 18 || hour < 6;
  return (
    <div className="proto-light min-h-screen">
      <header>
        {/* The hills fade into the paper, so the card has no hard seam running through it. */}
        <div className="relative h-[68svh] min-h-[440px] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_78%,transparent)]">
          <Dither mode="horizon" ink="#3f6f52" paper="#f7f4ee" cell={4} fps={20} intro={1200} moon={night} />
          <div className="absolute inset-x-0 top-0 mx-auto max-w-[1080px] px-5 pt-16 sm:px-8 md:pt-24">
            <h1 className="intro-fade m-0 font-serif text-6xl leading-[0.95] font-normal tracking-[-0.01em] text-balance sm:text-7xl md:text-8xl">{profile.name}</h1>
            <p className="m-0 mt-4 inline-block rounded-full bg-bg px-3 py-1 text-[13px] whitespace-nowrap text-muted sm:text-sm">
              <LocalTime /> in {profile.location} · {profile.hours}
            </p>
          </div>
        </div>

        <div className="relative mx-auto -mt-28 max-w-[1080px] px-4 sm:px-8">
          <div className="intro-rise glass flex max-w-[640px] flex-col gap-6 p-6 sm:p-8">
            <p className="m-0 inline-flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-accent" aria-hidden /> Open to new roles
            </p>
            <p className="m-0 text-lg leading-snug text-pretty sm:text-xl">
              <span className="font-medium">{profile.title}.</span> <span className="text-muted">{profile.tagline}</span>
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
              <ButtonLink variant="secondary" href={profile.resume} target="_blank" rel="noreferrer">Resume</ButtonLink>
              {/* 20px-tall links get a 44px tap area; the 8px side bleed stays inside the 16px gap. */}
              <nav aria-label="Profiles" className="flex gap-4 text-sm text-muted [&>a]:relative [&>a]:before:absolute [&>a]:before:-inset-x-2 [&>a]:before:-inset-y-3">
                <TextLink href={profile.github}>GitHub</TextLink>
                <TextLink href={profile.linkedin}>LinkedIn</TextLink>
                <TextLink href={profile.x}>X</TextLink>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto mt-20 flex max-w-[1080px] flex-col gap-20 px-4 pb-32 sm:px-8">
        {work}
        <Lab />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
