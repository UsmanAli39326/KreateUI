import React from "react";
import { motion } from "framer-motion";
import AboutHero from "../components/AboutPage/AboutHero";
import TeamSection from "../components/AboutPage/TeamSection";
import PhilosophySection from "../components/AboutPage/PhilosophySection";
import AboutCTA from "../components/AboutPage/AboutCTA";

export default function AboutContent() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col items-center bg-background-main overflow-hidden"
    >
      <AboutHero />
      
      <div className="w-full max-w-full h-px bg-linear-to-r from-transparent via-border-1 to-transparent" />
      
      {/* <TeamSection onViewOpenings={() => console.log("openings")} /> */}
      
      <PhilosophySection />
      
      <AboutCTA
        onJoinTeam={() => console.log("join team")}
        onViewCultureDeck={() => console.log("culture deck")}
      />
      
      <div className="w-full bg-surface-1 py-8 flex justify-center text-text-3 text-sm border-t border-border-1">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Developed and powered by <span className="font-semibold text-text-1 ml-1 bg-clip-text text-transparent bg-linear-to-r from-primary to-accent-1">Devtechnoz</span>.
        </motion.p>
      </div>
    </motion.div>
  );
}
