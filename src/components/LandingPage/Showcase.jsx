import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "SaaS Dashboard",
    category: "Productivity",
    bg: "bg-navy",
    text: "text-white",
    accent: "bg-white/10",
    icon: "dashboard",
    tags: ["React", "Tailwind", "D3.js"],
  },
  {
    title: "E-Commerce Storefront",
    category: "Retail",
    bg: "bg-gradient-to-br from-emerald-600 to-teal-500",
    text: "text-white",
    accent: "bg-white/10",
    icon: "shopping_bag",
    tags: ["Next.js", "Stripe", "GSAP"],
  },
  {
    title: "Fintech Application",
    category: "Finance",
    bg: "bg-gradient-to-br from-violet-600 to-indigo-600",
    text: "text-white",
    accent: "bg-white/10",
    icon: "account_balance",
    tags: ["React", "Chart.js", "Node.js"],
  },
  {
    title: "Creator Portfolio",
    category: "Creative",
    bg: "bg-gradient-to-br from-orange-400 to-pink-500",
    text: "text-white",
    accent: "bg-white/10",
    icon: "palette",
    tags: ["Astro", "Three.js", "Framer"],
  },
  {
    title: "Healthcare Platform",
    category: "Medical",
    bg: "bg-gradient-to-br from-sky-500 to-cyan-400",
    text: "text-white",
    accent: "bg-white/10",
    icon: "health_and_safety",
    tags: ["React", "TypeScript", "FHIR"],
  },
];

export default function Showcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    // Wait for layout to settle
    const timer = setTimeout(() => {
      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      const ctx = gsap.context(() => {
        // Main horizontal scroll animation pinned to section
        gsap.to(track, {
          x: () => -totalScrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => "+=" + totalScrollWidth,
            invalidateOnRefresh: true,
          },
        });

        // Stagger card entrance
        const cards = gsap.utils.toArray(".showcase-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }, section);

      // Store ctx for cleanup
      section._gsapCtx = ctx;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (section._gsapCtx) {
        section._gsapCtx.revert();
      }
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) {
          st.kill();
        }
      });
    };
  }, [isMounted]);

  return (
    <section
      ref={sectionRef}
      className="bg-background-main h-screen flex flex-col justify-center overflow-hidden relative z-50"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10 w-full flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            What we build
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight font-[var(--font-display)] leading-none">
            Infinite possibilities.{" "}
            <br />
            <span className="text-gradient">Generated instantly.</span>
          </h2>
        </div>
        <p className="hidden lg:block max-w-xs text-text-2 text-lg leading-relaxed">
          Every project is optimized for accessibility, performance, and
          conversion out of the box.
        </p>
      </div>

      {/* Scrolling Track */}
      <div className="relative w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex gap-5 px-6 lg:px-12 will-change-transform"
          style={{ width: "max-content" }}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className={`showcase-card shrink-0 w-[340px] sm:w-[400px] lg:w-[440px] h-[320px] sm:h-[380px] rounded-3xl ${project.bg} ${project.text} p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer`}
            >
              {/* Shimmer overlay on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 rounded-3xl" />

              {/* Floating abstract shape */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-700 ease-out" />
              <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-700 ease-out delay-75" />

              {/* Top row */}
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest opacity-60`}>
                    {project.category}
                  </span>
                  <div className={`w-12 h-12 rounded-2xl ${project.accent} flex items-center justify-center mt-3 backdrop-blur-sm border border-white/20`}>
                    <span className="material-symbols-outlined text-2xl">{project.icon}</span>
                  </div>
                </div>
                <span className="text-3xl font-black font-mono opacity-20 group-hover:opacity-40 transition-opacity">
                  0{i + 1}
                </span>
              </div>

              {/* Bottom content */}
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-[var(--font-display)] tracking-tight leading-tight">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
