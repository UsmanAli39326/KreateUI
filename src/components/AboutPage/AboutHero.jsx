// src/pages/About/sections/AboutHero.jsx
import React from "react";

export default function AboutHero() {
  return (
    <section className="max-w-240 w-full px-6 py-16 md:py-20 text-center">
      <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-6">
        Our Mission
      </p>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-text-1">
        Empowering developers to build an <br className="hidden sm:block" />
        <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-accent-1">
          accessible web
        </span>{" "}
        for everyone.
      </h1>

      <p className="text-text-3 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        We are on a mission to bridge the gap between AI efficiency and human
        accessibility. Our platform leverages advanced data-driven insights to
        ensure every user has a seamless experience.
      </p>
    </section>
  );
}
