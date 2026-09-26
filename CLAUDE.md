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

- `src/data/profile.ts`: all copy (roles, projects, lab clips, stack, stats). It mirrors the private `portfolio.md` in `~/Documents/resume`; change copy there first, then here. Only use claims and numbers listed there.
- `src/App.tsx`: the whole page, plus `Section`, `LabVideo` (plays only while on screen, respects reduced motion) and `LocalTime`.
- `src/index.css`: color tokens in OKLCH (warm paper/ink, Darjeeling tea-green accent) with a dark theme via `prefers-color-scheme`, exposed to Tailwind through `@theme inline`.
- `public/lab/`: re-encoded clips (H.264, faststart, no audio) and `.webp` posters. `public/fonts/`: self-hosted Instrument Serif, preloaded in `index.html`. `public/og.png`: social card.

Design rules: no glass, glows, gradients or scroll-triggered fades. Hover styles only under `(hover: hover)`; name transition properties, never `transition: all`.
