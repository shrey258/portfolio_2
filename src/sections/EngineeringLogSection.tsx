import { useState } from 'react';
import { ArrowRight, Layers, NotebookPen } from 'lucide-react'; // Added 'Layers' icon
import SectionHeader from '../components/SectionHeader';
import WorkCard from '../components/WorkCard';

const EngineeringLogSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="h-full">
      <SectionHeader
        label="Engineering Log"
        className="mb-6"
        labelClassName="text-base font-mono text-white/50 tracking-widest uppercase whitespace-nowrap"
        showDivider={false}
        icon={<NotebookPen size={16} className="text-white/60" />}
      />
      
      {/* CONTENT LIST - Vertical Stack for Sidebar Layout */}
      <div className="flex flex-col gap-4 w-full">
        
        {/* 1. Gomini */}
        <WorkCard 
          title="Gomini"
          role="Founding Engineer (Lead Mobile)"
          date="2025"
          description="Solely architected the 0-to-1 mobile platform enabling 100% of digital sales. Designed a native-grade UX with Shared Element Transitions."
          tags={['React Native', 'Reanimated', 'Supabase']}
          variant="compact"
        />

        {/* 2. Fleek.xyz */}
        <WorkCard 
          title="Fleek.xyz"
          role="Frontend Engineer"
          date="2025"
          description="Engineered a Component Design System across 6 codebases. Built a high-performance Tauri desktop app maintaining 60fps."
          tags={['Tauri', 'Rust', 'Cloudflare R2']}
          variant="compact"
        />

        {/* THE "ARCHIVE" BUTTON */}
        <a 
          href="/experience" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            flex justify-between items-center p-6 rounded-3xl cursor-pointer transition-all duration-300
            ${isHovered ? 'bg-white/5 border-white/20 -translate-y-[2px]' : 'bg-white/2 border-white/5 translate-y-0'}
            border
          `}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl bg-white/5 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#888]'}`}>
              <Layers size={20} />
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="font-sans text-[15px] font-medium text-white">
                View Full Archive
              </span>
              <span className="text-[13px] text-[#666]">
                Including Subscart, Iotree Minds & IIT Madras
              </span>
            </div>
          </div>

          <ArrowRight 
            size={18} 
            className={`transition-all duration-300 ${isHovered ? 'text-white translate-x-1' : 'text-[#666]'}`}
          />
        </a>

      </div>
    </section>
  );
};

export default EngineeringLogSection;