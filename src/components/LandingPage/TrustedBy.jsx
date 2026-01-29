export default function TrustedBy() {
  return (
    <section className="border-y border-white/5 py-10 sm:py-12 bg-white/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 sm:mb-10">
          Trusted by technical teams worldwide
        </p>

        <div className="flex flex-wrap justify-center items-center text-white gap-8 sm:gap-10 md:gap-14 lg:gap-20 opacity-40 grayscale contrast-125">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">token</span>
            <span className="text-lg sm:text-xl font-bold tracking-tighter">FORGE</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">deployed_code</span>
            <span className="text-lg sm:text-xl font-bold tracking-tighter">VELOCITY</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">hub</span>
            <span className="text-lg sm:text-xl font-bold tracking-tighter">NEXUS</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">view_cozy</span>
            <span className="text-lg sm:text-xl font-bold tracking-tighter">MANTRA</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">terminal</span>
            <span className="text-lg sm:text-xl font-bold tracking-tighter">OVERLAY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
