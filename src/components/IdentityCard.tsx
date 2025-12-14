import LiquidGlassCard from './LiquidGlassCard';
import { MapPin, Mail, Github, Linkedin } from 'lucide-react';

const IdentityCard = () => {
  return (
    <LiquidGlassCard 
      style={{ 
        width: '100%', 
        height: 'auto', 
        minHeight: '400px',
        alignItems: 'normal', 
        textAlign: 'left'
      }}
    >
      {/* 1. Top Row (Meta) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        {/* Status Pill */}
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', 
          padding: '6px 12px', borderRadius: '999px', 
          background: 'rgba(0, 0, 0, 0.3)', 
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ 
            width: '8px', height: '8px', borderRadius: '50%', 
            background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' 
          }} />
          <span style={{ 
            fontSize: '12px', color: 'rgba(255,255,255,0.9)', 
            fontWeight: 500, fontFamily: 'Inter, sans-serif',
            textShadow: '0 0 10px rgba(74, 222, 128, 0.5)'
          }}>
            Open to Work
          </span>
        </div>

        {/* Location */}
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '6px', 
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          <MapPin size={14} />
          <span>Chennai, India (Remote)</span>
        </div>
      </div>

      {/* 2. Middle (Identity) */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '36px', fontWeight: '700', color: '#ffffff', 
          letterSpacing: '-0.02em', margin: '0 0 8px 0', fontFamily: 'Inter, sans-serif'
        }}>
          Shreyansh Gupta
        </h1>
        <p style={{ 
          fontFamily: 'monospace', fontSize: '13px', color: 'rgba(255,255,255,0.7)', margin: 0 
        }}>
          Design Engineer & Full Stack Developer
        </p>
      </div>

      {/* 3. Bio Section */}
      <p style={{ 
        fontSize: '16px', lineHeight: '1.7', color: 'rgba(255,255,255,0.7)', 
        maxWidth: '480px', marginBottom: '40px', fontFamily: 'Inter, sans-serif'
      }}>
        Crafting high-performance mobile architectures and pixel-perfect design systems. Currently building at <strong style={{ color: '#fff', fontWeight: 600 }}>Gomini</strong> and <strong style={{ color: '#fff', fontWeight: 600 }}>Fleek.xyz</strong>.
      </p>

      {/* 4. Bottom Row (Actions) */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          className="flex-1 h-11 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:bg-white hover:text-black font-mono uppercase tracking-wide"
        >
          <Mail size={16} />
          Email Me
        </button>
        
        <button 
          className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
        >
          <Github size={20} />
        </button>

        <button 
          className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
        >
          <Linkedin size={20} />
        </button>
      </div>
    </LiquidGlassCard>
  );
};

export default IdentityCard;
