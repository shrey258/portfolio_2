import type { ComponentProps } from "react";

const variants = {
  primary: "bg-ink text-bg",
  secondary: "border border-rule text-ink",
};

type ButtonLinkProps = ComponentProps<"a"> & { variant?: keyof typeof variants };

// A link styled as a pill button. Links, not buttons, because every action here navigates.
export function ButtonLink({ variant = "primary", className = "", ...props }: ButtonLinkProps) {
  return (
    <a
      className={`pressable inline-flex h-11 items-center rounded-full px-5 text-sm font-medium no-underline ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
