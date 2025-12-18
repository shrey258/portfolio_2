import React from "react";

interface StatItemProps {
  value: string;
  label: string;
}

export const StatItem = ({ value, label }: StatItemProps) => (
  <div>
    <div className="text-2xl font-bold text-white font-sans">{value}</div>
    <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
      {label}
    </div>
  </div>
);

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
