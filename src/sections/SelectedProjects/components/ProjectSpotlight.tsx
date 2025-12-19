import { ArrowUpRight, Github } from 'lucide-react';
import type { ReactNode } from 'react';

interface ProjectSpotlightProps {
  title: string;
  subtitle: string;
  description: ReactNode;
  tags: string[];
  media: ReactNode;
  repoLink?: string;
  demoLink?: string;
}

const ProjectSpotlight = ({
  title,
  subtitle,
  description,
  tags,
  media,
  repoLink = '#',
  demoLink,
}: ProjectSpotlightProps) => {
  return (
    <div className="
      group w-full rounded-3xl overflow-hidden
      bg-linear-to-b from-[#141419]/90 to-[#050505]
      border border-white/10 hover:border-purple-500/40
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)]
    ">
      {/* Top Half (Media) */}
      {media}

      {/* Bottom Half (Content) */}
      <div className="p-6">
        
        {/* Title Row */}
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="m-0 text-2xl font-bold text-white font-sans">
              {title}
            </h3>
            <p className="m-0 mt-1 text-sm text-[#888] font-sans">
              {subtitle}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {/* GitHub Button */}
            <a 
              href={repoLink}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center justify-center w-9 h-9 rounded-full
                bg-white/5 border border-white/10 text-white
                transition-all duration-200
                hover:bg-white/10 hover:scale-105
                cursor-pointer
              "
            >
              <Github size={18} />
            </a>

            {/* View Project Button */}
            {demoLink && (
              <a 
                href={demoLink}
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center justify-center w-9 h-9 rounded-full
                  bg-purple-500/10 border border-purple-500/20 text-purple-500
                  transition-all duration-200
                  hover:bg-purple-500/20 hover:scale-105
                  cursor-pointer
                "
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="my-4 text-[15px] leading-relaxed text-[#aaa] font-sans">
          {description}
        </div>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="
              px-3 py-1 rounded-full
              bg-purple-500/10 border border-purple-500/20
              text-xs text-purple-300 font-medium font-sans
            ">
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectSpotlight;
