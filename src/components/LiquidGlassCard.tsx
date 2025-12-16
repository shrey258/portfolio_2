import React from 'react';

interface LiquidGlassCardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({ children, className = '', style = {} }) => {
  return (
    <div
      className={`
        p-10 rounded-[30px]
        bg-[rgba(10,10,10,0.6)]
        backdrop-blur-2xl backdrop-saturate-150
        border border-white/10
        flex flex-col justify-center items-center text-center
        text-white/90 font-sans
        ${className}
      `}
      style={{
        // Complex shadows are easier to keep in style or custom class, but we can try arbitrary value if needed.
        // Keeping box-shadow here for readability of the complex layered shadow.
        boxShadow: `
          0 4px 30px rgba(0, 0, 0, 0.5),
          inset 0 0 20px rgba(255, 255, 255, 0.05),
          inset 0 0 0 1px rgba(255, 255, 255, 0.1)
        `,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default LiquidGlassCard;
