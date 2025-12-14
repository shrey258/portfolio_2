import WorkCard from '../components/WorkCard';

const EngineeringLogSection = () => {
  return (
    <section>
      <h2 style={{
        fontSize: '14px',
        fontFamily: 'monospace',
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: '0.1em',
        marginBottom: '32px',
        textTransform: 'uppercase'
      }}>
        Engineering Log
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '16px',
        width: '100%'
      }}>
        {/* 1. Gomini (Full Width) */}
        <div style={{ gridColumn: 'span 2' }}>
          <WorkCard 
            title="Gomini"
            role="Founding Engineer (Lead Mobile)"
            description="Solely architected the 0-to-1 mobile platform. Built a native-grade UX with Shared Element Transitions that reduced field ops time by 30%."
            tags={['React Native', 'Supabase', 'CI/CD']}
            variant="full"
          />
        </div>

        {/* 2. Fleek.xyz (Full Width) */}
        <div style={{ gridColumn: 'span 2' }}>
          <WorkCard 
            title="Fleek.xyz"
            role="Frontend Engineer (Contract)"
            description="Engineered a Component Design System across 6 codebases. Built a high-performance Tauri desktop app maintaining 60fps during complex data viz."
            tags={['Tauri', 'Rust/C++', 'Cloudflare R2', 'Next.js']}
            variant="full"
          />
        </div>

        {/* 3. Subscart (Left Column) */}
        <div style={{ gridColumn: 'span 1' }}>
          <WorkCard 
            title="Subscart"
            role="Software Eng."
            description="Achieved 200ms faster perceived latency using Optimistic UI updates on Node.js & Mobile."
            tags={['Optimistic UI', 'Node.js']}
            variant="compact"
          />
        </div>

        {/* 4. Iotree Minds (Right Column) */}
        <div style={{ gridColumn: 'span 1' }}>
          <WorkCard 
            title="Iotree Minds"
            role="Mobile Eng."
            description="Integrated 12 backend APIs and delivered the 'My Clients' module supporting 50+ active users."
            tags={['API Integration', 'UX Revamp']}
            variant="compact"
          />
        </div>

        {/* 5. Research Footer (Full Width) */}
        <div style={{ 
          gridColumn: 'span 2',
          marginTop: '16px',
          padding: '24px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px dashed rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <span style={{ 
            fontFamily: 'monospace', 
            fontSize: '12px', 
            color: 'rgba(255, 255, 255, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Research & Experiments
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
              <strong style={{ color: '#fff' }}>IIT Madras</strong> — 1Gbps Python Server
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
              <strong style={{ color: '#fff' }}>Scale Challenges</strong> — GenAI Scraping
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringLogSection;
