export function Tags({ items }: { items: string[] }) {
  return <p className="m-0 font-mono text-xs text-faint">{items.join(" · ")}</p>;
}
