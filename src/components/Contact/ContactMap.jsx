// src/pages/Contact/sections/ContactMap.jsx
import React from "react";

export default function ContactMap({ className = "" }) {
  return (
    <section
      className={[
        "rounded-2xl overflow-hidden border border-border-1 relative h-65 sm:h-75 group",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/25 transition-all duration-500" />

      <img
        alt="Map view of San Francisco"
        className="w-full h-full object-cover grayscale brightness-50"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5DtpI-dnM58OFBtbJhiZ-IuAFa2fx9BbWQgcPLLWaS2Ljfv75FFtoL7P02RmH_emCVLUf2-MRqkTWiWX0-hjeTynRHmBQvlsPt8agcM0iP4exdMtlh_oPXcW_hZLnX1fUPpv74bGvh3_RNggLjT07eZ13ATPE6HjxHdpQq8SCP4EvpnJF6hmn81W60uHKAPGg33ujflkL9bGCpsWdUDCl6tAT6CKri1-46VyQ0ulGFnJkMbQAhluArkNFyvwDG1Q2TNHqGuH8K_NL"
      />

      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20 bg-bg-1/90 backdrop-blur-md p-4 rounded-xl border border-border-1 shadow-xl">
        <p className="text-text-1 font-bold mb-1">Our HQ</p>
        <p className="text-text-3 text-sm">Lahore | Pakistan</p>
      </div>
    </section>
  );
}
