import LiquidGlassCard from "./LiquidGlassCard";
import { MapPin, Mail, Github, Linkedin } from "lucide-react";

const IdentityCard = () => {
  return (
    <LiquidGlassCard
      className="w-full h-auto min-h-[400px] items-start text-left"
    >
      {/* 1. Top Row (Meta) */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4 w-full">
        {/* Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,1)]" />
          <span className="text-xs text-white/90 font-medium font-sans drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
            Open to Work
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-white/70 font-mono text-xs">
          <MapPin size={14} />
          <span>Darjeeling, India</span>
        </div>
      </div>

      {/* 2. Middle Section (Identity + Bio + Image) */}
      <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6 mb-10 w-full">
        {/* Left Side: Text Content */}
        <div className="flex-1 min-w-0 w-full">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white -tracking-[0.02em] m-0 mb-2 font-sans">
              Shreyansh Gupta
            </h1>
            <p className="font-mono text-[13px] text-white/70 m-0">
              Design Engineer & Full Stack Developer
            </p>
          </div>
          <p className="text-base leading-relaxed text-white/70 max-w-[480px] m-0 font-sans">
            Crafting high-performance mobile architectures and pixel-perfect
            design systems. Currently building at{" "}
            <strong className="text-white font-semibold">Gomini</strong>{" "}
            and{" "}
            <strong className="text-white font-semibold">
              Fleek.xyz
            </strong>
            .
          </p>
        </div>

        {/* Right Side: Profile Picture */}
        <div className="shrink-0 self-start md:self-auto">
          <img
            src="/Profile Picture.png"
            alt="Shreyansh Gupta"
            className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full object-cover border-2 border-white/10 grayscale hover:grayscale-0 transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* 4. Bottom Row (Actions) */}
      <div className="flex gap-3 w-full">
        <button
          onClick={() => window.open("mailto:gshrey258@gmail.com", "_blank")}
          className="flex-1 h-11 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:bg-white hover:text-black font-mono uppercase tracking-wide"
        >
          <Mail size={16} />
          Email Me
        </button>

        <button
          className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
          onClick={() => window.open("https://github.com/shrey258", "_blank")}
        >
          <Github size={20} />
        </button>

        <button
          className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
          onClick={() =>
            window.open("https://linkedin.com/in/shrey258", "_blank")
          }
        >
          <Linkedin size={20} />
        </button>
      </div>
    </LiquidGlassCard>
  );
};

export default IdentityCard;
