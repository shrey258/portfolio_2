import React from "react";

interface SectionHeaderProps {
  label: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  showDivider?: boolean;
}

/**
 * Reusable bar header with label, divider line, and optional CTA pill.
 * Visually matches the Design Lab header used across sections.
 */
const SectionHeader = ({
  label,
  ctaLabel,
  ctaHref,
  ctaIcon,
  className = "",
  labelClassName = "text-xl font-mono text-white/60 uppercase tracking-widest whitespace-nowrap",
  showDivider = true,
}: SectionHeaderProps) => {
  const containerClasses = [
    "flex items-center gap-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <h2 className={labelClassName}>
        {label}
      </h2>
      {showDivider && <div className="h-px flex-1 bg-white/10" />}
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-white/90">{ctaLabel}</span>
          {ctaIcon}
        </a>
      )}
    </div>
  );
};

export default SectionHeader;
