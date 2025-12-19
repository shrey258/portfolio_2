interface TagPillProps {
  label: string;
  className?: string;
}

const TagPill = ({ label, className = "" }: TagPillProps) => {
  const base =
    "px-3 py-1 rounded-full bg-white/10 text-xs text-white/80 font-sans";
  const combined = [base, className].filter(Boolean).join(" ");
  return <span className={combined}>{label}</span>;
};

export default TagPill;
