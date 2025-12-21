import React, { useEffect, useMemo, useState } from "react";
import { animate } from "motion";
import { cubicBezier, useReducedMotion } from "motion/react";

interface StatItemProps {
  value: string;
  label: string;
  animate?: boolean;
  delay?: number;
}

export const StatItem = ({
  value,
  label,
  animate: shouldAnimate = false,
  delay = 0,
}: StatItemProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prefersReducedMotion = useReducedMotion();
  const easing = useMemo(() => cubicBezier(0.19, 1, 0.22, 1), []);

  const segments = useMemo(() => {
    const match = value.match(/-?\d+(\.\d+)?/);
    if (!match || match.index === undefined) return null;
    const numeric = parseFloat(match[0]);
    return {
      prefix: value.slice(0, match.index),
      suffix: value.slice(match.index + match[0].length),
      number: numeric,
      decimals: match[0].includes(".")
        ? match[0].split(".")[1].length
        : 0,
    };
  }, [value]);

  const shouldRunAnimation =
    !!segments && shouldAnimate && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldRunAnimation || !segments) {
      return;
    }

    const controls = animate(0, segments.number, {
      duration: 1,
      delay: delay + 0.2,
      ease: easing,
      onUpdate: (latest) => {
        const formatted = segments.decimals
          ? latest.toFixed(segments.decimals)
          : Math.round(latest).toString();
        setDisplayValue(`${segments.prefix}${formatted}${segments.suffix}`);
      },
    });

    return () => controls.stop();
  }, [shouldRunAnimation, segments, delay, easing]);

  return (
    <div>
      <div className="text-2xl font-bold text-white font-sans tabular-nums">
        {shouldRunAnimation ? displayValue : value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
        {label}
      </div>
    </div>
  );
};

interface InfoPillProps {
  icon: React.ReactNode;
  text: React.ReactNode;
}

export const InfoPill = ({ icon, text }: InfoPillProps) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
    {icon}
    <span className="text-xs font-mono text-white/80">{text}</span>
  </div>
);

interface SocialButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export const SocialButton = ({ icon, onClick }: SocialButtonProps) => (
  <button
    onClick={onClick}
    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
  >
    {icon}
  </button>
);
