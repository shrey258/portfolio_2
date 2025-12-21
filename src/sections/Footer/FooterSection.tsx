import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion, cubicBezier, useReducedMotion } from "motion/react";
import type { MotionProps } from "motion/react";

const footerLinks = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "#selected-projects" },
  { label: "Design Lab", href: "#design-lab" },
  { label: "Writing", href: "#writing" },
];

const socialLinks = [
  { icon: <Github size={18} />, href: "https://github.com/shrey258", label: "GitHub" },
  { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/shrey258", label: "LinkedIn" },
  { icon: <Mail size={18} />, href: "mailto:gshrey258@gmail.com", label: "Email" },
];

const FooterSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const easing = cubicBezier(0.165, 0.84, 0.44, 1);

  const revealProps: MotionProps = shouldReduceMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.4, ease: easing },
      };

  return (
    <footer className="w-full" id="site-footer">
      <motion.div
        {...revealProps}
        className="relative overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-b from-white/5/5 to-white/5/0 px-8 py-10 md:py-14"
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.25),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex-1">
              <p className="text-sm font-mono uppercase tracking-[0.35em] text-white/40 mb-3">
                Let’s build something bold
              </p>
              <h2 className="font-display-serif text-4xl md:text-5xl text-white leading-tight">
                Available for forward-thinking teams & daring collabs.
              </h2>
              <p className="text-white/70 mt-3 max-w-xl">
                Crafting cinematic product experiences across web, mobile, and spatial surfaces.
                Open to contracts, roles, and advisory work.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://cal.com/shrey258/15min"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-3 text-sm font-semibold transition-colors hover:bg-gray-200"
                >
                  <Mail size={16} />
                  Book a call
                </a>
                <a
                  href="https://drive.google.com/file/d/1zp4HhCNCRpIgsyz2kMiMapIPzv7QtSgu/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <ArrowUpRight size={16} />
                  Resume
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4 min-w-[220px]">
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white/70 transition-all duration-200 hover:bg-white/15 hover:text-white"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              <div className="text-sm text-white/50">
                <p className="uppercase tracking-[0.35em] font-mono text-xs mb-1">Status</p>
                <p>Based in Darjeeling · Working remote · EST timezone</p>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-white/60">
            <div className="flex flex-wrap gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-white/40 font-mono text-xs">
              © {new Date().getFullYear()} Shreyansh Gupta. Built with craft, motion, and caffeine.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
