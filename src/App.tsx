import './App.css';
import TopoBackground from './components/TopoBackground';
import IdentityCard from './components/IdentityCard';
import EngineeringLogSection from './components/EngineeringLogSection';

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
        <IdentityCard />

        <EngineeringLogSection />
      </main>
    </div>
  );
}

export default App;
