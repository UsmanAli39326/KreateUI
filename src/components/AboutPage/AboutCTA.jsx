import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../Common";

export default function AboutCTA({ onJoinTeam, onViewCultureDeck }) {
  const navigate = useNavigate();
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#FAF3F0] border border-primary/20 rounded-[3rem] p-12 md:p-24 relative overflow-hidden group"
      >
        {/* Animated dot pattern */}
        <motion.div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #E8743B 1.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "32px 32px"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden="true"
        />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 pointer-events-none" />

        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-navy tracking-tight"
          >
            Build the future with us.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-navy/60 font-medium text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;re always looking for passionate engineers and researchers who
            believe the web should be accessible to everyone.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              iconRight={<span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              className="text-lg font-bold px-10 py-5 rounded-2xl shadow-[0_0_40px_rgba(232,116,59,0.4)] group"
            >
              Start Generating
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate('/documentation')}
              className="bg-transparent border-navy/20 text-navy hover:bg-navy/5 text-lg font-bold px-10 py-5 rounded-2xl"
            >
              View Documentation
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
