// src/pages/About/AboutContent.jsx
import React from "react";
import AboutHero from "../components/AboutPage/AboutHero";
import TeamSection from "../components/AboutPage/TeamSection";
import PhilosophySection from "../components/AboutPage/PhilosophySection";
import AboutCTA from "../components/AboutPage/AboutCTA"

export default function AboutContent() {
  return (
    <div className="w-full flex flex-col items-center">
      <AboutHero />
      <div className="w-full max-w-full h-px bg-border-1" />
      <TeamSection onViewOpenings={() => console.log("openings")} />
      <PhilosophySection />
      <AboutCTA
        onJoinTeam={() => console.log("join team")}
        onViewCultureDeck={() => console.log("culture deck")}
      />
    </div>
  );
}
