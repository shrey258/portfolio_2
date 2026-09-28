import { useState } from "react";
import { Tags } from "../src/components/Entry";
import { Section } from "../src/components/Section";
import { roles } from "../src/data/profile";
import type { Role } from "../src/data/profile";

// Throwaway: only the prototype picker imports this.
// Logo rows: the way recruiters skim (logo, one sentence, dates), with details on request.

// Every logo sits the way Vibecode's app icon does: a small rounded tile inset on a light plate.
// Vibecode's file already has the plate baked in, so it fills the frame.
const LOGOS: Record<string, { src: string; bg?: string; baked?: boolean }> = {
  Vibecode: { src: "/proto-logos/vibecode.png", baked: true },
  "Fleek.xyz": { src: "/proto-logos/fleek.png", bg: "#111" },
  Gomini: { src: "/proto-logos/gomini.png" },
  "IIT Madras · 5G Testbed": { src: "/proto-logos/institution.svg" },
};

function Logo({ role }: { role: Role }) {
  const logo = LOGOS[role.company];
  return (
    <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-[#f3f3f3] shadow-[0_0_0_1px_var(--rule)]" aria-hidden>
      {logo?.baked ? (
        <img src={logo.src} alt="" width={44} height={44} className="size-full object-cover" />
      ) : (
        <span className="grid size-[29px] place-items-center overflow-hidden rounded-[8px] shadow-[0_1px_2px_rgb(0_0_0/0.08)]" style={{ background: logo?.bg ?? "#fff" }}>
          {logo ? (
            <img src={logo.src} alt="" width={29} height={29} className="size-full object-cover" />
          ) : (
            <span className="font-serif text-lg leading-none text-muted">{role.company[0]}</span>
          )}
        </span>
      )}
    </span>
  );
}

function Row({ role, open, onToggle }: { role: Role; open: boolean; onToggle: () => void }) {
  const more = !!role.highlights;
  const head = (
    <>
      <Logo role={role} />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
          <span className="font-medium">
            {role.company} <span className="font-normal text-faint">· {role.title}</span>
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-faint tabular-nums">
            {role.dates}
            {more ? (
              <svg className={`chev ${open ? "is-open" : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <span className="w-3" aria-hidden />
            )}
          </span>
        </span>
        <span className="max-w-[62ch] leading-relaxed text-pretty text-muted">{role.summary}</span>
      </span>
    </>
  );
  return (
    <li className="logo-row border-b border-rule last:border-b-0" data-open={open || undefined}>
      {more ? (
        <button type="button" aria-expanded={open} onClick={onToggle} className="row-btn -mx-3 flex w-[calc(100%+1.5rem)] cursor-pointer items-start gap-4 rounded-2xl bg-transparent px-3 py-5 text-left">
          {head}
        </button>
      ) : (
        <div className="flex items-start gap-4 py-5">{head}</div>
      )}
      {more && (
        <div className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden pl-15" inert={!open}>
            <div className="flex max-w-[62ch] flex-col gap-3 pb-6">
              <ul className="m-0 flex list-none flex-col gap-2 p-0 leading-relaxed">
                {role.highlights!.map((h) => (
                  <li key={h} className="relative pl-4 text-pretty before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-faint">{h}</li>
                ))}
              </ul>
              <Tags items={role.tags} />
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export function WorkLogos() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Section id="work" title="Work">
      <ul className="m-0 list-none p-0">
        {roles.map((r) => (
          <Row key={r.company} role={r} open={open === r.company} onToggle={() => setOpen(open === r.company ? null : r.company)} />
        ))}
      </ul>
    </Section>
  );
}
