import './App.css';
import TopoBackground from './components/TopoBackground';
import LiquidGlassCard from './components/LiquidGlassCard';

function App() {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      
      {/* 1. Background stays fixed behind everything */}
      <TopoBackground />

      {/* 2. The Content Column */}
      <main style={{
        width: '100%',
        maxWidth: '640px', // The "Magic Number" for this mobile-style layout
        margin: '0 auto', // Centers the column
        padding: '80px 24px', // Breathing room top/bottom + side padding for mobile
        display: 'flex',
        flexDirection: 'column',
        gap: '64px', // Big vertical gaps between sections feel premium
        position: 'relative',
        zIndex: 1,
      }}>
        <LiquidGlassCard 
          style={{ width: '100%', height: 'auto', minHeight: '400px' }}
        >
          <h2 style={{ 
            marginBottom: '10px', 
            fontSize: '24px', 
            fontWeight: '600',
            background: 'linear-gradient(to bottom, #ffffff, #aaaaaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Liquid Glass
          </h2>
          
          <p style={{ 
            fontSize: '14px', 
            lineHeight: '1.6', 
            color: 'rgba(255, 255, 255, 0.6)' 
          }}>
            This effect uses transparency, blur, and lighting to simulate volume.
          </p>
        </LiquidGlassCard>
      </main>

    </div>
  );
}

export default App;
