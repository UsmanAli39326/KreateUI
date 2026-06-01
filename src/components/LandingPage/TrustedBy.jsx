export default function TrustedBy() {
  const logos = [
    { icon: "token", name: "FORGE" },
    { icon: "deployed_code", name: "VELOCITY" },
    { icon: "hub", name: "NEXUS" },
    { icon: "view_cozy", name: "MANTRA" },
    { icon: "terminal", name: "OVERLAY" },
    { icon: "cloud_sync", name: "STRATUM" },
    { icon: "lan", name: "GRIDLOCK" },
  ];

  // Duplicate to create seamless infinite loop
  const duplicated = [...logos, ...logos];

  return (
    <section className="border-y border-border-1 py-8 bg-bg-1 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-text-3 mb-8">
          Trusted by technical teams worldwide
        </p>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-bg-1 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-bg-1 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-10 md:gap-16 items-center">
          {duplicated.map((logo, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-6 text-navy opacity-25 hover:opacity-60 transition-opacity duration-300 select-none shrink-0"
            >
              <span className="material-symbols-outlined text-2xl sm:text-3xl">{logo.icon}</span>
              <span className="text-lg sm:text-xl font-extrabold tracking-tighter whitespace-nowrap">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
