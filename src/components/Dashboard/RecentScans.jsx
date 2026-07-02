import React from "react";
import IssuesBadge from "./IssueBadge";
import StatusPill from "./StatusPill";

function formatDate(scannedAt) {
  if (!scannedAt) return "Just now";
  const d = new Date(scannedAt);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecentScans({ scans }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-1 flex items-center gap-2">
          Recent Scans
          <span className="bg-surface-2 text-text-3 text-[10px] px-2 py-0.5 rounded-full border border-border-1">
            {scans.length} Total
          </span>
        </h2>
        <button className="text-xs font-semibold text-accent-1 hover:underline">View all scans</button>
      </div>

      <div className="overflow-hidden border border-border-1 rounded-xl bg-surface-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-bg-0/50 border-b border-border-1">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-text-3">Website URL</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-text-3">Scan Date</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-text-3 text-center">
                  Total Issues
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-text-3"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-1">
              {scans.map((row) => (
                <tr key={row.id} className="hover:bg-bg-0/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded border border-border-1 overflow-hidden bg-surface-2 flex items-center justify-center flex-shrink-0">
                        <div className="size-5 rounded-sm" style={{ backgroundColor: row.faviconColor }} />
                      </div>
                      <span className="text-sm font-semibold text-text-1 truncate max-w-[200px]">{row.url}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-text-3">
                    {formatDate(row.scannedAt)}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {row.status === "processing" ? (
                      <span className="text-xs text-text-3 italic">Calculating...</span>
                    ) : (
                      <IssuesBadge count={row.issuesCount} />
                    )}
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button className="p-2 rounded-lg hover:bg-surface-2 text-text-3 transition-colors">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

