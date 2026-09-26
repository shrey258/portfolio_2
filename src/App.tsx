import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { lab, profile, projects, roles, stack, writing } from "./data/profile";
import { CopyEmail } from "./components/CopyEmail";
import { DitherPortrait } from "./components/DitherPortrait";
import { LabGallery } from "./components/LabGallery";
import { RoleList } from "./components/RoleList";
import { Section, Tags } from "./components/Section";
import { SectionNav } from "./components/SectionNav";

const external = { target: "_blank", rel: "noreferrer" };

const navItems = [
  { id: "work", label: "Work" },
  { id: "lab", label: "Lab" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const istTime = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });

function LocalTime() {
  const [time, setTime] = useState(istTime);
  useEffect(() => {
    const id = setInterval(() => setTime(istTime()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time} IST</span>;
}

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-30 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to work
      </a>
      <SectionNav items={navItems} />

      <main className="mx-auto flex max-w-[1080px] flex-col gap-20 px-5 pt-28 pb-12 sm:px-8 md:pt-32">
        <header className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-8">
            <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
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

            <div className="flex flex-col gap-5">
              <h1 className="m-0 font-serif text-6xl leading-[0.95] font-normal tracking-[-0.01em] sm:text-7xl md:text-8xl">
                {profile.name}
              </h1>
              <p className="m-0 max-w-[36ch] text-xl leading-snug text-pretty sm:text-2xl">
                <span className="font-medium">{profile.title}.</span> <span className="text-muted">{profile.tagline}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="pressable inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-bg no-underline"
              >
                Email me
              </a>
              <a
                href={profile.resume}
                {...external}
                className="pressable inline-flex h-11 items-center rounded-full border border-rule px-5 text-sm font-medium text-ink no-underline"
              >
                Resume
              </a>
              <nav aria-label="Profiles" className="flex gap-5 text-sm text-muted">
                <a className="link" href={profile.github} {...external}>GitHub</a>
                <a className="link" href={profile.linkedin} {...external}>LinkedIn</a>
                <a className="link" href={profile.x} {...external}>X</a>
              </nav>
            </div>
          </div>

          <DitherPortrait
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            className="aspect-[4/5] w-full max-w-[280px] cursor-crosshair rounded-[6px] bg-surface md:w-[280px]"
          />
        </header>

        <Section id="work" title="Work">
          <RoleList roles={roles} />
        </Section>

        <Section id="lab" title="Lab">
          <div className="flex flex-col gap-8">
            <p className="m-0 max-w-[55ch] leading-relaxed text-muted">
              Interaction studies I build on the side and post on{" "}
              <a className="link text-ink" href={profile.xHighlights} {...external}>X</a>. Tap one to see it larger. The receipt
              printer has a{" "}
              <a className="link text-ink" href={writing[0].href} {...external}>write-up</a>.
            </p>
            <LabGallery items={lab} />
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="flex flex-col">
            {projects.map((p, i) => (
              <article key={p.name} className={`flex flex-col gap-2 py-6 ${i ? "border-t border-rule" : "pt-0"}`}>
                <h3 className="m-0 text-base font-medium">
                  <a className="link" href={p.href} {...external}>{p.name}</a>
                  <span className="text-faint" aria-hidden> ↗</span>
                </h3>
                <p className="m-0 text-lg leading-snug">{p.line}</p>
                <p className="m-0 max-w-[65ch] leading-relaxed text-muted">{p.detail}</p>
                <Tags items={p.tags} />
              </article>
            ))}
          </div>
        </Section>

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

        <Section id="writing" title="Writing">
          {writing.map((w) => (
            <p key={w.href} className="m-0 flex flex-col gap-1">
              <a className="link text-lg" href={w.href} {...external}>{w.title}</a>
              <span className="text-sm text-muted">{w.where}</span>
            </p>
          ))}
        </Section>

        <footer id="contact" className="flex scroll-mt-20 flex-col gap-6 border-t border-rule pt-12">
          <p className="m-0 max-w-[20ch] font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Building something people use? Let's talk.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-lg">
            <CopyEmail email={profile.email} />
            <a className="link text-muted" href={profile.cal} {...external}>Book 15 minutes</a>
          </div>
          <p className="m-0 pt-6 text-sm text-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </footer>
      </main>
      <Analytics />
    </>
  );
}
