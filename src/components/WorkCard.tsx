import { useState } from 'react';

interface WorkCardProps {
  title: string;
  role: string;
  date?: string;
  description: string;
  tags: string[];
  variant?: 'full' | 'compact';
}

const WorkCard = ({ title, role, date, description, tags, variant = 'full' }: WorkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isCompact = variant === 'compact';

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '24px',
        borderRadius: '20px',
        background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
        border: isHovered ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.3s ease-out',
        cursor: 'pointer'
      }}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ 
            margin: 0, 
            color: '#ffffff', 
            fontSize: isCompact ? '18px' : '22px', 
            fontWeight: '700', 
            fontFamily: 'Inter, sans-serif' 
          }}>
            {title}
          </h3>
          {date && (
            <span style={{ 
              fontFamily: 'monospace', 
              fontSize: '13px', 
              color: 'rgba(255, 255, 255, 0.4)' 
            }}>
              {date}
            </span>
          )}
        </div>

        {/* Role */}
        <div style={{ marginBottom: '12px' }}>
          <span style={{ 
            fontFamily: 'monospace', 
            fontSize: '13px', 
            color: '#4ade80',
            letterSpacing: '0.02em'
          }}>
            {role}
          </span>
        </div>

        {/* Description */}
        <p style={{ 
          margin: '0 0 24px 0', 
          fontSize: '15px', 
          lineHeight: '1.6', 
          color: '#aaaaaa',
          fontFamily: 'Inter, sans-serif',
          display: '-webkit-box',
          WebkitLineClamp: isCompact ? 3 : undefined,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {description}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tags.slice(0, isCompact ? 3 : undefined).map((tag, index) => (
          <span key={index} style={{
            padding: '4px 12px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.1)',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'Inter, sans-serif'
          }}>
            {tag}
          </span>
        ))}
        {isCompact && tags.length > 3 && (
          <span style={{
            padding: '4px 12px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.4)',
            fontFamily: 'Inter, sans-serif'
          }}>
            +{tags.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
