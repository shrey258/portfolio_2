import ProjectSpotlight from '../components/ProjectSpotlight';

const SelectedProjectsSection = () => {
  return (
    <section>
      {/* Section Header */}
      <h2 style={{
        fontSize: '14px',
        fontFamily: 'monospace',
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: '0.1em',
        marginBottom: '24px',
        textTransform: 'uppercase'
      }}>
        Selected Projects
      </h2>
      
      <ProjectSpotlight 
        title="Flag Me"
        subtitle="The GenAI Gift Engine"
        description={
          <>
            A recommendation engine processing <strong style={{ color: '#fff', fontWeight: '600' }}>65k+ records</strong>. 
            Overcame Amazon's anti-scraping using Offstage WebViews and Gemini AI.
          </>
        }
        tags={['Flutter', 'FastAPI', 'Gemini', 'Python']}
        repoLink="https://github.com/shrey258/flag_me"
        media={
          <div style={{
            height: '240px',
            background: '#0a0a0a',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            overflow: 'hidden'
          }}>
            {/* Scanline/Glow Effect Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), radial-gradient(circle at center, rgba(168, 85, 247, 0.05), transparent 80%)',
                backgroundSize: '100% 4px, 100% 100%',
                pointerEvents: 'none',
                zIndex: 2,
                opacity: 0.8
            }} />

            {/* Header (Window Controls) */}
            <div style={{
                display: 'flex',
                gap: '8px',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(255, 255, 255, 0.01)'
            }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} /> {/* Red */}
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} /> {/* Yellow */}
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} /> {/* Green */}
            </div>

            {/* Content (The "Story") */}
            <div style={{
                padding: '20px',
                fontFamily: "'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace",
                fontSize: '13px',
                lineHeight: '1.8',
                color: 'rgba(255, 255, 255, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                zIndex: 1
            }}>
                <div>
                    <span style={{ color: '#666', marginRight: '8px' }}>&gt;</span>
                    init flag_me_engine --target="amazon" --prompt="best gift for my boss who loves tech and is always on the go - budget $200"
                </div>
                <div>
                    <span style={{ color: '#666', marginRight: '8px' }}>&gt;</span>
                    <span style={{ color: '#4ade80' }}>[SCRAPER]</span> Bypassing anti-bot...
                </div>
                <div>
                    <span style={{ color: '#666', marginRight: '8px' }}>&gt;</span>
                    <span style={{ color: '#a855f7' }}>[GEMINI]</span> Analyzing 65k records...
                </div>
                <div style={{ marginTop: '8px' }}>
                    <span style={{ color: '#666', marginRight: '8px' }}>&gt;</span>
                    <span style={{ color: '#fff' }}>[RESULT] Best Gift: "Sony WH-1000XM5"</span>
                </div>
                
                {/* Blinking Cursor */}
                <div style={{ marginTop: '4px' }}>
                    <span style={{ color: '#666', marginRight: '8px' }}>&gt;</span>
                    <span style={{ 
                        display: 'inline-block', 
                        width: '8px', 
                        height: '14px', 
                        background: '#a855f7', 
                        verticalAlign: 'middle',
                        animation: 'blink 1s step-end infinite' 
                    }} />
                </div>
            </div>
            <style>
              {`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}
            </style>
          </div>
        }
      />
    </section>
  );
};

export default SelectedProjectsSection;
