import { useState, useEffect } from "react";
import LiquidGlassCard from "./LiquidGlassCard";
import TechArsenalGrid from "./TechArsenalGrid";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

const IdentityCard = () => {
  const [time, setTime] = useState<string>("");

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
        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-white/5 pb-6 w-full">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]" />
            <span className="text-sm text-white/90 font-medium font-sans drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
              Open to New Roles
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Globe size={12} className="text-white/50" />
              <span className="text-xs font-mono text-white/80">
                IST {time}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <MapPin size={12} className="text-white/50" />
              <span className="text-xs font-mono text-white/80">
                Darjeeling, IN
              </span>
            </div>
          </div>
        </div>

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
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2 font-sans">
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
          </div>
        </div>

        {/* 3. Tech Arsenal Grid */}
        <TechArsenalGrid />

        {/* 4. Stats & Actions Row */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 w-full pt-2 border-t border-white/5">
          {/* Left: Stats */}
          <div className="flex gap-8">
            <div>
              <div className="text-2xl font-bold text-white font-sans">5+</div>
              <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
                Startups
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-sans">15+</div>
              <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
                Projects
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-sans">
                100%
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/40 font-mono mt-1">
                Commitment
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() =>
                window.open("mailto:gshrey258@gmail.com", "_blank")
              }
              className="flex-1 md:flex-none px-6 h-12 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <Mail size={18} />
              <span>Connect</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  window.open("https://github.com/shrey258", "_blank")
                }
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <Github size={20} />
              </button>
              <button
                onClick={() =>
                  window.open("https://linkedin.com/in/shrey258", "_blank")
                }
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <Linkedin size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </LiquidGlassCard>
  );
};

export default IdentityCard;
