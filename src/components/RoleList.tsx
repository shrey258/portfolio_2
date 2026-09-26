import type { Role } from "../data/profile";
import { Tags } from "./Section";

function RoleHeading({ role }: { role: Role }) {
  return (
    <>
      <h3 className="m-0 text-base font-medium">
        {role.company} <span className="font-normal text-muted">· {role.title}</span>
      </h3>
      <span className="font-mono text-xs text-faint tabular-nums">{role.dates}</span>
    </>
  );
}

function RoleBody({ role }: { role: Role }) {
  return (
    <>
      <p className="m-0 max-w-[65ch] leading-relaxed text-muted">{role.summary}</p>
      {role.highlights && (
        <ul className="m-0 flex max-w-[65ch] list-none flex-col gap-2 p-0 leading-relaxed">
          {role.highlights.map((h) => (
            <li key={h} className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-faint">
              {h}
            </li>
          ))}
        </ul>
      )}
      <Tags items={role.tags} />
    </>
  );
}

const row = "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1";

// Featured roles are always open; earlier ones collapse into native <details> that expand in place.
export function RoleList({ roles }: { roles: Role[] }) {
  return (
    <div className="flex flex-col">
      {roles.map((role, i) => {
        const divider = i ? "border-t border-rule" : "pt-0";
        if (role.featured) {
          return (
            <article key={role.company} className={`flex flex-col gap-3 py-6 ${divider}`}>
              <div className={row}>
                <RoleHeading role={role} />
              </div>
              <RoleBody role={role} />
            </article>
          );
        }
        return (
          <details key={role.company} className={`disclosure py-2 ${divider}`}>
            <summary className={`${row} disclosure-summary cursor-pointer list-none py-4`}>
              <RoleHeading role={role} />
            </summary>
            <div className="flex flex-col gap-3 pb-4">
              <RoleBody role={role} />
            </div>
          </details>
        );
      })}
    </div>
  );
}
