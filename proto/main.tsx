import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import "./picker.css";
import "./proto.css";
import Horizon from "./Horizon";
import { WorkLogos } from "./work";

const variants = [
  { name: "Horizon", C: () => <Horizon /> },
  { name: "Logos", C: () => <Horizon work={<WorkLogos />} /> },
];

function Harness() {
  const [current, setCurrent] = useState(() => {
    const v = parseInt(new URLSearchParams(location.search).get("v") ?? "1", 10);
    return v >= 1 && v <= variants.length ? v - 1 : 0;
  });
  const [mountKey, setMountKey] = useState(0);
  const nav = useRef<HTMLElement>(null);
  const highlight = useRef<HTMLSpanElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    if (i < 0 || i >= variants.length) return;
    setCurrent(i);
    setMountKey((k) => k + 1);
    const url = new URL(location.href);
    url.searchParams.set("v", String(i + 1));
    history.replaceState(null, "", url);
  };

  useLayoutEffect(() => {
    const move = () => {
      const el = items.current[current];
      if (!el || !highlight.current) return;
      highlight.current.style.width = el.offsetWidth + "px";
      highlight.current.style.transform = `translateX(${el.offsetLeft}px)`;
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [current]);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => nav.current?.setAttribute("data-ready", "")));
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = parseInt(e.key, 10);
      setCurrent((cur) => {
        let next = cur;
        if (n >= 1 && n <= variants.length) next = n - 1;
        else if (e.key === "ArrowRight") next = (cur + 1) % variants.length;
        else if (e.key === "ArrowLeft") next = (cur - 1 + variants.length) % variants.length;
        else if (e.key === "r" || e.key === "R") { setMountKey((k) => k + 1); return cur; }
        else return cur;
        const url = new URL(location.href);
        url.searchParams.set("v", String(next + 1));
        history.replaceState(null, "", url);
        setMountKey((k) => k + 1);
        return next;
      });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const { C } = variants[current];
  return (
    <>
      <C key={mountKey} />
      <nav ref={nav} className="proto-picker" aria-label="Prototype variants">
        <span ref={highlight} className="proto-picker-highlight" aria-hidden="true" />
        {variants.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => { items.current[i] = el; }}
            className="proto-picker-item"
            data-active={i === current ? "" : undefined}
            aria-current={i === current ? "true" : undefined}
            onClick={() => select(i)}
          >
            {v.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={() => setMountKey((k) => k + 1)}>↻</button>
      </nav>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Harness />
  </StrictMode>,
);
