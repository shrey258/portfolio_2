import ProjectSpotlight from "./components/ProjectSpotlight";
import SectionHeader from "../../components/SectionHeader";
import { FolderOpen } from "lucide-react";
import { motion, useReducedMotion, cubicBezier } from "motion/react";
import type { MotionProps } from "motion/react";

const SelectedProjectsSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const easing = cubicBezier(0.165, 0.84, 0.44, 1);

  const createReveal = (delay = 0): MotionProps => {
    if (shouldReduceMotion) return { initial: false };
    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.35, ease: easing, delay },
    };
  };

  return (
    <section className="h-full">
      <motion.div {...createReveal(0)}>
        <SectionHeader
          label="Selected Projects"
          className="mb-6"
          labelClassName="text-base font-mono text-white/50 tracking-widest uppercase whitespace-nowrap"
          showDivider={false}
          icon={<FolderOpen size={16} className="text-white/60" />}
        />
      </motion.div>
      
      <motion.div {...createReveal(0.15)}>
        <ProjectSpotlight 
          title="Flag Me"
          subtitle="The GenAI Gift Engine"
          description={
            <>
              A recommendation engine processing <strong className="text-white font-semibold">65k+ records</strong>. 
              Overcame Amazon's anti-scraping using Offstage WebViews and Gemini AI.
            </>
          }
          tags={['Flutter', 'FastAPI', 'Gemini', 'Python']}
          repoLink="https://github.com/shrey258/flag_me"
          media={
            <div className="h-[240px] bg-[#0a0a0a] relative flex flex-col border-b border-white/5 overflow-hidden">
              {/* Scanline/Glow Effect Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-2 opacity-80"
                style={{
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), radial-gradient(circle at center, rgba(168, 85, 247, 0.05), transparent 80%)',
                  backgroundSize: '100% 4px, 100% 100%'
                }} 
              />

              {/* Header (Window Controls) */}
              <div className="flex gap-2 px-5 py-4 border-b border-white/5 bg-white/1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" /> {/* Red */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" /> {/* Yellow */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" /> {/* Green */}
              </div>

              {/* Content (The "Story") */}
              <div className="p-5 font-mono text-[13px] leading-[1.8] text-white/60 flex flex-col gap-1 z-1">
                  <div>
                      <span className="text-[#666] mr-2">&gt;</span>
                      init flag_me_engine --target="amazon" --prompt="best gift for my boss who loves tech and is always on the go - budget $200"
                  </div>
                  <div>
                      <span className="text-[#666] mr-2">&gt;</span>
                      <span className="text-green-400">[SCRAPER]</span> Bypassing anti-bot...
                  </div>
                  <div>
                      <span className="text-[#666] mr-2">&gt;</span>
                      <span className="text-purple-500">[GEMINI]</span> Analyzing 65k records...
                  </div>
                  <div className="mt-2">
                      <span className="text-[#666] mr-2">&gt;</span>
                      <span className="text-white">[RESULT] Best Gift: "Sony WH-1000XM5"</span>
                  </div>
                  
                  {/* Blinking Cursor */}
                  <div className="mt-1">
                      <span className="text-[#666] mr-2">&gt;</span>
                      <span 
                        className="inline-block w-2 h-3.5 bg-purple-500 align-middle"
                        style={{ animation: 'blink 1s step-end infinite' }}
                      />
                  </div>
              </div>
              <style>
                {`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}
              </style>
            </div>
          }
        />
      </motion.div>
    </section>
  );
};

export default SelectedProjectsSection;
