import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { flushSync } from "react-dom";
import type { LabItem } from "../data/profile";
import { REDUCED_MOTION, useMediaQuery } from "../hooks/useMediaQuery";

const MEDIA = "lab-media";

// Runs a DOM update inside a view transition when the browser supports one and motion is allowed.
function transition(update: () => void, reduced: boolean): Promise<void> {
  if (reduced || !document.startViewTransition) {
    update();
    return Promise.resolve();
  }
  return document.startViewTransition(update).finished;
}

type LabClipProps = Omit<ComponentProps<"video">, "src" | "poster"> & { item: LabItem; playInView?: boolean };

// A muted looping clip. With playInView it only plays while on screen.
export function LabClip({ item, playInView = false, className = "", ...props }: LabClipProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useMediaQuery(REDUCED_MOTION);

  useEffect(() => {
    const video = ref.current;
    if (!video || !playInView || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [playInView, reduced]);

  return (
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
      className={`block h-auto w-full ${className}`}
      {...props}
    />
  );
}

/*
 * Tiles open into a modal <dialog>. The clip keeps one view-transition name as it moves
 * between tile and dialog, so the browser morphs it from its spot in the grid.
 */
export function LabGallery({ items }: { items: LabItem[] }) {
  const [active, setActive] = useState<LabItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tiles = useRef(new Map<string, HTMLElement>());
  const reduced = useMediaQuery(REDUCED_MOTION);

  // Only one element may hold the name at a time, so naming a tile clears every other one.
  const nameTile = (src: string | null) => {
    tiles.current.forEach((el, key) => (el.style.viewTransitionName = key === src ? MEDIA : ""));
  };

  const open = (item: LabItem) => {
    nameTile(item.src);
    transition(() => {
      nameTile(null);
      flushSync(() => setActive(item));
      dialogRef.current?.showModal();
    }, reduced).finally(() => nameTile(null));
  };

  const close = () => {
    const src = active?.src ?? null;
    transition(() => {
      flushSync(() => setActive(null));
      dialogRef.current?.close();
      nameTile(src);
    }, reduced).finally(() => nameTile(null));
  };

  const phones = items.filter((i) => i.height > i.width);
  const wide = items.filter((i) => i.width >= i.height);

  const tile = (item: LabItem) => (
    <figure key={item.src} className="m-0 flex flex-col gap-3">
      <button
        type="button"
        onClick={() => open(item)}
        aria-label={`Open ${item.title}`}
        className="lab-tile pressable block cursor-zoom-in overflow-hidden rounded-[14px] bg-surface p-0"
        ref={(el) => {
          if (el) tiles.current.set(item.src, el);
          else tiles.current.delete(item.src);
        }}
      >
        <LabClip item={item} playInView aria-hidden className="pointer-events-none" />
      </button>
      <figcaption className="flex items-baseline justify-between gap-3 text-sm">
        <span>{item.title}</span>
        <span className="font-mono text-xs text-faint">{item.tech}</span>
      </figcaption>
    </figure>
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">{phones.map(tile)}</div>
      <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2">{wide.map(tile)}</div>

      <dialog
        ref={dialogRef}
        aria-label={active?.title}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="lab-dialog m-auto max-h-none max-w-none bg-transparent p-4 text-ink backdrop:bg-transparent"
      >
        {active && (
          <figure className="m-0 flex flex-col items-center gap-4">
            <div
              className="overflow-hidden rounded-[20px] bg-surface"
              style={{ viewTransitionName: MEDIA, aspectRatio: `${active.width} / ${active.height}` }}
            >
              <LabClip item={active} autoPlay={!reduced} controls={reduced} className="max-h-[80dvh] w-auto" />
            </div>
            <figcaption className="flex w-full items-center justify-between gap-6 text-sm">
              <span>
                {active.title} <span className="font-mono text-xs text-faint">· {active.tech}</span>
              </span>
              <button
                type="button"
                onClick={close}
                className="pressable inline-flex h-11 items-center rounded-full border border-rule bg-bg px-4 text-sm"
              >
                Close
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
