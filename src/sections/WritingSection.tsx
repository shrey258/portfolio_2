import { ExternalLink, FileText } from "lucide-react";
import TagPill from "../components/TagPill";

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
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80">
          <FileText size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-mono uppercase tracking-[0.25em] text-white/50">
            Writing
          </span>
          <span className="text-lg font-semibold text-white">
            Blogs & Deep Dives
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 p-5 hover:border-white/25 transition-all duration-300"
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
          </a>
        ))}
      </div>
    </section>
  );
};

export default WritingSection;
