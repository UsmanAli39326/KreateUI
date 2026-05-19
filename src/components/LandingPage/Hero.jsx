import React from "react";
import Badge from "../Common/Badge";
export default function Hero({ onAnalyze }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = new FormData(e.currentTarget).get("url");
        onAnalyze?.(url);
    };

    return (
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 bg-background-main relative overflow-hidden">
            {/* Subtle decorative gradient */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,_#E8743B10_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,_#EDF6FF80_0%,_transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left */}
                    <div className="space-y-7 sm:space-y-8">
                        {/* Badge */}
                        <Badge variant="critical" className="inline-flex items-center gap-2">
                            v2.4 Engine Live
                        </Badge>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-navy leading-[1.1] tracking-[-0.02em] font-[var(--font-display)]">
                            Optimize for Everyone.
                            <br />
                            <span className="text-primary">Automatically.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-text-2 max-w-lg leading-relaxed">
                            AI-driven accessibility and usability audits for modern web teams. Scan, analyze, and deploy WCAG-compliant fixes in seconds.
                        </p>

                        {/* URL + CTA */}
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                            <label className="sr-only" htmlFor="hero-url">
                                Website URL
                            </label>

                            <div className="flex-1 relative group min-w-0">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-3 group-focus-within:text-primary transition-colors">
                                    link
                                </span>
                                <input
                                    id="hero-url"
                                    name="url"
                                    type="url"
                                    inputMode="url"
                                    autoComplete="url"
                                    placeholder="Enter your website URL"
                                    className="w-full bg-white border border-border-1 rounded-xl py-4 pl-12 pr-4 text-text-1 placeholder:text-text-3 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-ambient"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-accent-hover transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                            >
                                Analyze
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </form>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-cat-sky rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-1000" />

                        <div className="relative w-full max-w-full bg-white border border-border-1 rounded-2xl overflow-hidden shadow-ambient-lg aspect-7/6 sm:aspect-4/3">
                            {/* Window bar */}
                            <div className="px-3 py-2.5 sm:p-4 border-b border-border-1 flex items-center justify-between bg-bg-1">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
                                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                                </div>

                                <div className="text-[9px] sm:text-[10px] text-text-3 font-mono tracking-widest uppercase">
                                    Deep Scan Analysis v2.4
                                </div>
                            </div>

                            <div className="relative h-full w-full bg-bg-0 p-3 sm:p-6">
                                {/* Scanned Layout */}
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="h-7 sm:h-8 w-1/3 bg-border-1/50 rounded-lg relative">
                                        <div className="absolute -right-2 -top-2 px-2 py-0.5 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold rounded">
                                            Low Contrast
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                                        <div className="h-14 xs:h-16 sm:h-24 bg-bg-2 rounded-lg border border-primary/20 flex flex-col items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-primary/50 text-[18px] sm:text-[24px]">
                                                image_not_supported
                                            </span>
                                            <div className="h-2 w-1/2 bg-border-1 rounded" />
                                        </div>
                                        <div className="h-14 xs:h-16 sm:h-24 bg-bg-2 rounded-lg" />
                                        <div className="h-14 xs:h-16 sm:h-24 bg-bg-2 rounded-lg" />
                                    </div>

                                    <div className="h-24 sm:h-32 bg-bg-1 rounded-lg border border-border-1 p-3 sm:p-4 flex flex-col gap-2">
                                        <div className="h-3.5 sm:h-4 w-full bg-border-1/60 rounded" />
                                        <div className="h-3.5 sm:h-4 w-5/6 bg-border-1/60 rounded" />
                                        <div className="h-3.5 sm:h-4 w-4/6 bg-border-1/60 rounded" />
                                    </div>
                                </div>

                                {/* Overlays */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Top-left overlay */}
                                    <div className="absolute top-3 left-3 sm:top-1/4 sm:left-10 p-2 sm:p-3 bg-white border border-primary/30 rounded-lg shadow-ambient flex items-center gap-2 sm:gap-3 max-w-[88%]">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-accent-soft flex items-center justify-center">
                                            <span className="material-symbols-outlined text-primary text-[14px] sm:text-sm">
                                                visibility
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] sm:text-[10px] text-text-3 uppercase font-bold tracking-wider">
                                                Contrast Ratio
                                            </p>
                                            <p className="text-[12px] sm:text-sm text-text-1 font-mono">
                                                7.1:1 <span className="text-green-500">PASSED</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom-right overlay */}
                                    <div className="absolute bottom-3 right-3 sm:bottom-1/4 sm:right-10 p-2 sm:p-3 bg-white border border-red-300 rounded-lg shadow-ambient flex items-center gap-2 sm:gap-3 max-w-[88%]">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-red-50 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-red-500 text-[14px] sm:text-sm">
                                                accessibility_new
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] sm:text-[10px] text-text-3 uppercase font-bold tracking-wider">
                                                Aria Labels
                                            </p>
                                            <p className="text-[12px] sm:text-sm text-text-1 font-mono">
                                                3 Missing <span className="text-red-500">FAIL</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Scan line */}
                                <div
                                    className="absolute inset-x-0 h-0.5 sm:h-0.5 bg-primary/50 shadow-[0_0_15px_#E8743B40] animate-pulse"
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