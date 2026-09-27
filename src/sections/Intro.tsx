import { ButtonLink } from "../components/ButtonLink";
import { LocalTime } from "../components/LocalTime";
import { TextLink } from "../components/TextLink";
import { profile } from "../data/profile";

export function Intro() {
  return (
    <header className="flex flex-col gap-8">
      <div className="flex items-center gap-4 text-sm text-muted">
        <img src="/avatar.webp" alt="" width={48} height={48} className="size-12 rounded-full bg-surface" />
        <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="inline-flex items-center gap-2 text-ink">
            <span className="size-2 rounded-full bg-accent" aria-hidden />
            Open to new roles
          </span>
          <span aria-hidden>·</span>
          <span>{profile.location}</span>
          <span aria-hidden>·</span>
          <LocalTime />
          <span aria-hidden>·</span>
          <span>{profile.hours}</span>
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="m-0 font-serif text-6xl leading-[0.95] font-normal tracking-[-0.01em] sm:text-7xl md:text-8xl">
          {profile.name}
        </h1>
        <p className="m-0 max-w-[36ch] text-xl leading-snug text-pretty sm:text-2xl">
          <span className="font-medium">{profile.title}.</span> <span className="text-muted">{profile.tagline}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
        <ButtonLink variant="secondary" href={profile.resume} target="_blank" rel="noreferrer">
          Resume
        </ButtonLink>
        <nav aria-label="Profiles" className="flex gap-5 text-sm text-muted">
          <TextLink href={profile.github}>GitHub</TextLink>
          <TextLink href={profile.linkedin}>LinkedIn</TextLink>
          <TextLink href={profile.x}>X</TextLink>
        </nav>
      </div>
    </header>
  );
}
