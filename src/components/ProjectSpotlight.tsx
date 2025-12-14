import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface ProjectSpotlightProps {
  title: string;
  subtitle: string;
  description: ReactNode;
  tags: string[];
  media: ReactNode;
  repoLink?: string;
  demoLink?: string;
}

const ProjectSpotlight = ({
  title,
  subtitle,
  description,
  tags,
  media,
  repoLink = '#',
  demoLink,
}: ProjectSpotlightProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, rgba(20, 20, 25, 0.9) 0%, #050505 100%)',
        border: isHovered ? '1px solid rgba(168, 85, 247, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)', // Purple glow on hover
        borderRadius: '24px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 10px 40px -10px rgba(168, 85, 247, 0.15)' : 'none'
      }}
    >
      {/* Top Half (Media) */}
      {media}

      {/* Bottom Half (Content) */}
      <div style={{ padding: '24px' }}>
        
        {/* Title Row */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '4px' 
        }}>
          <div>
            <h3 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              color: '#fff',
              fontFamily: 'Inter, sans-serif'
            }}>
              {title}
            </h3>
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '14px',
              color: '#888',
              fontFamily: 'Inter, sans-serif'
            }}>
              {subtitle}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* GitHub Button */}
            <a 
              href={repoLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Github size={18} />
            </a>

            {/* View Project Button */}
            {demoLink && (
              <a 
                href={demoLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(168, 85, 247, 0.1)', 
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  color: '#a855f7',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p style={{
          margin: '16px 0 24px 0',
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#aaa',
          fontFamily: 'Inter, sans-serif'
        }}>
          {description}
        </p>

        {/* Tech Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(168, 85, 247, 0.1)', // Purple background
              border: '1px solid rgba(168, 85, 247, 0.2)', // Purple border
              fontSize: '12px',
              color: '#d8b4fe', // Light purple text
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProjectSpotlight;
