import React from "react";
import Badge from "../Common/Badge";
export default function Hero({ onAnalyze }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = new FormData(e.currentTarget).get("url");
        onAnalyze?.(url);
    };

    return (
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left */}
                    <div className="space-y-7 sm:space-y-8">
                        {/* Badge */}
                        {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            v2.4 Engine Live
                        </div>
                         */}

                        <Badge variant="critical" className="inline-flex items-center gap-2">
                            v2.4 Engine Live
                        </Badge>


                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-[-0.04em]">
                            Optimize for Everyone.
                            <br />
                            <span className="text-primary">Automatically.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-400 max-w-lg leading-relaxed">
                            AI-driven accessibility and usability audits for modern web teams. Scan, analyze, and deploy WCAG-compliant fixes in seconds.
                        </p>

                        {/* URL + CTA */}
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                            <label className="sr-only" htmlFor="hero-url">
                                Website URL
                            </label>

                            <div className="flex-1 relative group min-w-0">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                                    link
                                </span>
                                <input
                                    id="hero-url"
                                    name="url"
                                    type="url"
                                    inputMode="url"
                                    autoComplete="url"
                                    placeholder="Enter your website URL"
                                    className="w-full bg-[#171a21] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary/25"
                            >
                                Analyze
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </form>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-primary to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />

                        <div className="relative w-full max-w-full bg-[#171a21] border border-white/10 rounded-2xl overflow-hidden shadow-2xl aspect-7/6 sm:aspect-4/3">
                            {/* Window bar */}
                            <div className="px-3 py-2.5 sm:p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>

                                <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                                    Deep Scan Analysis v2.4
                                </div>
                            </div>

                            <div className="relative h-full w-full bg-[#0F1115] p-3 sm:p-6">
                                {/* Scanned Layout */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="h-7 sm:h-8 w-1/3 bg-slate-800/50 rounded-lg relative">
                                        <div className="absolute -right-2 -top-2 px-2 py-0.5 bg-red-500 text-[9px] sm:text-[10px] font-bold rounded">
                                            Low Contrast
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                                        <div className="h-14 xs:h-16 sm:h-24 bg-slate-800/30 rounded-lg border border-primary/20 flex flex-col items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-primary/40 text-[18px] sm:text-[24px]">
                                                image_not_supported
                                            </span>
                                            <div className="h-2 w-1/2 bg-slate-700/50 rounded" />
                                        </div>
                                        <div className="h-14 xs:h-16 sm:h-24 bg-slate-800/30 rounded-lg" />
                                        <div className="h-14 xs:h-16 sm:h-24 bg-slate-800/30 rounded-lg" />
                                    </div>

                                    <div className="h-24 sm:h-32 bg-slate-800/20 rounded-lg border border-white/5 p-3 sm:p-4 flex flex-col gap-2">
                                        <div className="h-3.5 sm:h-4 w-full bg-slate-700/40 rounded" />
                                        <div className="h-3.5 sm:h-4 w-5/6 bg-slate-700/40 rounded" />
                                        <div className="h-3.5 sm:h-4 w-4/6 bg-slate-700/40 rounded" />
                                    </div>
                                </div>

                                {/* Overlays: MOBILE pinned + smaller */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Top-left overlay */}
                                    <div className="absolute top-3 left-3 sm:top-1/4 sm:left-10 p-2 sm:p-3 bg-[#1A1D23] border border-primary/40 rounded-lg shadow-xl shadow-primary/10 flex items-center gap-2 sm:gap-3 max-w-[88%]">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-primary/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-[14px] sm:text-sm">
                                                visibility
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                                Contrast Ratio
                                            </p>
                                            <p className="text-[12px] sm:text-sm text-white font-mono">
                                                7.1:1 <span className="text-green-400">PASSED</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom-right overlay */}
                                    <div className="absolute bottom-3 right-3 sm:bottom-1/4 sm:right-10 p-2 sm:p-3 bg-[#1A1D23] border border-red-500/40 rounded-lg shadow-xl shadow-red-500/10 flex items-center gap-2 sm:gap-3 max-w-[88%]">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-red-500/20 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-red-500 text-[14px] sm:text-sm">
                                                accessibility_new
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                                Aria Labels
                                            </p>
                                            <p className="text-[12px] sm:text-sm text-white font-mono">
                                                3 Missing <span className="text-red-400">FAIL</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Scan line */}
                                <div
                                    className="absolute inset-x-0 h-0.5 sm:h-0.5 bg-primary/50 shadow-[0_0_15px_#4d8bff] animate-pulse"
                                    style={{ top: "60%" }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}