# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — TypeScript check + Vite production build (`tsc -b && vite build`)
- `npm run lint` — ESLint across the project
- `npm run preview` — Preview production build locally

No test framework is configured.

## Architecture

React 19 + TypeScript single page (Vite, Tailwind CSS v4). No router: `/experience` is redirected to `/#work` in `src/main.tsx`; Vercel rewrites everything to `index.html`.

- `src/data/profile.ts`: all copy (roles with their logos, projects, lab clips, writing). It mirrors the private `portfolio.md` in `~/Documents/resume`, which is the source of truth: change copy there first, then here. Only use claims and numbers listed there.
- `src/App.tsx`: a skip link, then `Hero`, then `src/sections/` (Work, Lab, Projects, Contact), one file per section.
- `src/sections/Hero.tsx`: the dithered Darjeeling horizon (`Dither`), the name with a live IST clock, and a glass card with the pitch, email, resume and profile links. The sun becomes a crescent moon from 6pm to 6am IST. The name fades in and the card rises once on load.
- `src/sections/Work.tsx`: logo rows (logo tile, one-line summary, dates). Rows with highlights open on click (grid-rows 0fr→1fr) and show a chevron; rows without them are static.
- `src/components/`: `Dither` (WebGL Bayer 8×8 dither of sky, sun and three tea-hill ridgelines; 4px dots, 20fps cap, paused off-screen, one still frame under reduced motion; props: `ink`, `paper`, `moon`), `Section` (ruled section with sticky serif label), `Tags`, `ButtonLink` (`variant="primary" | "secondary"`), `TextLink` (opens external links in a new tab), `LabVideo` (plays only on screen, respects reduced motion), `LocalTime` (IST). Components take `className` and spread remaining HTML props. Extract a component only once a pattern repeats.
- `src/index.css`: color tokens in OKLCH (warm paper/ink, Darjeeling tea-green accent), exposed to Tailwind through `@theme inline`. Light only: there is no dark theme (it was tried and rejected; the hills are drawn on paper). Also holds `.glass`, the intro keyframes, the work-row hover and chevron styles, `.link`, `.pressable` and `.hit`.
- `public/lab/`: re-encoded clips (H.264, faststart, no audio, phone clips at 540×1174) and `.webp` posters; `lab` in `profile.ts` lists them. `public/logos/`: company logos for Work. `public/fonts/`: self-hosted Instrument Serif, preloaded in `index.html`. `public/og.png`: social card.

## Design rules

- Calm and readable for recruiters: few words, a clear next step (email, resume), no clutter.
- Glass is only for the hero card, which sits over the dither. No glows, extra gradients, or scroll-triggered fades elsewhere.
- Rejected before, so don't bring them back without asking: dark mode, dithered logos, a "Details" button on work rows, and the Calm, Index, Timeline and Proof layouts.
- Hover styles only under `(hover: hover) and (pointer: fine)`; name transition properties, never `transition: all`. Every animation has a reduced-motion path.
- Tap targets are at least 44px: use `.hit` on small standalone links.
- Projects link to live products (App Store, Vercel), not private repos.
