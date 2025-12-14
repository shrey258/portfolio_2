import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopoBackground from '../components/TopoBackground';
import WorkCard from '../components/WorkCard';

const ExperiencePage = () => {
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      
      {/* Background */}
      <TopoBackground />

      {/* Content Column */}
      <main style={{
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        position: 'relative',
        zIndex: 1,
      }}>
        
        {/* Header */}
        <div>
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.4)',
            textDecoration: 'none',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '24px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            margin: 0
          }}>
            Engineering Archive
          </h1>
        </div>

        {/* Full Bento Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '16px',
          width: '100%'
        }}>
          
          {/* 1. GOMINI - Full Width */}
          <div style={{ gridColumn: 'span 2' }}>
            <WorkCard 
              title="Gomini"
              role="Founding Engineer (Lead Mobile)"
              date="Mar 2025 - Present"
              description="Solely architected the 0-to-1 mobile platform enabling 100% of digital sales. Designed a native-grade UX with Shared Element Transitions that reduced field ops time by 30%."
              tags={['React Native', 'Reanimated', 'Supabase', 'Mobile Arch']}
              variant="full"
            />
          </div>

          {/* 2. FLEEK.XYZ - Full Width */}
          <div style={{ gridColumn: 'span 2' }}>
            <WorkCard 
              title="Fleek.xyz"
              role="Frontend Engineer (Contract)"
              date="Aug 2025 - Dec 2025"
              description="Engineered a Component Design System across 6 codebases. Built a high-performance Tauri desktop app utilizing memoization to maintain 60fps during complex data viz."
              tags={['Tauri', 'Rust/C++', 'Cloudflare R2', 'Next.js']}
              variant="full"
            />
          </div>

          {/* 3. SUBSCART - Compact */}
          <div style={{ gridColumn: 'span 1' }}>
            <WorkCard 
              title="Subscart"
              role="Software Eng."
              date="Mar - Jun 2025"
              description="Achieved 200ms faster perceived latency using Optimistic UI updates on Node.js & Mobile."
              tags={['Optimistic UI', 'Node.js']}
              variant="compact"
            />
          </div>

          {/* 4. IOTREE MINDS - Compact */}
          <div style={{ gridColumn: 'span 1' }}>
            <WorkCard 
              title="Iotree Minds"
              role="Mobile Eng."
              date="2023 - 2025"
              description="Integrated 12 backend APIs and delivered the 'My Clients' module supporting 50+ active users."
              tags={['API Integration', 'UX Revamp']}
              variant="compact"
            />
          </div>

          {/* 5. IIT MADRAS - Full Width */}
          <div style={{ gridColumn: 'span 2' }}>
            <WorkCard 
              title="IIT Madras"
              role="Research Intern"
              date="2023 - 2025"
              description="Created a 1 Gbps Python network speed test server with <5% variance. Built and deployed a cross-platform speed test app with sub-second latency."
              tags={['Python', 'Networking', 'High Performance']}
              variant="full"
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default ExperiencePage;
