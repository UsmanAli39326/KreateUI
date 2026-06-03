import React, { Suspense } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const trustedLogos = ["FORGE", "NEXUS", "VELOCITY", "OVERLAY", "STRATUM"];

export default function Hero({ onAnalyze }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = new FormData(e.currentTarget).get("url");
    onAnalyze?.(url);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-background-main overflow-hidden">
      {/* ── Decorative gradients ── */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,_#E8743B14_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_#0B1F3A08_0%,_transparent_70%)] pointer-events-none" />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
        backgroundImage: "linear-gradient(to right, #0B1F3A 1px, transparent 1px), linear-gradient(to bottom, #0B1F3A 1px, transparent 1px)",
        backgroundSize: "72px 72px"
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col gap-7 sm:gap-8">

            {/* Pill badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="flex items-center gap-2"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-border-1 shadow-ambient text-xs font-bold uppercase tracking-widest text-navy">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Kreate UI Engine v3.0 — Now Live
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-navy leading-[1.05] tracking-[-0.03em] font-[var(--font-display)]"
            >
              Build the future.
              <br />
              <span className="text-gradient">Powered by AI.</span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-lg sm:text-xl text-text-2 max-w-lg leading-relaxed"
            >
              Generate beautiful, accessible, and conversion-focused websites in seconds. Kreate UI builds semantic layouts, ensures WCAG compliance, and optimizes for perfect Lighthouse scores — automatically.
            </motion.p>

            {/* Input row */}
            <motion.form
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl"
            >
              <label className="sr-only" htmlFor="hero-url">Website URL or Prompt</label>

              <div className="flex-1 relative group min-w-0">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-3 group-focus-within:text-primary transition-colors text-xl">
                  auto_awesome
                </span>
                <input
                  id="hero-url"
                  name="url"
                  type="text"
                  placeholder="Describe your next website…"
                  className="w-full bg-white border border-border-1 rounded-2xl py-4 pl-12 pr-4 text-text-1 placeholder:text-text-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-ambient text-base"
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-white font-bold px-7 py-4 rounded-2xl hover:bg-accent-hover active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 cursor-pointer whitespace-nowrap"
              >
                Generate
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </motion.form>

            {/* Social proof micro-strip */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="flex items-center gap-4 pt-2"
            >
              {/* Avatars */}
              <div className="flex -space-x-2">
                {["SJ", "MC", "ER", "DK"].map((initials, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-hover border-2 border-white flex items-center justify-center text-white text-[10px] font-extrabold">
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-sm text-text-2">
                <span className="font-bold text-navy">12,000+</span> websites generated this month
                <span className="ml-2 text-amber-400">★★★★★</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: 3D Canvas ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[480px] sm:h-[580px] lg:h-[680px] w-full"
          >
            {/* Glow behind canvas */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,_#E8743B18_0%,_transparent_60%)] rounded-3xl" />

            <img 
              src="/hero-illustration.png" 
              alt="Premium 3D website builder scene" 
              className="w-full h-full object-cover rounded-[1.5rem] relative z-10 shadow-2xl shadow-primary/20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}