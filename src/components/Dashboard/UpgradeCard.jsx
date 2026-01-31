import React from "react";

export default function UpgradeCard() {
  return (
    <div className="bg-accent-1/10 rounded-xl p-4 flex flex-col gap-3 border border-accent-1/20">
      <p className="text-xs font-semibold text-accent-1">Need more power?</p>
      <p className="text-[11px] text-text-3 leading-relaxed">
        Unlock unlimited scans and advanced UX insights.
      </p>
      <button className="bg-accent-1 hover:bg-accent-hover text-white text-xs font-bold py-2 px-4 rounded-lg transition-all shadow-lg shadow-accent-1/20">
        Upgrade to Enterprise
      </button>
    </div>
  );
}

