import React from "react";

export default function AnalyzeBar({ url, setUrl, onAnalyze, isAnalyzing, canAnalyze }) {
  return (
    <div className={`flex flex-col md:flex-row gap-4 p-3 rounded-2xl shadow-2xl transition-all duration-500
      ${isAnalyzing ? 'bg-surface-1/80 border-accent-1/50 scale-[1.02]' : 'bg-surface-1/50 border-border-1'} 
      backdrop-blur-xl border`}>
      <div className="flex-1 flex items-center px-5 gap-4">
        <span className={`material-symbols-outlined transition-colors duration-300 ${isAnalyzing ? 'text-accent-1 animate-pulse' : 'text-text-3'}`}>
          language
        </span>
        <input
          className={`bg-transparent border-none focus:ring-0 text-xl md:text-2xl w-full text-text-1 placeholder-text-3/50 outline-none font-medium transition-opacity ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
          placeholder="https://your-website.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isAnalyzing}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canAnalyze) {
              onAnalyze();
            }
          }}
        />
      </div>

      <button
        onClick={onAnalyze}
        disabled={!canAnalyze}
        className={[
          "group relative overflow-hidden text-white font-bold py-4 px-10 rounded-xl flex justify-center items-center gap-3 transition-all duration-300 min-w-[200px]",
          canAnalyze && !isAnalyzing
            ? "bg-accent-1 hover:bg-accent-hover hover:-translate-y-1 shadow-lg shadow-accent-1/20"
            : "bg-surface-2 text-text-3 cursor-not-allowed",
          isAnalyzing ? "bg-accent-1 opacity-90 shadow-xl shadow-accent-1/30" : ""
        ].join(" ")}
      >
        {isAnalyzing ? (
          <>
            <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
            <span className="material-symbols-outlined animate-spin z-10 text-xl">autorenew</span>
            <span className="z-10 tracking-widest uppercase text-sm">Connecting...</span>
          </>
        ) : (
          <>
            <span className="z-10 tracking-widest uppercase text-sm">Analyze</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 z-10 text-xl">
              arrow_forward
            </span>
          </>
        )}
      </button>
    </div>
  );
}

