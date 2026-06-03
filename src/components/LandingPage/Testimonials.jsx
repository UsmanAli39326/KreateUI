import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Kreate UI didn't just speed up our workflow — it entirely redefined it. We generate accessible components in seconds rather than days.",
    author: "Sarah Jenkins",
    role: "Lead Engineer",
    company: "TechFlow",
    avatar: "SJ",
    color: "from-orange-400 to-amber-500",
    rating: 5,
  },
  {
    quote:
      "The structural awareness of the AI is unmatched. It feels like pairing with a senior developer who deeply understands web standards.",
    author: "Michael Chen",
    role: "Founder",
    company: "StartupX",
    avatar: "MC",
    color: "from-violet-500 to-indigo-500",
    rating: 5,
  },
  {
    quote:
      "Finally, an AI generator that produces clean, semantic HTML instead of div-soup. A genuine game-changer for our entire agency.",
    author: "Elena Rodriguez",
    role: "Creative Director",
    company: "DesignCo",
    avatar: "ER",
    color: "from-emerald-400 to-teal-500",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isPaused) startAutoPlay();
    else stopAutoPlay();
    return () => stopAutoPlay();
  }, [isPaused, currentIndex]);

  const navigate = (dir) => {
    stopAutoPlay();
    setCurrentIndex(
      (prev) => (prev + dir + testimonials.length) % testimonials.length
    );
  };

  const t = testimonials[currentIndex];

  return (
    <section
      className="py-24 sm:py-32 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_#E8743B08_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,_#0B1F3A05_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section label */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight font-[var(--font-display)]">
            Loved by top engineering teams.
          </h2>
        </div>

        {/* Main card */}
        <div className="relative min-h-[320px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, { offset }) => {
                if (offset.x < -60) navigate(1);
                else if (offset.x > 60) navigate(-1);
              }}
            >
              <div className="bg-white border border-border-1 rounded-3xl p-8 sm:p-12 shadow-ambient-lg relative overflow-hidden cursor-grab active:cursor-grabbing">
                {/* Gradient accent */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${t.color}`}
                />

                {/* Quote mark */}
                <div className="absolute top-8 right-10 text-8xl font-serif text-border-1 leading-none select-none">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-navy leading-relaxed mb-10 max-w-3xl">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-extrabold text-lg shadow-lg`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-extrabold text-navy text-lg">
                      {t.author}
                    </div>
                    <div className="text-text-3 text-sm font-medium">
                      {t.role} at{" "}
                      <span className="text-primary font-bold">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Pagination dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  stopAutoPlay();
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-border-2 hover:bg-border-3"
                }`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-2xl border border-border-2 flex items-center justify-center text-text-2 hover:bg-white hover:text-primary hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-ambient"
              aria-label="Previous testimonial"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              onClick={() => navigate(1)}
              className="w-12 h-12 rounded-2xl border border-border-2 flex items-center justify-center text-text-2 hover:bg-white hover:text-primary hover:border-primary transition-all cursor-pointer shadow-sm hover:shadow-ambient"
              aria-label="Next testimonial"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
