import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function Counter({ from = 0, to, suffix = "" }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-80px" });
  const spring = useSpring(from, { damping: 25, stiffness: 40 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) spring.set(to);
  }, [isInView, to, spring]);

  return <motion.span ref={nodeRef}>{display}</motion.span>;
}

const stats = [
  {
    label: "Websites Generated",
    value: 12000,
    suffix: "+",
    icon: "language",
    color: "from-blue-500 to-indigo-500",
    description: "Production-ready sites shipped"
  },
  {
    label: "Hours Saved",
    value: 45000,
    suffix: "h",
    icon: "schedule",
    color: "from-violet-500 to-purple-600",
    description: "Developer hours reclaimed"
  },
  {
    label: "Lighthouse Score",
    value: 100,
    suffix: "",
    icon: "speed",
    color: "from-emerald-400 to-green-500",
    description: "Average performance score"
  },
  {
    label: "Uptime",
    value: 99,
    suffix: ".9%",
    icon: "signal_cellular_alt",
    color: "from-orange-400 to-amber-500",
    description: "Guaranteed service reliability"
  },
];

export default function StatsAndAchievements() {
  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#E8743B12_0%,_transparent_60%)]" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(circle,_#ffffff05_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_#ffffff05_0%,_transparent_70%)]" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">By the numbers</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-[var(--font-display)] text-white">
            Trusted by teams who ship.
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="relative bg-white/5 border border-white/10 rounded-3xl p-7 flex flex-col gap-4 hover:bg-white/8 hover:border-white/20 transition-all duration-300 overflow-hidden group cursor-default"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <span className="material-symbols-outlined text-white text-xl">{stat.icon}</span>
              </div>

              {/* Number */}
              <div className={`text-4xl sm:text-5xl font-black font-mono bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div>
                <div className="font-extrabold text-white text-base">{stat.label}</div>
                <div className="text-white/40 text-xs mt-0.5 font-medium">{stat.description}</div>
              </div>

              {/* Decorative corner glow */}
              <div className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity blur-xl`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
