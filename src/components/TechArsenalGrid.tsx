import { Terminal, Smartphone, Cpu, Palette } from "lucide-react";
import { stack } from "../data/profile";

const TechArsenalGrid = () => {
  const icons = [
    <Terminal size={14} className="text-purple-400" />,
    <Smartphone size={14} className="text-blue-400" />,
    <Cpu size={14} className="text-green-400" />,
    <Palette size={14} className="text-orange-400" />,
  ];
  const techStack = stack.map((s, i) => ({ category: s.group, items: s.items, icon: icons[i] }));

  return (
    <div className="w-full bg-black/20 rounded-xl p-1 border border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
        {techStack.map((stack) => (
          <div key={stack.category} className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              {stack.icon}
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                {stack.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.items.map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium text-white/80 bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechArsenalGrid;
