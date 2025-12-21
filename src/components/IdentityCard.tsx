import { useState, useEffect } from "react";
import { motion, useReducedMotion, cubicBezier } from "motion/react";
import type { MotionProps } from "motion/react";
import LiquidGlassCard from "./LiquidGlassCard";
import TechArsenalGrid from "./TechArsenalGrid";
import { StatItem, InfoPill, SocialButton } from "./IdentityParts";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

const IdentityCard = () => {
  const [time, setTime] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();
  const easing = cubicBezier(0.165, 0.84, 0.44, 1);

  const createReveal = (
    delay = 0,
    options?: { scale?: boolean }
  ): MotionProps => {
    if (shouldReduceMotion) {
      return { initial: false };
    }

    return {
      initial: {
        opacity: 0,
        y: 18,
        scale: options?.scale ? 0.96 : 1,
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      transition: {
        duration: 0.35,
        ease: easing,
        delay,
      },
    };
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <LiquidGlassCard className="w-full h-auto min-h-[500px] items-start text-left p-0 overflow-hidden relative group">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 p-8 md:p-10 w-full flex flex-col gap-8">
        {/* 1. Header HUD */}
        <motion.div
          className="flex flex-wrap justify-between items-center gap-4 border-b border-white/5 pb-6 w-full"
          {...createReveal(0.45)}
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]" />
            <span className="text-sm text-white/90 font-medium font-sans drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
              Open to New Roles
            </span>
          </div>

          <div className="flex items-center gap-6">
            <InfoPill
              icon={<Globe size={12} className="text-white/50" />}
              text={`IST ${time}`}
            />
            <InfoPill
              icon={<MapPin size={12} className="text-white/50" />}
              text="Darjeeling, IN"
            />
          </div>
        </motion.div>

        {/* 2. Identity Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          {/* Avatar Column */}
          <div className="relative shrink-0">
            <div className="w-[120px] h-[120px] rounded-2xl overflow-hidden border border-white/10 relative group-hover:border-white/20 transition-colors">
              <img
                src="/Profile Picture.png"
                alt="Shreyansh Gupta"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 bg-size-[100%_4px] bg-repeat-y animate-scan pointer-events-none" />
            </div>
            {/* Decorative brackets */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-white/20" />
          </div>

          {/* Main Info */}
          <motion.div
            className="flex-1 min-w-0"
            {...createReveal(0, { scale: true })}
          >
            <h1 className="font-display-serif text-5xl md:text-6xl text-white tracking-tight mb-2">
              Shreyansh Gupta
            </h1>
            <h2 className="text-lg font-mono text-white/60 mb-6 flex items-center gap-3">
              <span className="text-purple-400">&lt;DesignEngineer /&gt;</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-blue-400">FullStack.Dev</span>
            </h2>

            <p className="text-white/80 leading-relaxed max-w-xl font-sans text-base">
              Architecting high-performance mobile ecosystems and crafting
              pixel-perfect web design systems. Merging engineering precision
              with creative fluidity.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-white/50 font-mono">
              <span>Building at:</span>
              <a
                href="https://gomini.in"
                className="text-white hover:text-purple-300 transition-colors border-b border-white/20 hover:border-purple-300 pb-0.5"
              >
                Gomini
              </a>
            </div>
          </motion.div>
        </div>

        {/* 3. Tech Arsenal Grid */}
        <motion.div {...createReveal(0.15)}>
          <TechArsenalGrid />
        </motion.div>

        {/* 4. Stats & Actions Row */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end gap-6 w-full pt-2 border-t border-white/5"
          {...createReveal(0.3)}
        >
          {/* Left: Stats */}
          <div className="flex gap-8">
            <StatItem value="5+" label="Startups" animate delay={0.45} />
            <StatItem value="15+" label="Projects" animate delay={0.55} />
            <StatItem value="100%" label="Commitment" animate delay={0.65} />
          </div>

          {/* Right: Actions */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() =>
                window.open("mailto:gshrey258@gmail.com", "_blank")
              }
              className="flex-1 md:flex-none px-6 h-12 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Mail size={18} />
              <span>Connect</span>
            </button>
            <div className="flex gap-2">
              <SocialButton
                icon={<Github size={20} />}
                onClick={() =>
                  window.open("https://github.com/shrey258", "_blank")
                }
              />
              <SocialButton
                icon={<Linkedin size={20} />}
                onClick={() =>
                  window.open("https://linkedin.com/in/shrey258", "_blank")
                }
              />
            </div>
          </div>
        </motion.div>
      </div>
    </LiquidGlassCard>
  );
};

export default IdentityCard;
