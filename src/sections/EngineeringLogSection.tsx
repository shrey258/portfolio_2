import { useState } from 'react';
import { ArrowRight, Layers } from 'lucide-react'; // Added 'Layers' icon
import WorkCard from '../components/WorkCard';

const EngineeringLogSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section>
      {/* HEADER - Cleaned up alignment */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', // Better vertical alignment
        marginBottom: '24px'
      }}>
        <h2 style={{
          fontSize: '14px',
          fontFamily: 'monospace',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.1em',
          margin: 0,
          textTransform: 'uppercase'
        }}>
          Engineering Log
        </h2>
        {/* Removed the redundant top link to clean up the UI */}
      </div>
      
      {/* CONTENT GRID - Keeping the Grid look for the main items */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', // Keeps the structure rigid/clean
        gap: '16px',
        width: '100%'
      }}>
        
        {/* 1. Gomini (Span 2) */}
        <div style={{ gridColumn: 'span 2' }}>
          <WorkCard 
            title="Gomini"
            role="Founding Engineer (Lead Mobile)"
            date="2025"
            description="Solely architected the 0-to-1 mobile platform enabling 100% of digital sales. Designed a native-grade UX with Shared Element Transitions."
            tags={['React Native', 'Reanimated', 'Supabase']}
            variant="full"
          />
        </div>

        {/* 2. Fleek.xyz (Span 2) */}
        <div style={{ gridColumn: 'span 2' }}>
          <WorkCard 
            title="Fleek.xyz"
            role="Frontend Engineer"
            date="2025"
            description="Engineered a Component Design System across 6 codebases. Built a high-performance Tauri desktop app maintaining 60fps."
            tags={['Tauri', 'Rust', 'Cloudflare R2']}
            variant="full"
          />
        </div>

        {/* THE "ARCHIVE" BUTTON - Designed like a Glass Card */}
        <a 
          href="/experience" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            gridColumn: 'span 2', // Full width
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            borderRadius: '24px',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            
            // THE FIX: Use the same Glass style as WorkCard, but darker
            background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
            border: isHovered ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Icon to represent "Stack of papers" */}
            <div style={{
              padding: '10px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              color: isHovered ? '#fff' : '#888',
              transition: 'color 0.3s'
            }}>
              <Layers size={20} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                color: '#fff'
              }}>
                View Full Archive
              </span>
              <span style={{
                fontSize: '13px',
                color: '#666'
              }}>
                Including Subscart, Iotree Minds & IIT Madras
              </span>
            </div>
          </div>

          <ArrowRight 
            size={18} 
            color={isHovered ? '#ffffff' : '#666'} 
            style={{ transition: 'all 0.3s', transform: isHovered ? 'translateX(4px)' : 'none' }}
          />
        </a>

      </div>
    </section>
  );
};

export default EngineeringLogSection;