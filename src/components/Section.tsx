import type { ComponentProps } from "react";

type SectionProps = ComponentProps<"section"> & { title: string };

export function Section({ title, children, className = "", ...props }: SectionProps) {
  return (
    <section
      className={`grid scroll-mt-10 gap-6 border-t border-rule pt-8 md:grid-cols-[180px_1fr] md:gap-10 ${className}`}
      {...props}
    >
      <h2 className="m-0 font-serif text-3xl leading-none font-normal md:sticky md:top-10 md:self-start">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
