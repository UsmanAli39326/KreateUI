import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        title: "Scan & Analyze",
        description: "Input your URL or prompt. Our AI instantly maps your DOM, checking for WCAG compliance, performance bottlenecks, and design inconsistencies.",
        icon: "radar",
        color: "bg-cat-sky text-navy"
    },
    {
        title: "Intelligent Generation",
        description: "The engine restructures your layouts, rewriting bad code and generating accessible semantic HTML with optimized assets.",
        icon: "memory",
        color: "bg-cat-lavender text-navy"
    },
    {
        title: "One-Click Deploy",
        description: "Review the suggested fixes in a side-by-side comparison. Apply all changes securely with one click to your connected repository.",
        icon: "rocket_launch",
        color: "bg-cat-mint text-navy"
    }
];

export default function Workflow() {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);
    const contentRef = useRef(null);
    const headingRef = useRef(null);
    const visualsRef = useRef([]);
    const textRefs = useRef([]);

    const addToVisuals = (el) => {
        if (el && !visualsRef.current.includes(el)) {
            visualsRef.current.push(el);
        }
    };

    const addToTexts = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useEffect(() => {
        // Small delay to let layout settle (especially with Lenis)
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                const visuals = visualsRef.current;
                const texts = textRefs.current;
                const contentHeight = contentRef.current.offsetHeight;

                // Set initial states for all visuals and texts
                visuals.forEach((visual, i) => {
                    if (i !== 0) {
                        gsap.set(visual, { opacity: 0, scale: 0.8, y: 50 });
                    }
                });
                texts.forEach((text, i) => {
                    if (i !== 0) {
                        gsap.set(text, { opacity: 0.4, scale: 0.95, x: -20 });
                    }
                });

                // Single master timeline synced to one ScrollTrigger
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: pinRef.current,
                        start: "top top",
                        end: "+=300%",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // --- Heading fade out (0% → 30%) ---
                tl.to(headingRef.current, {
                    y: -150,
                    opacity: 0,
                    ease: "none",
                    duration: 0.3,
                }, 0);

                // --- Content scroll (0% → 100%) ---
                tl.to(contentRef.current, {
                    y: -contentHeight + window.innerHeight,
                    ease: "none",
                    duration: 1,
                }, 0);

                // --- Step transitions ---
                // Step 1 visible from 0% → 33%
                // At ~30%, fade out visual 0 and text 0, fade in visual 1 and text 1
                // At ~63%, fade out visual 1 and text 1, fade in visual 2 and text 2

                // Transition 1: Step 0 → Step 1 (at ~30% of timeline)
                tl.to(visuals[0], {
                    opacity: 0, scale: 1.05, y: -30,
                    duration: 0.1,
                    ease: "power2.inOut",
                }, 0.28);

                tl.to(texts[0], {
                    opacity: 0.3, scale: 0.95, x: -20,
                    duration: 0.1,
                    ease: "power2.inOut",
                }, 0.28);

                tl.to(visuals[1], {
                    opacity: 1, scale: 1, y: 0,
                    duration: 0.1,
                    ease: "power2.out",
                }, 0.30);

                tl.to(texts[1], {
                    opacity: 1, scale: 1, x: 0,
                    duration: 0.1,
                    ease: "power2.out",
                }, 0.30);

                // Transition 2: Step 1 → Step 2 (at ~63% of timeline)
                tl.to(visuals[1], {
                    opacity: 0, scale: 1.05, y: -30,
                    duration: 0.1,
                    ease: "power2.inOut",
                }, 0.58);

                tl.to(texts[1], {
                    opacity: 0.3, scale: 0.95, x: -20,
                    duration: 0.1,
                    ease: "power2.inOut",
                }, 0.58);

                tl.to(visuals[2], {
                    opacity: 1, scale: 1, y: 0,
                    duration: 0.1,
                    ease: "power2.out",
                }, 0.60);

                tl.to(texts[2], {
                    opacity: 1, scale: 1, x: 0,
                    duration: 0.1,
                    ease: "power2.out",
                }, 0.60);

            }, sectionRef);

            sectionRef.current._gsapCtx = ctx;
        }, 150);

        return () => {
            clearTimeout(timer);
            if (sectionRef.current?._gsapCtx) {
                sectionRef.current._gsapCtx.revert();
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="bg-bg-0 relative z-10">
            <style>
                {`
                @keyframes scan {
                    0% { top: -100px; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 3s ease-in-out infinite;
                }
            `}
            </style>
            <div ref={pinRef} className="h-screen w-full flex overflow-hidden">

                {/* Left side: Text Content */}
                <div className="w-full lg:w-1/2 h-full relative">
                    <div ref={headingRef} className="absolute top-[15%] left-0 w-full px-8 lg:px-24 pointer-events-none z-10">
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-[#e8743b] mb-4 font-[var(--font-display)] tracking-tight">
                            How Kreate UI Works
                        </h2>
                    </div>

                    <div ref={contentRef} className="px-8 lg:px-24 pt-[50vh] pb-[50vh]">
                        {steps.map((step, index) => (
                            <div ref={addToTexts} key={index} className="h-[80vh] flex flex-col justify-center max-w-lg w-full">
                                <div className="p-8 lg:p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:bg-white/60 hover:-translate-y-1">
                                    {/* Subtle gradient background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                    <div className="relative z-10">
                                        <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-8 shadow-ambient transition-transform transform group-hover:scale-110 group-hover:rotate-3 duration-500`}>
                                            <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                                        </div>
                                        <h3 className="text-3xl lg:text-4xl font-extrabold text-navy mb-5 font-[var(--font-display)] tracking-tight leading-tight">{step.title}</h3>
                                        <p className="text-lg lg:text-xl text-text-2 leading-relaxed font-medium">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side: Visuals */}
                <div className="hidden lg:flex w-1/2 h-full items-center justify-center bg-navy relative border-l border-white/5 overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_#E8743B15_0%,_transparent_60%)] pointer-events-none"></div>

                    {/* Visual 1: Scanning */}
                    <div ref={addToVisuals} className="absolute inset-0 flex items-center justify-center p-12 z-10">
                        <div className="w-full max-w-xl aspect-[4/3] bg-[#0A111A] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 p-8 flex flex-col relative overflow-hidden group">
                            {/* Scanning line animation */}
                            <div className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent to-cat-sky/20 border-b border-cat-sky/50 animate-scan z-20 pointer-events-none"></div>

                            <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-cat-sky">language</span>
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="w-1/3 h-4 bg-white/10 rounded"></div>
                                    <div className="w-1/4 h-3 bg-white/5 rounded"></div>
                                </div>
                            </div>

                            <div className="flex-1 relative">
                                {/* Abstract wireframe */}
                                <div className="w-full h-full border border-white/5 rounded-xl p-4 flex flex-col gap-4">
                                    <div className="w-full h-12 border border-white/10 border-dashed rounded-lg flex items-center px-4 justify-between">
                                        <div className="w-1/4 h-3 bg-white/10 rounded"></div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-3 bg-white/5 rounded"></div>
                                            <div className="w-8 h-3 bg-white/5 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 flex-1">
                                        <div className="w-1/3 h-full border border-white/10 border-dashed rounded-lg relative overflow-hidden flex items-center justify-center">
                                            <div className="absolute inset-0 bg-red-500/10"></div>
                                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                            <span className="material-symbols-outlined text-red-500/50 text-4xl">warning</span>
                                        </div>
                                        <div className="w-2/3 h-full border border-white/10 border-dashed rounded-lg flex flex-col gap-2 p-2">
                                            <div className="w-full h-1/2 border border-white/5 rounded flex items-center justify-center">
                                                <div className="w-1/2 h-2 bg-white/10 rounded"></div>
                                            </div>
                                            <div className="w-full h-1/2 border border-white/5 rounded flex items-center justify-center">
                                                <div className="w-1/2 h-2 bg-white/10 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual 2: Generating */}
                    <div ref={addToVisuals} className="absolute inset-0 flex items-center justify-center p-12 z-20">
                        <div className="w-full max-w-xl aspect-[4/3] bg-[#0F172A] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 p-6 relative overflow-hidden flex flex-col">
                            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="text-xs text-cat-lavender font-mono bg-cat-lavender/10 px-3 py-1 rounded-full">Layout.jsx</span>
                            </div>
                            <div className="flex-1 font-mono text-sm space-y-2 overflow-hidden relative">
                                <p className="text-pink-400">export default function <span className="text-blue-300">Layout</span>() {'{'}</p>
                                <p className="text-slate-300 ml-4">return (</p>
                                <p className="text-yellow-300 ml-8">&lt;main className="<span className="text-green-300">flex min-h-screen flex-col</span>"&gt;</p>
                                <p className="text-yellow-300 ml-12">&lt;Header aria-label="<span className="text-green-300">Primary Navigation</span>" /&gt;</p>
                                <p className="text-slate-400 ml-12 italic">// AI: Added semantic landmark and ARIA label</p>
                                <p className="text-yellow-300 ml-12">&lt;HeroSection /&gt;</p>
                                <p className="text-yellow-300 ml-12">&lt;Features /&gt;</p>
                                <p className="text-yellow-300 ml-8">&lt;/main&gt;</p>
                                <p className="text-slate-300 ml-4">)</p>
                                <p className="text-slate-300">{'}'}</p>

                                {/* AI cursor */}
                                <div className="w-2 h-5 bg-cat-lavender animate-pulse inline-block ml-1 absolute bottom-10 left-4"></div>
                            </div>
                        </div>
                    </div>

                    {/* Visual 3: Deploy */}
                    <div ref={addToVisuals} className="absolute inset-0 flex items-center justify-center p-12 z-30">
                        <div className="w-full max-w-xl aspect-[4/3] bg-gradient-to-br from-[#0F172A] to-[#0A111A] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-green-500/20 p-10 flex flex-col items-center justify-center relative overflow-hidden text-center">
                            {/* Confetti or glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(34,197,94,0.1)_0%,_transparent_70%)]"></div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-green-500 blur-xl opacity-30 rounded-full animate-pulse"></div>
                                <div className="w-28 h-28 bg-[#1E293B] border border-green-500/30 rounded-full flex items-center justify-center mb-8 shadow-ambient relative z-10">
                                    <span className="material-symbols-outlined text-green-400 text-6xl">cloud_done</span>
                                </div>
                            </div>

                            <h3 className="text-3xl font-extrabold text-white mb-3 font-[var(--font-display)]">Deployed Successfully</h3>
                            <p className="text-slate-400 mb-10 text-lg">Your accessible React components are live.</p>

                            <div className="flex gap-4">
                                <button className="bg-cat-mint text-navy px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(110,231,183,0.3)]">
                                    View Live Site
                                </button>
                                <button className="bg-white/5 text-white border border-white/10 px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
                                    View Repository
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
