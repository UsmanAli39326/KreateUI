import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    step: "01",
    title: "Understand your vision.",
    description:
      "Provide a simple prompt or a reference URL. Our AI analyzes the core structure, branding, and intent behind the design, establishing a foundational layout tree in milliseconds.",
    visual: "analyze",
  },
  {
    step: "02",
    title: "Build the components.",
    description:
      "We don't just generate flat HTML. The engine constructs responsive, modular React components styled with Tailwind CSS, ready to drop into your existing codebase.",
    visual: "code",
  },
  {
    step: "03",
    title: "Optimize everything.",
    description:
      "Before delivery, the code is passed through an optimization pipeline. Images are compressed, aria-labels are injected, and performance bottlenecks are eliminated automatically.",
    visual: "score",
  },
];

function AnalyzeVisual() {
  return (
    <div className="w-full h-full bg-[#0A111A] rounded-3xl p-8 flex flex-col gap-4 border border-white/10 relative overflow-hidden">
      {/* scanning beam */}
      <div className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent border-y border-blue-400/20 animate-[scanBeam_3s_ease-in-out_infinite] pointer-events-none z-10" />
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-blue-400 text-lg">radar</span>
        </div>
        <div className="flex-1">
          <div className="h-3 w-2/5 bg-white/10 rounded mb-2" />
          <div className="h-2 w-1/3 bg-white/5 rounded" />
        </div>
        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {[
          { label: "Contrast", ok: true },
          { label: "ARIA", ok: false },
          { label: "Alt text", ok: true },
          { label: "Focus", ok: false },
        ].map((item, i) => (
          <div key={i} className={`rounded-xl p-3 border flex items-center gap-2 ${item.ok ? "bg-green-500/5 border-green-500/20" : "bg-red-500/10 border-red-500/30"}`}>
            <span className={`material-symbols-outlined text-base ${item.ok ? "text-green-400" : "text-red-400"}`}>{item.ok ? "check_circle" : "warning"}</span>
            <span className="text-xs text-white/60 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-base">search</span>
        </div>
        <div className="flex-1">
          <div className="h-2 w-full bg-white/10 rounded mb-1.5" />
          <div className="h-2 w-3/4 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
}

function CodeVisual() {
  return (
    <div className="w-full h-full bg-[#0F172A] rounded-3xl p-6 flex flex-col border border-white/10 relative overflow-hidden">
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-5">
        <div className="flex gap-1.5">
          {["bg-red-500", "bg-yellow-500", "bg-green-500"].map((c, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
          ))}
        </div>
        <span className="flex-1 text-center text-xs text-white/30 font-mono">HeroSection.jsx</span>
      </div>
      <div className="flex-1 font-mono text-xs sm:text-sm space-y-1.5 overflow-hidden">
        <p><span className="text-pink-400">export default function</span> <span className="text-blue-300">HeroSection</span><span className="text-white">()</span> <span className="text-white">{"{"}</span></p>
        <p className="ml-4"><span className="text-slate-400">return</span> <span className="text-white">(</span></p>
        <p className="ml-8"><span className="text-yellow-300">{"<section"}</span> <span className="text-green-300">aria-label</span><span className="text-white">{"="}</span><span className="text-amber-300">{"\"Hero\""}</span><span className="text-yellow-300">{">"}</span></p>
        <p className="ml-12"><span className="text-yellow-300">{"<h1"}</span> <span className="text-green-300">className</span><span className="text-white">{"="}</span><span className="text-amber-300">{"\"text-6xl font-bold\""}</span><span className="text-yellow-300">{">"}</span></p>
        <p className="ml-16 text-slate-300">Build faster with AI</p>
        <p className="ml-12"><span className="text-yellow-300">{"</h1>"}</span></p>
        <p className="ml-12"><span className="text-slate-400">{"/* AI:"}</span> <span className="text-emerald-400">Added semantic landmark</span> <span className="text-slate-400">{"*/"}</span></p>
        <p className="ml-12"><span className="text-yellow-300">{"<Button"}</span> <span className="text-green-300">aria-label</span><span className="text-white">{"="}</span><span className="text-amber-300">{"\"Get started\""}</span><span className="text-yellow-300">{" />"}</span></p>
        <p className="ml-8"><span className="text-yellow-300">{"</section>"}</span></p>
        <p className="ml-4"><span className="text-white">)</span></p>
        <p><span className="text-white">{"}"}</span></p>
      </div>
      {/* Blinking cursor */}
      <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse mt-1 ml-4" />
    </div>
  );
}

function ScoreVisual() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0A1F12] to-[#0A111A] rounded-3xl p-8 flex flex-col items-center justify-center border border-green-500/20 relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(34,197,94,0.08)_0%,_transparent_70%)]" />
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 rounded-full animate-pulse" />
        <svg className="w-28 h-28 relative z-10" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1a2e1a" strokeWidth="10"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="url(#scoreGrad)" strokeWidth="10" strokeLinecap="round"
            strokeDasharray="314" strokeDashoffset="3" transform="rotate(-90 60 60)"/>
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e"/>
              <stop offset="100%" stopColor="#4ade80"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-black text-green-400">100</span>
        </div>
      </div>
      <h4 className="text-2xl font-extrabold text-white mb-2 font-[var(--font-display)]">Perfect Score</h4>
      <p className="text-green-400/80 text-sm font-medium mb-6">Lighthouse Accessibility & Performance</p>
      <div className="grid grid-cols-3 gap-3 w-full">
        {["Perf", "A11y", "SEO"].map((label, i) => (
          <div key={i} className="bg-green-500/10 border border-green-500/20 rounded-xl p-2 text-center">
            <div className="text-green-400 font-black text-lg">100</div>
            <div className="text-white/40 text-[10px] font-medium">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const visualComponents = [AnalyzeVisual, CodeVisual, ScoreVisual];

export default function AICapabilities() {
  const sectionRef = useRef(null);
  const rightRef = useRef(null);
  const textRefs = useRef([]);
  const visualRefs = useRef([]);

  const addTextRef = (el) => { if (el && !textRefs.current.includes(el)) textRefs.current.push(el); };
  const addVisualRef = (el) => { if (el && !visualRefs.current.includes(el)) visualRefs.current.push(el); };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin right panel while left scrolls
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: rightRef.current,
        start: "top top",
        end: "bottom bottom",
        pinSpacing: false,
      });

      // For each story section, swap visuals and dim text
      textRefs.current.forEach((textEl, i) => {
        ScrollTrigger.create({
          trigger: textEl,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => switchVisual(i),
          onEnterBack: () => switchVisual(i),
        });
      });

      // Initial state
      visualRefs.current.forEach((v, i) => {
        gsap.set(v, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.92 });
      });
      textRefs.current.forEach((t, i) => {
        gsap.set(t, { opacity: i === 0 ? 1 : 0.35 });
      });

      function switchVisual(activeIdx) {
        visualRefs.current.forEach((v, i) => {
          gsap.to(v, {
            opacity: i === activeIdx ? 1 : 0,
            scale: i === activeIdx ? 1 : 0.92,
            duration: 0.6,
            ease: "power3.out",
          });
        });
        textRefs.current.forEach((t, i) => {
          gsap.to(t, {
            opacity: i === activeIdx ? 1 : 0.35,
            duration: 0.4,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-0 relative">
      <style>{`
        @keyframes scanBeam {
          0%  { top: -80px; }
          50% { top: 100%; }
          100% { top: 100%; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">

          {/* Left: scrollable text */}
          <div className="w-full lg:w-1/2 py-[20vh]">
            <div className="mb-16 pr-8 lg:pr-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">How it works</p>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight font-[var(--font-display)]">
                The engine behind the magic.
              </h2>
            </div>

            {stories.map((story, i) => (
              <div ref={addTextRef} key={i} className="h-[85vh] flex flex-col justify-center pr-8 lg:pr-16 transition-opacity duration-500">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary/50 mb-5">Step {story.step}</span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy mb-6 font-[var(--font-display)] tracking-tight leading-tight">
                  {story.title}
                </h3>
                <p className="text-lg sm:text-xl text-text-2 leading-relaxed max-w-md">
                  {story.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: pinned visual panel */}
          <div className="hidden lg:block w-1/2 h-screen relative">
            <div ref={rightRef} className="h-screen flex items-center justify-center p-12">
              <div className="relative w-full max-w-md aspect-[4/3.5]">
                {stories.map((_, i) => {
                  const Visual = visualComponents[i];
                  return (
                    <div
                      ref={addVisualRef}
                      key={i}
                      className="absolute inset-0"
                    >
                      <Visual />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
