import type { ComponentProps } from "react";

// A ruled list of entries (jobs, projects). Dividers come from the list, so entries stay order-agnostic.
export function EntryList({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`flex flex-col divide-y divide-rule [&>*]:py-6 [&>*:first-child]:pt-0 ${className}`} {...props} />;
}

export function Entry({ className = "", ...props }: ComponentProps<"article">) {
  return <article className={`flex flex-col gap-3 ${className}`} {...props} />;
}

export function Tags({ items }: { items: string[] }) {
  return <p className="m-0 font-mono text-xs text-faint">{items.join(" · ")}</p>;
}
