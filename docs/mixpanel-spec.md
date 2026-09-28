# Mixpanel analytics

## Why
Four questions, one page:

- **Who** visits: country, city, device, and where they came from.
- **What** they look at: which sections they reach, and which jobs they open.
- **What** they click: email, resume, call, socials, projects.
- **Where** they drop off: they reach Contact but don't email.

## Done when
- A local visit shows up in Mixpanel Live View with a page view, 5 section events, and a click event for every link.
- The funnel `hero_section_viewed → contact_section_viewed → email_clicked` has data.
- With no token set, nothing is sent, and `npm run build` passes.

---

## Events

### Automatic (no code)
Page view, country and city, browser, OS, device, referrer, and UTM params.

### Sections
Each section event fires once per visit, when the section reaches the top 60% of the screen. A visible-percentage rule would never fire for Lab, which is taller than the screen.

| Event | Section |
|---|---|
| `hero_section_viewed` | Hero |
| `work_section_viewed` | Work |
| `lab_section_viewed` | Lab |
| `projects_section_viewed` | Projects |
| `contact_section_viewed` | Contact |

### Clicks
Every click event also sends `href` and `section`, the section the click happened in.

| Event | Props | Links |
|---|---|---|
| `email_clicked` | — | Hero "Email me", Contact email |
| `resume_clicked` | — | Hero "Resume" |
| `book_call_clicked` | — | Contact "Book 15 minutes" |
| `social_clicked` | `platform`: github, linkedin, x | Hero GitHub / LinkedIn / X, Lab "X" |
| `project_clicked` | `project` | Flag Me, Video Editor Agent, CampusApp |
| `writeup_clicked` | — | Lab "write-up" |
| `work_role_expanded` | `company` | Opening a Work row |

---

## Build

**Install:** `mixpanel-browser` and `@types/mixpanel-browser`.

**Env:** set `VITE_MIXPANEL_TOKEN` to the **project token** (Project Settings → Access Keys).
- Put it in `.env.local` and in Vercel, Production only.
- It's public by design.
- Don't use the service account. It's for server APIs and must never be in a `VITE_` var.

**New file, `src/analytics.ts`:**
1. If there's no token, return.
2. Lazy-load `mixpanel-browser/dist/mixpanel-core.cjs.js` (no session replay, 36 kB gzipped, in its own chunk) and call `mixpanel.init`, register `env` (development / production) on every event, then `track_pageview()`.
3. Set up section views: one `IntersectionObserver` over `[data-section]` that fires `${name}_section_viewed` once per section.
4. Set up clicks: one `click` listener on `document`. It reads `closest("[data-track]")` and sends the event name plus the element's `data-*` attributes, `href`, and the enclosing `data-section`.
5. Export `track()` for the one non-link event.

Start it once from a `useEffect` in `src/App.tsx`, so the sections are in the DOM before the observer runs.

**Markup:**
- `Section.tsx`: add `data-section={id}`. That one line covers Work, Lab and Projects.
- `Hero.tsx` `<header>`: add `data-section="hero"`.
- `Contact.tsx` `<footer>`: add `data-section="contact"`.
- Each link in the clicks table gets `data-track="…"`, plus props like `data-platform="github"`. `ButtonLink` and `TextLink` already pass extra props through, so the components themselves don't change.
- `Work.tsx` `onToggle`: `track("work_role_expanded", { company })` when a row opens.

---

## Reports to set up
1. **Contact funnel:** hero → contact → email. Make a second one that ends in resume.
2. **Scroll reach:** each `*_section_viewed` divided by page views.
3. **Top clicks:** all click events broken down by `href`.
4. **Roles people open:** `work_role_expanded` broken down by `company`.
5. **Audience:** page views broken down by referrer, country and device.

## Limits
- **Resume and email are clicks.** They can't prove the PDF was saved or that an email was sent.
- **Ad blockers hide some visitors.** The fix, if the numbers look low, is a Vercel rewrite proxy.
- **Company names** ("someone from Stripe") need a reverse-IP service. Not in scope.

## Not doing
Login/identify, cookie banner, Lab video play tracking, time-on-section.
