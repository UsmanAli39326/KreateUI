import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

export default function Features() {
  const cards = [
    {
      bgIcon: "view_quilt",
      icon: "dashboard_customize",
      title: "Intelligent Layouts",
      description:
        "Watch your ideas transform into beautiful, responsive components. Our engine understands design intent and builds structured DOM trees automatically.",
      items: ["Responsive Grids", "Component Mapping", "Fluid Typography"],
    },
    {
      bgIcon: "shield_locked",
      icon: "accessibility_new",
      title: "Native Accessibility",
      description:
        "Every generated element passes strict WCAG 2.2 guidelines. We bake in focus management, ARIA states, and semantic HTML by default.",
      items: ["Keyboard Navigation", "Screen Reader Ready", "Contrast Checked"],
    },
    {
      bgIcon: "rocket",
      icon: "bolt",
      title: "Extreme Performance",
      description:
        "We don't just write code; we write optimized code. Experience perfect Lighthouse scores with automatic code-splitting and asset compression.",
      items: ["Zero Layout Shift", "Optimized Assets", "Minimal Bundles"],
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-bg-1 z-30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-4 mb-16 lg:mb-24"
        >
          <div className="px-4 py-1.5 rounded-full bg-white border border-border-1 text-primary text-xs font-bold uppercase tracking-widest shadow-sm">
            Core Capabilities
          </div>
          <h2 className="text-text-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-[800px] font-[var(--font-display)]">
            Everything you need.<br/>
            <span className="text-text-3">Nothing you don't.</span>
          </h2>
          <p className="text-text-2 text-lg sm:text-xl max-w-[600px] leading-relaxed mt-4">
            Kreate UI goes beyond simple generation. We build robust, enterprise-grade foundations that scale with your product.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((c, i) => (
            <FeatureCard key={c.title} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
