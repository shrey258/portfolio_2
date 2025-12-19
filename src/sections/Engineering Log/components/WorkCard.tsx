import { useState } from "react";
import TagPill from "../../../components/TagPill";

interface WorkCardProps {
  title: string;
  role: string;
  date?: string;
  description: string;
  tags: string[];
  variant?: "full" | "compact";
}

const WorkCard = ({
  title,
  role,
  date,
  description,
  tags,
  variant = "full",
}: WorkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCompact = variant === "compact";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        flex flex-col justify-between h-full p-6 rounded-[20px] transition-all duration-300 ease-out cursor-grab
        ${isHovered 
          ? "bg-white/5 border-white/20 -translate-y-[2px]" 
          : "bg-white/3 border-white/5 translate-y-0"
        }
        border
      `}
    >
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className={`m-0 text-white font-bold font-sans ${isCompact ? "text-lg" : "text-[22px]"}`}>
            {title}
          </h3>
          {date && (
            <span className="font-mono text-[13px] text-white/40">
              {date}
            </span>
          )}
        </div>

        {/* Role */}
        <div className="mb-3">
          <span className="font-mono text-[13px] text-[#4ade80] tracking-wide">
            {role}
          </span>
        </div>

        {/* Description */}
        <p className={`
          m-0 mb-6 text-[15px] leading-relaxed text-[#aaaaaa] font-sans
          ${isCompact ? "line-clamp-3" : ""}
        `}>
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.slice(0, isCompact ? 3 : undefined).map((tag, index) => (
          <TagPill key={index} label={tag} />
        ))}
        {isCompact && tags.length > 3 && (
          <span className="px-3 py-1 text-xs text-white/40 font-sans">
            +{tags.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
