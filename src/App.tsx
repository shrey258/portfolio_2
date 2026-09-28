import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { startAnalytics } from "./analytics";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Lab } from "./sections/Lab";
import { Projects } from "./sections/Projects";
import { Work } from "./sections/Work";

export default function App() {
  useEffect(() => {
    startAnalytics();
  }, []);
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-10 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to work
      </a>
      <Hero />
      <main className="mx-auto mt-20 flex max-w-[1080px] flex-col gap-20 px-4 pb-32 sm:px-8">
        <Work />
        <Lab />
        <Projects />
        <Contact />
      </main>
      <Analytics />
    </>
  );
}
