export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 tracking-tighter">
          Ready to build for everyone?
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Join 2,400+ technical teams and start delivering fully accessible interfaces without the manual overhead.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="bg-primary text-white text-base sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl hover:scale-[1.02] transition-all shadow-2xl shadow-primary/20">
            Get Started Free
          </button>

          <button className="bg-white/5 text-white text-base sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            Book a Technical Demo
          </button>
        </div>

        <p className="mt-6 sm:mt-8 text-slate-500 text-sm font-medium">
          No credit card required. Free 14-day trial.
        </p>
      </div>
    </section>
  );
}
