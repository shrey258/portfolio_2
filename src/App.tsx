import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import { lab, profile, projects, roles, stack, stats, writing } from "./data/profile";
import type { LabItem } from "./data/profile";

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

// Plays only while on screen; with reduced motion it waits for the viewer to press play.
function LabVideo({ item }: { item: LabItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <figure className="m-0 flex flex-col gap-3">
      <div className="overflow-hidden rounded-[14px] bg-surface">
        <video
          ref={ref}
          src={`/lab/${item.src}.mp4`}
          poster={`/lab/${item.src}.webp`}
          width={item.width}
          height={item.height}
          muted
          loop
          playsInline
          preload="none"
          controls={reduced}
          aria-label={`${item.title} animation`}
          className="block h-auto w-full"
        />
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 text-sm">
        <span>{item.title}</span>
        <span className="font-mono text-xs text-faint">{item.tech}</span>
      </figcaption>
    </figure>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="grid scroll-mt-10 gap-6 border-t border-rule pt-8 md:grid-cols-[180px_1fr] md:gap-10">
      <h2 className="m-0 font-serif text-3xl leading-none font-normal md:sticky md:top-10 md:self-start">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

const Tags = ({ items }: { items: string[] }) => (
  <p className="m-0 font-mono text-xs text-faint">{items.join(" · ")}</p>
);

const external = { target: "_blank", rel: "noreferrer" };

export default function App() {
  const phones = lab.filter((l) => l.height > l.width);
  const wide = lab.filter((l) => l.width > l.height);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-10 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to work
      </a>

      <main className="mx-auto flex max-w-[1080px] flex-col gap-20 px-5 pt-16 pb-12 sm:px-8 md:pt-24">
        {/* Intro */}
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
              <span className="font-medium">{profile.title}.</span>{" "}
              <span className="text-muted">{profile.tagline}</span>
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

          <dl className="m-0 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="m-0 font-serif text-4xl tabular-nums">{s.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <Section id="work" title="Work">
          <div className="flex flex-col">
            {roles.map((r, i) => (
              <article key={r.company} className={`flex flex-col gap-3 py-6 ${i ? "border-t border-rule" : "pt-0"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="m-0 text-base font-medium">
                    {r.company} <span className="font-normal text-muted">· {r.title}</span>
                  </h3>
                  <span className="font-mono text-xs text-faint tabular-nums">{r.dates}</span>
                </div>
                <p className="m-0 max-w-[65ch] leading-relaxed text-muted">{r.summary}</p>
                {r.highlights && (
                  <ul className="m-0 flex max-w-[65ch] list-none flex-col gap-2 p-0 leading-relaxed">
                    {r.highlights.map((h) => (
                      <li key={h} className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-faint">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <Tags items={r.tags} />
              </article>
            ))}
          </div>
        </Section>

        <Section id="lab" title="Lab">
          <div className="flex flex-col gap-8">
            <p className="m-0 max-w-[55ch] leading-relaxed text-muted">
              Interaction studies I build on the side and post on{" "}
              <a className="link text-ink" href={profile.xHighlights} {...external}>X</a>. The receipt printer has a{" "}
              <a className="link text-ink" href={writing[0].href} {...external}>write-up</a>.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
              {phones.map((item) => <LabVideo key={item.src} item={item} />)}
            </div>
            <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2">
              {wide.map((item) => <LabVideo key={item.src} item={item} />)}
            </div>
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

        <footer id="contact" className="flex flex-col gap-6 border-t border-rule pt-12">
          <p className="m-0 max-w-[20ch] font-serif text-4xl leading-tight text-balance sm:text-5xl">
            Building something people use? Let's talk.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-lg">
            <a className="link" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="link text-muted" href={profile.cal} {...external}>Book 15 minutes</a>
          </div>
          <p className="m-0 pt-6 text-sm text-faint">
            © {new Date().getFullYear()} {profile.name}.
          </p>
        </footer>
      </main>
      <Analytics />
    </>
  );
}
