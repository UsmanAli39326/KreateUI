export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 text-center bg-bg-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-1 mb-6 sm:mb-8 tracking-tight font-[var(--font-display)]">
          Ready to build for everyone?
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-text-2 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Join 2,400+ technical teams and start delivering fully accessible interfaces without the manual overhead.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="bg-primary text-white text-base sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl hover:bg-accent-hover hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 cursor-pointer">
            Get Started Free
          </button>

          <button className="bg-navy text-white text-base sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-xl hover:bg-navy-hover transition-all cursor-pointer">
            Book a Technical Demo
          </button>
        </div>

        <p className="mt-6 sm:mt-8 text-text-3 text-sm font-medium">
          No credit card required. Free 14-day trial.
        </p>
      </div>
    </section>
  );
}
