import React from 'react';

interface LiquidGlassCardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={className}
      style={{
        // Default Sizing (can be overridden)
        padding: '40px',
        borderRadius: '30px', // Higher border-radius feels more "liquid"
        
        // 1. THE GLASS BASE
        // We use a very low opacity white/grey. The magic happens in backdrop-filter.
        background: 'rgba(10, 10, 10, 0.6)',
        
        // 2. THE FROSTING (Refraction)
        // blur: smooths out the dots behind it.
        // saturate: boosts colors behind it (makes it look like a lens).
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)', // Safari support
        
        // 3. THE LIQUID EDGES (Highlight & Shadow)
        // Instead of a flat border, we use box-shadows to simulate light hitting a curved edge.
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: `
          0 4px 30px rgba(0, 0, 0, 0.5),    /* Deep shadow for depth */
          inset 0 0 20px rgba(255, 255, 255, 0.05), /* Inner glow (volume) */
          inset 0 0 0 1px rgba(255, 255, 255, 0.1) /* Inner rim light */
        `,
        
        // Content Styling
        color: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        
        // Merge passed styles last to allow overrides
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default LiquidGlassCard;
