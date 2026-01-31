import React from "react";

export default function AnalyzeBar({ url, setUrl, onAnalyze, isAnalyzing, canAnalyze }) {
  return (
    <div className="flex gap-4 p-2 bg-surface-1 border border-border-1 rounded-xl shadow-xl shadow-black/10">
      <div className="flex-1 flex items-center px-4 gap-3">
        <span className="text-text-3">🔗</span>
        <input
          className="bg-transparent border-none focus:ring-0 text-lg w-full text-text-1 placeholder-text-3 outline-none"
          placeholder="https://your-website.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <button
        onClick={onAnalyze}
        disabled={!canAnalyze}
        className={[
          "text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition-all",
          canAnalyze
            ? "bg-accent-1 hover:bg-accent-hover shadow-lg shadow-accent-1/20"
            : "bg-text-disabled cursor-not-allowed",
        ].join(" ")}
      >
        <span>{isAnalyzing ? "Analyzing..." : "Analyze"}</span>
        <span className="text-sm">→</span>
      </button>
    </div>
  );
}

