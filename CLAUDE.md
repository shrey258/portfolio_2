# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — TypeScript check + Vite production build (`tsc -b && vite build`)
- `npm run lint` — ESLint across the project
- `npm run preview` — Preview production build locally

No test framework is configured.

## Architecture

React 19 + TypeScript SPA using Vite, Tailwind CSS v4 (via `@tailwindcss/vite` plugin), and react-router-dom for client-side routing. Deployed on Vercel with SPA fallback rewrites in `vercel.json`.

**Routing** (`src/App.tsx`): Two routes — `/` (Home) and `/experience` (ExperiencePage). Uses `BrowserRouter`. Vercel Analytics is included at the router level.

**Pages** (`src/pages/`): `Home.tsx` composes the main page from sections in a 12-column grid layout. `ExperiencePage.tsx` is a standalone detail page for work history.

**Sections** (`src/sections/`): Each major homepage block (Engineering Log, Selected Projects, Writing, Footer, DesignLab) lives in its own folder under `src/sections/` with section-specific sub-components in a `components/` subfolder.

**Shared components** (`src/components/`): Reusable UI pieces — `IdentityCard`, `TopoBackground` (fixed canvas background), `LiquidGlassCard`, `TerminalCard`, `TagPill`, `CtaPill`, `SectionHeader`, `TechArsenalGrid`.

**Animation**: Uses `motion` (Framer Motion v12+) extensively with `useReducedMotion` support. Animations use `whileInView` reveal patterns with staggered children.

**Styling**: Mix of Tailwind utility classes and inline `style` objects. Global styles in `src/index.css` and `src/App.css`. Font: Inter (system) + Instrument Serif (Google Fonts, loaded in `index.html`).
