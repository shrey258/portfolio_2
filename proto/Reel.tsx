import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "../src/components/ButtonLink";
import { LocalTime } from "../src/components/LocalTime";
import { TextLink } from "../src/components/TextLink";
import { lab, profile } from "../src/data/profile";
import type { LabItem } from "../src/data/profile";
import { Work } from "../src/sections/Work";
import { Projects } from "../src/sections/Projects";
import { Contact } from "../src/sections/Contact";

// Bayer 8x8 thresholds, 0..1.
const BAYER = Array.from({ length: 64 }, (_, i) => {
  const x = i % 8, y = Math.floor(i / 8);
  let v = 0;
  for (let bit = 0, m = 4; bit < 3; bit++, m /= 2) {
    const xb = (x >> (2 - bit)) & 1, yb = (y >> (2 - bit)) & 1;
    v += ((xb ^ yb) * 2 + yb) * m * m;
  }
  return (v + 0.5) / 64;
});

// A clip that "develops" out of a dither the first time it scrolls into view.
function DevelopClip({ item, delay }: { item: LabItem; delay: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [done, setDone] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const v = video.current!;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (done) return;
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const cell = 6;
    c.width = Math.ceil(c.clientWidth / cell);
    c.height = Math.ceil(c.clientHeight / cell);
    const ink = getComputedStyle(c).color;
    let raf = 0, start = 0;
    const draw = (p: number) => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = ink;
      for (let y = 0; y < c.height; y++)
        for (let x = 0; x < c.width; x++)
          if (BAYER[(y % 8) * 8 + (x % 8)] > p) ctx.fillRect(x, y, 1, 1);
    };
    draw(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const tick = (now: number) => {
        if (!start) start = now + delay;
        const t = Math.min(1, Math.max(0, (now - start) / 900));
        draw(1 - Math.pow(1 - t, 3));
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDone(true);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(c);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [done, delay]);

  return (
    <figure className="reel-tile m-0 flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-[18px] bg-surface">
        <video ref={video} src={`/lab/${item.src}.mp4`} poster={`/lab/${item.src}.webp`} width={item.width} height={item.height}
          muted loop playsInline preload="none" aria-label={`${item.title} animation`} className="block h-auto w-full" />
        {!done && <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full text-bg" style={{ imageRendering: "pixelated" }} />}
      </div>
      <figcaption className="flex items-baseline justify-between gap-3 text-sm">
        <span>{item.title}</span>
        <span className="font-mono text-xs text-faint">{item.tech}</span>
      </figcaption>
    </figure>
  );
}

// Work-first: the interaction studies are the hero; the résumé follows.
export default function Reel() {
  const phones = lab.filter((l) => l.height > l.width);
  const wide = lab.filter((l) => l.width > l.height);
  return (
    <div className="proto-light min-h-screen">
      <main className="mx-auto flex max-w-[1240px] flex-col gap-16 px-5 pt-12 pb-32 sm:px-8 md:pt-16">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="m-0 flex flex-wrap items-center gap-x-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2 text-ink"><span className="size-2 rounded-full bg-accent" aria-hidden />Open to new roles</span>
              <span aria-hidden>·</span><LocalTime /><span aria-hidden>·</span><span>{profile.hours}</span>
            </p>
            <h1 className="m-0 max-w-[16ch] font-serif text-5xl leading-[1] font-normal text-balance sm:text-6xl md:text-7xl">
              {profile.name} builds products, and the feel of them.
            </h1>
            <p className="m-0 max-w-[52ch] text-lg leading-snug text-muted">
              <span className="font-medium text-ink">{profile.title}</span> · LLM platform, billing and mobile at Vibecode, founding engineer at Gomini. Below: things I made move.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
            <ButtonLink variant="secondary" href={profile.resume} target="_blank" rel="noreferrer">Resume</ButtonLink>
            <TextLink className="text-sm text-muted" href={profile.xHighlights}>More on X</TextLink>
          </div>
        </header>

        <section aria-label="Lab" className="flex flex-col gap-8">
          <div className="reel-strip grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {phones.map((item, i) => <DevelopClip key={item.src} item={item} delay={i * 90} />)}
          </div>
          <div className="reel-strip grid gap-x-4 gap-y-8 sm:grid-cols-2">
            {wide.map((item, i) => <DevelopClip key={item.src} item={item} delay={i * 90} />)}
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-20">
          <Work />
          <Projects />
          <Contact />
        </div>
      </main>
    </div>
  );
}
