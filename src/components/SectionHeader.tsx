import React from "react";
import CtaPill from "./CtaPill";

interface SectionHeaderProps {
  label: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaIcon?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  subLabel?: string;
  subLabelClassName?: string;
  showDivider?: boolean;
  icon?: React.ReactNode;
  iconWrapperClassName?: string;
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
  subLabel,
  subLabelClassName = "text-lg font-semibold text-white",
  showDivider = true,
  icon,
  iconWrapperClassName,
}: SectionHeaderProps) => {
  const containerClasses = [
    "flex items-center gap-4",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className="flex items-center gap-2">
        {icon &&
          (iconWrapperClassName ? (
            <div className={iconWrapperClassName}>{icon}</div>
          ) : (
            icon
          ))}
        <div className="flex flex-col">
          <h2 className={labelClassName}>{label}</h2>
          {subLabel && <span className={subLabelClassName}>{subLabel}</span>}
        </div>
      </div>
      {showDivider && <div className="h-px flex-1 bg-white/10" />}
      {ctaLabel && ctaHref && (
        <CtaPill
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          label={ctaLabel}
          icon={ctaIcon}
          className="hidden md:flex"
        />
      )}
    </div>
  );
};

export default SectionHeader;
