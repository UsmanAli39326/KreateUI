import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FinalCTA() {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section className="py-24 sm:py-32 text-center bg-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[radial-gradient(ellipse_at_top,_#E8743B30_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-navy mb-6 sm:mb-8 tracking-tight font-[var(--font-display)]"
        >
          Ready to build the future?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl md:text-2xl text-navy/70 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Join elite teams generating production-ready, fully accessible websites at lightning speed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="relative bg-primary text-white text-lg font-bold px-10 py-5 rounded-2xl transition-colors hover:bg-accent-hover shadow-[0_0_40px_rgba(232,116,59,0.4)] cursor-pointer group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Generating
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </span>
          </motion.button>

          <Link
            to="/documentation"
            className="bg-transparent text-navy border border-navy/20 text-lg font-bold px-10 py-5 rounded-2xl hover:bg-navy/5 transition-all cursor-pointer inline-flex items-center justify-center decoration-none"
          >
            View Documentation
          </Link>
        </motion.div>

        <p className="mt-10 text-navy/50 text-sm font-medium tracking-wide uppercase">
          No credit card required. Free 14-day trial.
        </p>
      </div>
    </section>
  );
}
