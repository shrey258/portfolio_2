import { useEffect, useLayoutEffect, useRef, useState } from "react";

type NavItem = { id: string; label: string };

const itemClass = "flex h-9 items-center px-3.5 text-sm no-underline";

/*
 * Two identical rows of links stacked on top of each other. The top row is inked and clipped
 * to the active link, so the highlight slides by animating one clip-path, not layout.
 */
export function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inkRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el) => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    // The last section is short and may never reach the middle band, so the page bottom claims it.
    const onScroll = () => {
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(items[items.length - 1].id);
      else if (scrollY < innerHeight * 0.3) setActive(null);
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, [items]);

  useLayoutEffect(() => {
    const list = listRef.current;
    const ink = inkRef.current;
    if (!list || !ink) return;
    const place = () => {
      const link = active ? list.querySelector<HTMLElement>(`[href="#${active}"]`) : null;
      if (!link) {
        ink.style.opacity = "0";
        return;
      }
      const right = list.offsetWidth - link.offsetLeft - link.offsetWidth;
      ink.style.opacity = "1";
      ink.style.clipPath = `inset(0 ${right}px 0 ${link.offsetLeft}px round 999px)`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  return (
    <nav
      aria-label="Sections"
      className="fixed top-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-rule bg-bg/85 p-1 backdrop-blur-md"
    >
      <div className="relative">
        <ul ref={listRef} className="m-0 flex list-none p-0 text-muted">
          {items.map((i) => (
            <li key={i.id}>
              <a href={`#${i.id}`} aria-current={active === i.id ? "location" : undefined} className={`nav-link ${itemClass}`}>
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        <ul
          ref={inkRef}
          aria-hidden
          style={{ opacity: 0, clipPath: "inset(0 50% 0 50% round 999px)" }}
          className="nav-ink pointer-events-none absolute inset-0 m-0 flex list-none rounded-full bg-ink p-0 text-bg">
          {items.map((i) => (
            <li key={i.id} className={itemClass}>
              {i.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
