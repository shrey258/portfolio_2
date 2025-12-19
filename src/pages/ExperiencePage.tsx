import { useEffect } from "react";
import { ArrowLeft, Clock, Layers } from "lucide-react"; // Added icons
import { Link } from "react-router-dom";
import TopoBackground from "../components/TopoBackground";
import TerminalCard from "../components/TerminalCard";
import WorkCard from "../sections/Engineering Log/components/WorkCard";

const ExperiencePage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Background */}
      <TopoBackground />

      {/* Content Column */}
      <main
        style={{
          width: "100%",
          maxWidth: "640px",
          margin: "0 auto",
          padding: "80px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* HEADER SECTION */}
        <div>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255, 255, 255, 0.4)",
              textDecoration: "none",
              fontSize: "13px",
              fontFamily: "monospace", // Monospace for technical feel
              marginBottom: "24px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)")
            }
          >
            <ArrowLeft size={16} />
            BACK TO HOME
          </Link>

          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              margin: "0 0 24px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Engineering Log
          </h1>

          {/* NEW: DASHBOARD META HEADER */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              padding: "16px 0",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Stat 1 */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Clock size={16} color="#666" />
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontFamily: "monospace",
                  }}
                >
                  Timeline
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  2023 — Present
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Layers size={16} color="#666" />
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontFamily: "monospace",
                  }}
                >
                  Total Roles
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  5 Positions
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BENTO GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            width: "100%",
          }}
        >
          {/* 1. GOMINI - Flagship */}
          <div style={{ gridColumn: "span 2" }}>
            <WorkCard
              title="Gomini"
              role="Founding Engineer (Lead Mobile)"
              date="Mar 2025 - Present"
              description="Solely architected the 0-to-1 mobile platform enabling 100% of digital sales. Designed a native-grade UX with Shared Element Transitions that reduced field ops time by 30%."
              tags={["React Native", "Reanimated", "Supabase", "Mobile Arch"]}
              variant="full"
            />
          </div>

          {/* 2. FLEEK.XYZ - Flagship */}
          <div style={{ gridColumn: "span 2" }}>
            <WorkCard
              title="Fleek.xyz"
              role="Frontend Engineer (Contract)"
              date="Aug 2025 - Dec 2025"
              description="Engineered a Component Design System across 6 codebases. Built a high-performance Tauri desktop app utilizing memoization to maintain 60fps during complex data viz."
              tags={["Tauri", "Rust/C++", "Cloudflare R2", "Next.js"]}
              variant="full"
            />
          </div>

          {/* 3. SUBSCART - Compact */}
          <div style={{ gridColumn: "span 1" }}>
            <WorkCard
              title="Subscart"
              role="Software Eng."
              date="Mar - Jun 2025"
              description="Achieved 200ms faster perceived latency using Optimistic UI updates on Node.js & Mobile."
              tags={["Optimistic UI", "Node.js"]}
              variant="compact"
            />
          </div>

          {/* 4. IOTREE MINDS - Compact */}
          <div style={{ gridColumn: "span 1" }}>
            <WorkCard
              title="Iotree Minds"
              role="Mobile Eng."
              date="Dec 2024 - Mar 2025"
              description="Integrated 12 backend APIs and delivered the 'My Clients' module supporting 50+ active users."
              tags={["API Integration", "UX Revamp"]}
              variant="compact"
            />
          </div>

          <TerminalCard
            title="IIT Madras"
            role="Research Intern"
            date="2023 - 2024 (Periodic)"
            fileName="research_logs.py"
            badgeText="READ ONLY"
            bullets={[
              "Created a 1 Gbps Python network speed test server.",
              "Variance maintained below 5%.",
              "Deployed cross-platform app with sub-second latency.",
            ]}
            tags={["Python", "Networking", "High_Performance"]}
          />
        </div>
      </main>
    </div>
  );
};

export default ExperiencePage;
