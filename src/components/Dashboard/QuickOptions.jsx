import React from "react";

export default function QuickOptions({ options, setOptions }) {
  return (
    <div className="mt-4 flex items-center gap-6 px-4 flex-wrap">
      <span className="text-xs font-medium text-text-3">Quick options:</span>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={options.wcagAudit}
          onChange={(e) => setOptions((o) => ({ ...o, wcagAudit: e.target.checked }))}
          className="rounded border-border-2 text-accent-1 focus:ring-accent-1 bg-transparent"
        />
        <span className="text-xs text-text-2">WCAG 2.1 Audit</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={options.mobileResponsiveness}
          onChange={(e) => setOptions((o) => ({ ...o, mobileResponsiveness: e.target.checked }))}
          className="rounded border-border-2 text-accent-1 focus:ring-accent-1 bg-transparent"
        />
        <span className="text-xs text-text-2">Mobile Responsiveness</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={options.aiHeatmaps}
          onChange={(e) => setOptions((o) => ({ ...o, aiHeatmaps: e.target.checked }))}
          className="rounded border-border-2 text-accent-1 focus:ring-accent-1 bg-transparent"
        />
        <span className="text-xs text-text-2">AI Heatmaps</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={options.aiRecommendations}
          onChange={(e) => setOptions((o) => ({ ...o, aiRecommendations: e.target.checked }))}
          className="rounded border-border-2 text-accent-1 focus:ring-accent-1 bg-transparent"
        />
        <span className="text-xs text-text-2">AI Recommendations</span>
      </label>
    </div>
  );
}

