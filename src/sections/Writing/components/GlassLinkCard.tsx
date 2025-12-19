import React from "react";

interface GlassLinkCardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

const GlassLinkCard: React.FC<GlassLinkCardProps> = ({
  className = "",
  children,
  ...rest
}) => {
  const base =
    "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-5 hover:border-white/25 transition-all duration-300";
  const combined = [base, className].filter(Boolean).join(" ");

  return (
    <a className={combined} {...rest}>
      {children}
    </a>
  );
};

export default GlassLinkCard;
