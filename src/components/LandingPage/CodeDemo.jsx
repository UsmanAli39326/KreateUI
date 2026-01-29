export default function CodeDemo() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171a21] rounded-3xl border border-white/10 overflow-hidden flex flex-col lg:flex-row">
          {/* Left */}
          <div className="flex-1 p-7 sm:p-10 lg:p-16 flex flex-col justify-center gap-6 sm:gap-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Fix accessibility bugs in your CI/CD pipeline.
            </h2>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Why wait for production? UI Enhance AI integrates with your GitHub Actions and Vercel deployments
              to catch 100% of critical accessibility issues before they go live.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]">terminal</span>
                </div>
                <span className="text-slate-300 font-medium">CLI-First Workflow</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[20px]">alt_route</span>
                </div>
                <span className="text-slate-300 font-medium">Automatic Branching &amp; Fixes</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 bg-[#090b0e] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="w-full h-full min-h-[320px] sm:min-h-[400px] bg-[#1a1d23] rounded-xl border border-white/5 font-mono text-[12px] sm:text-sm p-4 sm:p-6 overflow-hidden shadow-2xl">
              <div className="flex gap-2 mb-5 sm:mb-6 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="space-y-2 min-w-0">
                <p className="text-slate-500 break-words">$ npx uienhance scan ./src/components</p>
                <p className="text-white break-words">🚀 Initializing Neural Scan...</p>
                <p className="text-slate-400 break-words">
                  Found 2 issues in <span className="text-blue-400">Header.tsx</span>
                </p>

                <div className="mt-4 p-3 bg-red-500/10 border-l-2 border-red-500">
                  <p className="text-red-400 text-xs break-words">
                    Error: Missing aria-label on &lt;button&gt;
                  </p>
                  <p className="text-slate-500 text-[10px] mt-1 line-through break-words">
                    12 | &lt;button className="p-2"&gt;
                  </p>
                  <p className="text-green-400 text-xs break-words">
                    12 | &lt;button aria-label="Open Menu" className="p-2"&gt;
                  </p>
                </div>

                <p className="text-white mt-4 break-words">Applying AI Patch...</p>
                <p className="text-green-400 break-words">✓ Optimization complete. Score: 100/100</p>
                <p className="text-slate-500 mt-2 break-words">Opening PR on origin/main...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
