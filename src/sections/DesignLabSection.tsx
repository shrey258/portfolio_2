import React from 'react';
import LiquidGlassCard from '../components/LiquidGlassCard';
import { Smartphone, Layers, Printer, Camera, Scan, User } from 'lucide-react';

// Import Video Assets
import printVideo from '../assets/Print Animation.mov';
import reflectionVideo from '../assets/Refraction Animation.mov';
import xrayVideo from '../assets/Xray Animation.mov';
import profileVideo from '../assets/Profile Card Animation.mov';
import loginVideo from '../assets/Liquidglass Login.mov';
import paparazziVideo from '../assets/Paparazzi Loader.mov';

interface DesignItem {
  id: string;
  title: string;
  tech: string;
  icon: React.ReactNode;
  size: 'large' | 'medium' | 'small';
  video: string;
}

const designs: DesignItem[] = [
  // Row 1: Square, Square, Rectangle
  {
    id: '1',
    title: 'Printing Receipt',
    tech: 'React Native Reanimated',
    icon: <Printer size={20} />,
    size: 'small',
    video: printVideo,
  },
  {
    id: '2',
    title: 'Water Reflection',
    tech: 'Expo Keyframes',
    icon: <Layers size={20} />,
    size: 'small',
    video: reflectionVideo,
  },
  {
    id: '4', // Rectangle
    title: 'CSS X-Ray Effect',
    tech: 'Pure CSS',
    icon: <Scan size={20} />,
    size: 'medium',
    video: xrayVideo,
  },
  
  // Row 2: Rectangle, Square, Square
  {
    id: '6', // Rectangle
    title: 'Profile Card',
    tech: 'Motion (motion.dev)',
    icon: <User size={20} />,
    size: 'medium',
    video: profileVideo,
  },
  {
    id: '3',
    title: 'Interactive Login',
    tech: 'RN Reanimated',
    icon: <Smartphone size={20} />,
    size: 'small',
    video: loginVideo,
  },
  {
    id: '5',
    title: 'Paparazzi Loader',
    tech: 'React Keyframes',
    icon: <Camera size={20} />,
    size: 'small',
    video: paparazziVideo,
  },
];

const DesignLabSection = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px flex-1 bg-white/10" />
        <h2 className="text-xl font-mono text-white/60 uppercase tracking-widest">
          Design Lab
        </h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Grid: 4 columns. Squares = 1 col, Rectangles = 2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]">
        {designs.map((design) => (
          <LiquidGlassCard
            key={design.id}
            className={`
              relative overflow-hidden group p-0 items-start! justify-end!
              ${design.size === 'medium' ? 'md:col-span-2' : 'md:col-span-1'}
              hover:border-white/30 transition-all duration-500
            `}
          >
             {/* 1. Ambient Background (Blurred fill) */}
             <div className="absolute inset-0 bg-black/50 z-0">
               <video
                 src={design.video}
                 autoPlay
                 loop
                 muted
                 playsInline
                 className="w-full h-full object-cover opacity-30 group-hover:opacity-60 blur-xl scale-110 transition-all duration-700 group-hover:saturate-200"
               />
             </div>

             {/* 2. Actual Video (Contained, no cropping) */}
             <div className="absolute inset-0 z-0 flex items-center justify-center p-4">
               <video
                 src={design.video}
                 autoPlay
                 loop
                 muted
                 playsInline
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
                    <span className="font-bold font-sans text-lg leading-tight">{design.title}</span>
                </div>
                <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    {design.tech}
                </div>
             </div>
          </LiquidGlassCard>
        ))}
      </div>
    </div>
  );
};

export default DesignLabSection;