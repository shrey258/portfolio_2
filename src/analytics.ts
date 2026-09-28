import type { Mixpanel } from "mixpanel-browser";

const token = import.meta.env.VITE_MIXPANEL_TOKEN as string | undefined;
let started = false;
let mixpanel: Mixpanel | undefined;

export function track(event: string, props?: Record<string, unknown>) {
  mixpanel?.track(event, props);
}

// Section views and link clicks are declared in markup (data-section, data-track); this wires both once.
export async function startAnalytics() {
  if (!token || started) return;
  started = true;
  // Loaded after first paint in its own chunk. The core build leaves out session replay (~95 kB gzipped).
  mixpanel = (await import("mixpanel-browser/dist/mixpanel-core.cjs.js")).default;
  mixpanel.init(token, { persistence: "localStorage", debug: import.meta.env.DEV });
  // Local visits land in the same project; charts filter on env = production.
  // Registered before the page view so every event, including that one, carries it.
  mixpanel.register({ env: import.meta.env.MODE });
  mixpanel.track_pageview();

  // A section counts as viewed once any of it reaches the top 60% of the screen.
  // A visible-ratio threshold would never fire for sections taller than the screen, like Lab.
  const seen = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        track(`${(e.target as HTMLElement).dataset.section}_section_viewed`);
        seen.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -40% 0px" },
  );
  document.querySelectorAll("[data-section]").forEach((el) => seen.observe(el));

  document.addEventListener("click", (e) => {
    const el = (e.target as Element).closest<HTMLElement>("[data-track]");
    if (!el) return;
    const { track: event, ...props } = el.dataset;
    track(event!, {
      ...props,
      href: el.getAttribute("href"),
      section: el.closest<HTMLElement>("[data-section]")?.dataset.section,
    });
  });
}
