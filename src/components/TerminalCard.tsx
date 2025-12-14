import { useState } from "react";
import { Terminal } from "lucide-react";

interface TerminalCardProps {
  title: string;
  role: string;
  date: string;
  fileName?: string;
  badgeText?: string;
  bullets: string[];
  tags: string[];
  gridColumn?: string;
  marginTop?: string;
}

const TerminalCard = ({
  title,
  role,
  date,
  fileName = "research_logs.py",
  badgeText = "READ ONLY",
  bullets,
  tags,
  gridColumn = "span 2",
  marginTop = "16px",
}: TerminalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ gridColumn, marginTop }}>
      <div
        style={{
          background: isHovered
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(10px)",
          border: isHovered
            ? "1px solid rgba(255, 255, 255, 0.2)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "24px",
          padding: "24px",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
            opacity: 0.4,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "12px",
          }}
        >
          <Terminal size={14} />
          <span style={{ fontSize: "12px" }}>{fileName}</span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "11px",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            {badgeText}
          </span>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                color: "#fff",
                fontWeight: "600",
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h3>
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {date}
            </span>
          </div>
          <div style={{ fontSize: "13px", color: "#4ade80", marginTop: "4px" }}>
            {role}
          </div>
        </div>

        <div style={{ fontSize: "13px", lineHeight: "1.8", color: "#bbb" }}>
          {bullets.map((bullet, idx) => {
            const number = String(idx + 1).padStart(2, "0");
            return (
              <div key={idx}>
                <span style={{ color: "#444", marginRight: "8px" }}>
                  {number}
                </span>{" "}
                {bullet}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerminalCard;
