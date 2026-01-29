// src/pages/About/sections/AboutCTA.jsx
import React from "react";
import { Button } from "../Common";

export default function AboutCTA({ onJoinTeam, onViewCultureDeck }) {
  return (
    <section className="max-w-240 w-full px-6 py-20 md:py-24 text-center">
      <div className="bg-linear-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-10 md:p-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #7c38fa 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-1">
          Build the future with us.
        </h2>

        <p className="text-text-3 text-lg mb-10 max-w-xl mx-auto">
          We&apos;re always looking for passionate engineers and researchers who
          believe the web should be accessible to everyone.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" onClick={onJoinTeam}>
            Join the Team
          </Button>
          <Button variant="secondary" size="lg" onClick={onViewCultureDeck}>
            View Culture Deck
          </Button>
        </div>
      </div>
    </section>
  );
}
