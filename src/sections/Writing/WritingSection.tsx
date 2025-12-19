import { ExternalLink, FileText } from "lucide-react";
import SectionHeader from "../../components/SectionHeader";
import TagPill from "../../components/TagPill";
import GlassLinkCard from "./components/GlassLinkCard";

const WritingSection = () => {
  const articles = [
    {
      title: "Building a receipt printer animation in React Native",
      platform: "ReactNativeComponents · Articles",
      url: "https://reactnativecomponents.com/articles/building-a-receipt-printer-animation-in-react-native",
      tags: ["React Native", "Reanimated", "Motion", "Animation"],
    },
  ];

  return (
    <section className="w-full">
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

      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <GlassLinkCard
            key={article.url}
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
        ))}
      </div>
    </section>
  );
};

export default WritingSection;
