// Single source for all site copy. Mirrors the private portfolio.md in ~/Documents/resume.

export const profile = {
  name: "Shreyansh Gupta",
  title: "Product Engineer",
  tagline:
    "I own products end to end: mobile, web, billing and LLM platforms, and the production incidents in between. On the side, I build interaction studies.",
  location: "Darjeeling, India",
  hours: "Open to US hours",
  email: "gshrey258@gmail.com",
  github: "https://github.com/shrey258",
  linkedin: "https://linkedin.com/in/shrey258",
  x: "https://x.com/shreyg258",
  xHighlights: "https://x.com/shreyg258/highlights",
  cal: "https://cal.com/shrey258/15min",
  resume: "/Shreyansh_Gupta_Resume.pdf",
};

export type Role = {
  company: string;
  title: string;
  dates: string;
  summary: string;
  highlights?: string[];
  tags: string[];
  featured?: boolean;
};

export const roles: Role[] = [
  {
    company: "Vibecode",
    title: "Software Engineer",
    dates: "Feb – Sep 2026",
    summary:
      "The mobile app that builds mobile apps. 131 merged PRs across the app, a Go routing proxy and the agent sandbox.",
    highlights: [
      "Shipped 7 LLMs end to end (Opus 5, Fable 5.1, GPT-6 Astra, GLM 5.3, Grok 4.6…): picker, Go routing + per-token pricing, sandbox image.",
      "Billing: card-required trials that auto-convert, a 7-day downgrade grace period, auto-reload tiers.",
      "Led the Amplitude → Mixpanel migration, ~12k lines across backend, web and iOS.",
      "Root-caused production incidents, like a rate limiter that gave every customer one shared bucket.",
      "Expo SDK 54 / React Native 0.81 migration and nested subagent streaming in the agent UI.",
    ],
    tags: ["TypeScript", "Go", "LLM Platform", "Billing", "Expo"],
    featured: true,
  },
  {
    company: "Fleek.xyz",
    title: "Frontend Engineer · Contract",
    dates: "Aug – Dec 2025",
    summary:
      "Full-stack work across 6 repos under a frontend title. Built a React + Tauri desktop app from scratch that holds 60fps in data-heavy views.",
    highlights: [
      "Tailwind component design system shared across production codebases.",
      "Social features: public browsing, @mention autocomplete, an AI-prompt profanity filter.",
      "Moved media to Cloudflare R2, added Statsig remote config, shipped a FLUX image bot on Fly.io.",
    ],
    tags: ["TypeScript", "React", "Tauri", "Cloudflare R2"],
    featured: true,
  },
  {
    company: "Gomini",
    title: "Founding Engineer",
    dates: "Mar 2025 – Feb 2026",
    summary:
      "Built the Flutter app and Supabase backend 0 → 1 as the sole engineer, before the company incorporated. It became the company’s digital sales channel.",
    highlights: [
      "Payments: Razorpay and Flexi-Pay subscriptions with a fail-safe for incomplete payments.",
      "KYC with live status, referral deep links, FCM push, gesture-driven UI with shared-element transitions.",
    ],
    tags: ["Flutter", "Supabase", "Riverpod", "Razorpay"],
    featured: true,
  },
  {
    company: "Subscart",
    title: "Software Engineer",
    dates: "Mar – Jun 2025",
    summary: "Subscription platform in Flutter, Node.js and MongoDB. 10+ REST APIs, optimistic UI.",
    tags: ["Flutter", "Node.js", "MongoDB"],
  },
  {
    company: "Iotree Minds",
    title: "Mobile Engineer",
    dates: "Dec 2024 – Mar 2025",
    summary:
      "Launch features for a client’s Flutter matchmaking app, 500+ downloads in month one. Built the “My Clients” module.",
    tags: ["Flutter", "APIs"],
  },
  {
    company: "IIT Madras · 5G Testbed",
    title: "Research Intern",
    dates: "2023, 2024",
    summary: "A 1 Gbps Python speed-test server with <5% variance, and a Flutter app with sub-second live readings.",
    tags: ["Python", "Networking", "Flutter"],
  },
];

export type Project = {
  name: string;
  line: string;
  detail: string;
  tags: string[];
  href: string;
};

export const projects: Project[] = [
  {
    name: "Flag Me",
    line: "An AI shopping assistant before ChatGPT had one.",
    detail:
      "Gemini turns a person’s details into specific gifts, then scrapers pull live prices from Amazon, Flipkart and Myntra with affiliate links.",
    tags: ["Flutter", "FastAPI", "Gemini"],
    href: "https://github.com/shrey258/flag_me",
  },
  {
    name: "Video Editor Agent",
    line: "Edit video by talking to it.",
    detail:
      "Gemini parses plain-English edits into trims, cuts and speed changes on an FFmpeg backend, with a sprite-sheet timeline for instant scrubbing.",
    tags: ["Next.js", "FastAPI", "FFmpeg", "Gemini"],
    href: "https://github.com/shrey258/video_editor_agent",
  },
  {
    name: "CampusApp",
    line: "Attendance, timetable and grades for SRM students.",
    detail: "A Flutter + Riverpod student app, still maintained.",
    tags: ["Flutter", "Riverpod"],
    href: "https://github.com/CampusDataSRM/CampusApp",
  },
];

export const stack = [
  { group: "Languages", items: ["TypeScript", "Go", "Python", "Dart"] },
  { group: "Product", items: ["React", "Next.js", "React Native", "Expo", "Flutter"] },
  { group: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "Stripe", "LLM routing"] },
  { group: "Craft", items: ["Motion", "Reanimated", "Tailwind", "Rive", "Figma"] },
];

export const writing = [
  {
    title: "Building a receipt printer animation in React Native",
    where: "React Native Components",
    href: "https://reactnativecomponents.com/articles/building-a-receipt-printer-animation-in-react-native",
  },
];

export type LabItem = {
  title: string;
  tech: string;
  src: string;
  width: number;
  height: number;
};

// Phone-sized clips first, then the two wide ones; the layout follows their shape.
export const lab: LabItem[] = [
  { title: "Receipt printer", tech: "Reanimated", src: "receipt", width: 540, height: 1174 },
  { title: "Liquid glass login", tech: "Reanimated", src: "login", width: 540, height: 1174 },
  { title: "Water reflection", tech: "Expo", src: "reflection", width: 540, height: 1174 },
  { title: "Paparazzi loader", tech: "CSS keyframes", src: "paparazzi", width: 540, height: 1174 },
  { title: "Profile card", tech: "Motion", src: "profile-card", width: 1280, height: 830 },
  { title: "X-ray", tech: "Pure CSS", src: "xray", width: 1280, height: 838 },
];
