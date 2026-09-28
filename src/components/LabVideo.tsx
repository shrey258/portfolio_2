import { useEffect, useRef, useState } from "react";
import type { LabItem } from "../data/profile";

// Plays only while on screen; with reduced motion it waits for the viewer to press play.
export function LabVideo({ item }: { item: LabItem }) {
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
      <figcaption className="flex flex-col gap-0.5 text-sm">
        <span>{item.title}</span>
        <span className="font-mono text-xs text-faint">{item.tech}</span>
      </figcaption>
    </figure>
  );
}
