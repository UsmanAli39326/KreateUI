import { useRef, useState } from "react";
import { motion } from "framer-motion";

const featureIcons = {
  "Intelligent Layouts": { gradient: "from-blue-500 to-indigo-600", light: "bg-blue-50" },
  "Native Accessibility": { gradient: "from-emerald-500 to-teal-600", light: "bg-emerald-50" },
  "Extreme Performance": { gradient: "from-orange-500 to-amber-500", light: "bg-orange-50" },
};

export default function FeatureCard({ icon, bgIcon, title, description, items, index }) {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const theme = featureIcons[title] || { gradient: "from-primary to-accent-hover", light: "bg-accent-soft" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: "easeOut" } }}
      className="group p-7 sm:p-9 rounded-3xl bg-white border border-border-1 hover:border-transparent transition-all relative overflow-hidden shadow-ambient hover:shadow-[0_20px_60px_-15px_rgba(11,31,58,0.15)] cursor-pointer"
    >
      {/* Animated magnetic glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, rgba(232,116,59,0.07), transparent 50%)`,
        }}
      />

      {/* Top-right ghost icon */}
      <div className="absolute top-0 right-0 p-6 opacity-[0.04] group-hover:opacity-[0.07] transition-all duration-700 transform group-hover:scale-105 group-hover:rotate-3 origin-top-right text-navy pointer-events-none">
        <span className="material-symbols-outlined" style={{ fontSize: "7rem" }}>{bgIcon}</span>
      </div>

      {/* Icon */}
      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
        <span className="material-symbols-outlined text-white text-2xl">{icon}</span>
        {/* Glow ring */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500`} />
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-navy mb-3 relative z-10 font-[var(--font-display)] tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-text-2 leading-relaxed mb-7 text-sm sm:text-base relative z-10">
        {description}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-border-1 mb-6 relative z-10" />

      {/* Feature list */}
      <ul className="space-y-2.5 relative z-10">
        {items.map((label, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + i * 0.08 + 0.3 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-sm text-navy font-semibold"
          >
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center flex-shrink-0`}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: "13px" }}>check</span>
            </div>
            {label}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
