const TopoBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#050505', // Very dark grey/black
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.6 }} // Higher opacity since dots are smaller than lines
      >
        <defs>
          {/* 1. THE POLKA DOT PATTERN 
             Changed from path (lines) to circle (dots)
             width/height controls spacing between dots.
          */}
          <pattern
            id="dot-pattern"
            width="25" 
            height="25"
            patternUnits="userSpaceOnUse"
          >
            {/* The Dot itself */}
            <circle cx="2" cy="2" r="1.5" fill="#444444" /> 
          </pattern>

          {/* 2. THE LIQUID FILTER 
             Made significantly softer and smoother.
          */}
          <filter id="liquid-filter">
            {/* baseFrequency: Lower numbers = Larger, smoother waves.
               numOctaves: 1 = Very smooth/soft. Higher numbers add "grit".
            */}
            <feTurbulence
              type="fractalNoise" 
              baseFrequency="0.002" 
              numOctaves="1" 
              result="noise"
            >
              {/* Ultra slow animation (60s) for "graceful" swirling */}
              <animate
                attributeName="baseFrequency"
                dur="60s" 
                values="0.002; 0.004; 0.002"
                repeatCount="indefinite"
              />
            </feTurbulence>
            
            {/* scale: How far the dots are pushed. 
               High scale + Dots = The dots bunch up and spread out (liquid effect).
            */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="80"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* 3. Render the Rectangle with Pattern & Filter */}
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-pattern)"
          filter="url(#liquid-filter)"
        />
      </svg>
    </div>
  );
};

export default TopoBackground;