import './App.css';
import TopoBackground from './components/TopoBackground';
import LiquidGlassCard from './components/LiquidGlassCard';

function App() {
  return (
    <div className="App flex items-center justify-center min-h-screen">
      <TopoBackground />
      <LiquidGlassCard 
        style={{ width: '300px', height: '400px' }}
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
    </div>
  );
}

export default App;
