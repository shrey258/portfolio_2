import { ExternalLink, FileText } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import TagPill from "../../components/TagPill";
import GlassLinkCard from "./components/GlassLinkCard";
import { motion, useReducedMotion, cubicBezier } from "motion/react";
import type { MotionProps } from "motion/react";

const WritingSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const easing = cubicBezier(0.165, 0.84, 0.44, 1);

  const createReveal = (delay = 0): MotionProps => {
    if (shouldReduceMotion) return { initial: false };
    return {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.4 },
      transition: { duration: 0.3, ease: easing, delay },
    };
  };

  const articles = [
    {
      title: "Building a receipt printer animation in React Native",
      platform: "ReactNativeComponents · Articles",
      url: "https://reactnativecomponents.com/articles/building-a-receipt-printer-animation-in-react-native",
      tags: ["React Native", "Reanimated", "Motion", "Animation"],
    },
  ];

  return (
    <section className="w-full" id="writing">
      <motion.div {...createReveal(0)}>
        <SectionHeader
          label="Writing"
          subLabel="Blogs & Deep Dives"
          className="mb-6"
          labelClassName="text-base font-mono text-white/50 tracking-widest uppercase whitespace-nowrap"
          subLabelClassName="text-lg font-semibold text-white"
          showDivider={false}
          icon={<FileText size={16} className="text-white/60" />}
          iconWrapperClassName="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <motion.div
            key={article.url}
            {...createReveal(0.1)}
            className="contents"
          >
            <GlassLinkCard
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
            <div className="absolute inset-0 bg-linear-to-r from-white/5 via-transparent to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-wide text-emerald-300/80">
                  {article.platform}
                </span>
                <h3 className="text-xl font-semibold text-white leading-snug m-0">
                  {article.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <TagPill key={tag} label={tag} />
                  ))}
                </div>
              </div>
              <ExternalLink className="text-white/50 group-hover:text-white transition-colors duration-300 shrink-0 mt-1" size={18} />
            </div>
          </GlassLinkCard>
        </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WritingSection;
