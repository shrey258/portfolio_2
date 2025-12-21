import React, { useEffect, useMemo, useRef, useState } from "react";
import LiquidGlassCard from "../components/LiquidGlassCard";
import {
  Smartphone,
  Layers,
  Printer,
  Camera,
  Scan,
  User,
  Twitter,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { motion, useReducedMotion, cubicBezier } from "motion/react";
import type { MotionProps, Variants } from "motion/react";

// Import Video Assets
import printVideo from "../assets/Print Animation.mp4";
import reflectionVideo from "../assets/Refraction Animation.mp4";
import xrayVideo from "../assets/Xray Animation.mp4";
import profileVideo from "../assets/Profile Card Animation.mp4";
import loginVideo from "../assets/Liquidglass Login.mp4";
import paparazziVideo from "../assets/Paparazzi Loader.mp4";

interface DesignItem {
  id: string;
  title: string;
  tech: string;
  icon: React.ReactNode;
  size: "large" | "medium" | "small";
  video: string;
}

const LazyLoopingVideo = ({
  src,
  className,
  shouldReduceMotion,
}: {
  src: string;
  className?: string;
  shouldReduceMotion: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [backdrop, setBackdrop] = useState<string | null>(null);

  useEffect(() => {
    if (shouldRender) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div
        className="absolute inset-0 opacity-55 blur-xl scale-110 transition-opacity duration-500 ease-out"
        style={
          backdrop
            ? {
                backgroundImage: `url(${backdrop})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                background:
                  "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(circle at 60% 70%, rgba(168,85,247,0.18), transparent 55%)",
              }
        }
      />
      {shouldRender ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay={!shouldReduceMotion}
          loop
          muted
          playsInline
          preload="none"
          onLoadedData={() => {
            setIsLoaded(true);

            if (backdrop) return;
            const v = videoRef.current;
            if (!v) return;
            if (!v.videoWidth || !v.videoHeight) return;

            const targetW = 96;
            const scale = targetW / v.videoWidth;
            const w = Math.max(1, Math.round(v.videoWidth * scale));
            const h = Math.max(1, Math.round(v.videoHeight * scale));

            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.drawImage(v, 0, 0, w, h);

            try {
              setBackdrop(canvas.toDataURL("image/jpeg", 0.6));
            } catch {
              // Ignore snapshot failures (rare) and keep the gradient fallback.
            }
          }}
          className={`${className ?? ""} ${isLoaded ? "opacity-100" : "opacity-0"} relative z-10`}
        />
      ) : null}
    </div>
  );
};

const designs: DesignItem[] = [
  // Row 1: Square, Square, Rectangle
  {
    id: "1",
    title: "Printing Receipt",
    tech: "React Native Reanimated",
    icon: <Printer size={20} />,
    size: "small",
    video: printVideo,
  },
  {
    id: "2",
    title: "Water Reflection",
    tech: "Expo Keyframes",
    icon: <Layers size={20} />,
    size: "small",
    video: reflectionVideo,
  },
  {
    id: "4", // Rectangle
    title: "CSS X-Ray Effect",
    tech: "Pure CSS",
    icon: <Scan size={20} />,
    size: "medium",
    video: xrayVideo,
  },

  // Row 2: Rectangle, Square, Square
  {
    id: "6", // Rectangle
    title: "Profile Card",
    tech: "Motion (motion.dev)",
    icon: <User size={20} />,
    size: "medium",
    video: profileVideo,
  },
  {
    id: "3",
    title: "Interactive Login",
    tech: "RN Reanimated",
    icon: <Smartphone size={20} />,
    size: "small",
    video: loginVideo,
  },
  {
    id: "5",
    title: "Paparazzi Loader",
    tech: "React Keyframes",
    icon: <Camera size={20} />,
    size: "small",
    video: paparazziVideo,
  },
];

const DesignLabSection = () => {
  const shouldReduceMotion = !!useReducedMotion();
  const easing = useMemo(() => cubicBezier(0.165, 0.84, 0.44, 1), []);

  const createReveal = (delay = 0): MotionProps => {
    if (shouldReduceMotion) return { initial: false };
    return {
      initial: { opacity: 0, y: 18 },
      animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: easing, delay },
      },
    };
  };

  const gridMotionProps = shouldReduceMotion
    ? { initial: false }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.3 },
      };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: easing },
    },
  };

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-6 py-24" id="design-lab">
      <motion.div {...createReveal(0.05)}>
        <SectionHeader
          label="Design Lab"
          ctaLabel="Check out more on"
          ctaHref="https://x.com/shreyg258/highlights"
          ctaIcon={
            <Twitter
              size={14}
              className="text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300"
            />
          }
          className="mb-12"
        />
      </motion.div>

      {/* Grid: 4 columns. Squares = 1 col, Rectangles = 2 cols */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]"
        variants={gridVariants}
        {...gridMotionProps}
      >
        {designs.map((design, index) => (
          <motion.div
            key={design.id}
            variants={cardVariants}
            className={`h-full ${design.size === "medium" ? "md:col-span-2" : ""}`}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.1 * index,
            }}
          >
            <LiquidGlassCard
              className={`
                relative overflow-hidden group p-0 items-start! justify-end! h-full
                ${design.size === "medium" ? "md:col-span-2" : "md:col-span-1"}
                hover:border-white/30 transition-all duration-500
              `}
            >
              {/* Video (Contained, no cropping) */}
              <div className="absolute inset-0 z-0 flex items-center justify-center p-4">
                <LazyLoopingVideo
                  src={design.video}
                  shouldReduceMotion={shouldReduceMotion}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 group-hover:saturate-125 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out drop-shadow-2xl rounded-xl"
                />
              </div>

              {/* Content Overlay - Reveal on Hover */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 flex flex-col items-start gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                {/* Gradient backing for text readability on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent -z-10" />

                <div className="flex items-center gap-2 text-white/90">
                  <span className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
                    {design.icon}
                  </span>
                  <span className="font-bold font-sans text-lg leading-tight">
                    {design.title}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  {design.tech}
                </div>
              </div>
            </LiquidGlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer: Statement with Horizon Glow */}
      <motion.div
        className="relative flex flex-col items-center justify-center mt-14 pb-12 px-4"
        {...createReveal(0.3)}
      >
        {/* Horizon Glow Effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-white/15 blur-[1px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[80px] bg-purple-500/12 blur-[70px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center space-y-2">
          <h3
            className="text-3xl md:text-4xl text-white/70 leading-[1.15]"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            More animations
            <br />
            <span className="italic text-white/50">coming soon...</span>
          </h3>
        </div>

        {/* Mobile-only Link */}
        <a
          href="https://x.com/shreyg258/highlights"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex md:hidden items-center gap-2 px-4 py-2 mt-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
        >
          <span className="text-sm font-medium text-white/90">
            Check out more on
          </span>
          <Twitter
            size={14}
            className="text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300"
          />
        </a>
      </motion.div>
    </div>
  );
};

export default DesignLabSection;
