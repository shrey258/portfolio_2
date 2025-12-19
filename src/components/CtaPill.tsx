import React from "react";

interface CtaPillProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const CtaPill: React.FC<CtaPillProps> = ({
  label,
  icon,
  className = "",
  ...rest
}) => {
  const base =
    "group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm";
  const combined = [base, className].filter(Boolean).join(" ");

  return (
    <a className={combined} {...rest}>
      <span className="text-sm font-medium text-white/90">{label}</span>
      {icon}
    </a>
  );
};

export default CtaPill;
