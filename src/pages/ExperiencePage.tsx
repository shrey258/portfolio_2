import { useEffect } from "react";
import { motion, useReducedMotion, cubicBezier } from "motion/react";
import type { MotionProps, Variants } from "motion/react";
import { ArrowLeft, Clock, Layers } from "lucide-react"; // Added icons
import { Link } from "react-router-dom";
import TopoBackground from "../components/TopoBackground";
import WorkCard from "../sections/Engineering Log/components/WorkCard";
import { roles } from "../data/profile";

const ExperiencePage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shouldReduceMotion = useReducedMotion();
  const easing = cubicBezier(0.165, 0.84, 0.44, 1);

  const createReveal = (delay = 0): MotionProps => {
    if (shouldReduceMotion) return { initial: false };
    return {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: { duration: 0.35, ease: easing, delay },
    };
  };

  const gridVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: easing },
    },
  };

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
          <motion.div {...createReveal(0)}>
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
          </motion.div>

          {/* NEW: DASHBOARD META HEADER */}
          <motion.div
            {...createReveal(0.1)}
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
                  2023 — 2026
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
                  {roles.length} Positions
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BENTO GRID */}
        <motion.div
          variants={gridVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            width: "100%",
          }}
        >
          {roles.map((r) => (
            <motion.div key={r.company} style={{ gridColumn: r.featured ? "span 2" : "span 1" }} variants={cardVariants}>
              <WorkCard
                title={r.company}
                role={r.title}
                date={r.dates}
                description={[r.summary, ...(r.highlights ?? [])].join(" ")}
                tags={r.tags}
                variant={r.featured ? "full" : "compact"}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ExperiencePage;
