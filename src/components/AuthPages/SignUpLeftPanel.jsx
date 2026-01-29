// src/pages/Auth/SignUp/SignUpLeftPanel.jsx
import React from "react";

export default function SignUpLeftPanel() {
  return (
    <div className="hidden lg:flex flex-col gap-8">
      {/* Visual mock */}
      <div className="w-full aspect-video rounded-2xl border border-border-2 bg-gradient-to-br from-primary/20 to-surface-1 flex items-center justify-center p-8 overflow-hidden relative">
        <div className="absolute inset-0 opacity-40 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 w-full">
          <div className="h-8 w-32 bg-primary/40 rounded-full animate-pulse" />
          <div className="grid grid-cols-3 gap-4">
            <div className="h-24 bg-white/5 rounded-lg" />
            <div className="h-24 bg-white/5 rounded-lg" />
            <div className="h-24 bg-primary/20 rounded-lg border border-primary/40" />
          </div>
          <div className="h-4 w-full bg-white/5 rounded-full" />
          <div className="h-4 w-2/3 bg-white/5 rounded-full" />
        </div>
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl xl:text-5xl font-black text-text-1 leading-tight">
          Start building <span className="text-primary">accessible</span> UIs today
        </h1>
        <p className="text-lg text-text-3">
          Join 10,000+ developers building inclusive web experiences with our AI-driven accessibility platform.
        </p>
      </div>

      {/* Social proof */}
      <div className="flex flex-wrap gap-6 items-center pt-4">
        <div className="flex -space-x-3">
          {["JD", "AS", "MK", "+10k"].map((t, idx) => (
            <div
              key={t}
              className={`size-10 rounded-full border-2 border-bg-1 flex items-center justify-center text-xs font-bold ${
                idx === 1 ? "bg-primary" : idx === 2 ? "bg-accent-1" : "bg-white/10"
              }`}
            >
              {t}
            </div>
          ))}
        </div>

        <div className="text-sm font-medium text-text-3 italic">
          “The fastest way to ensure WCAG compliance.”
        </div>
      </div>
    </div>
  );
}
