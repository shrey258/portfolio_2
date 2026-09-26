import { Analytics } from "@vercel/analytics/react";
import { Contact } from "./sections/Contact";
import { Intro } from "./sections/Intro";
import { Lab } from "./sections/Lab";
import { Projects } from "./sections/Projects";
import { Stack } from "./sections/Stack";
import { Work } from "./sections/Work";
import { Writing } from "./sections/Writing";

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-10 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to work
      </a>
      <main className="mx-auto flex max-w-[1080px] flex-col gap-20 px-5 pt-16 pb-12 sm:px-8 md:pt-24">
        <Intro />
        <Work />
        <Lab />
        <Projects />
        <Stack />
        <Writing />
        <Contact />
      </main>
      <Analytics />
    </>
  );
}
