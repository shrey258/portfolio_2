import type { ComponentProps } from "react";

// External links open in a new tab by default; pass target/rel to override.
export function TextLink({ className = "", href = "", ...props }: ComponentProps<"a">) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      className={`link ${className}`}
      {...props}
    />
  );
}
