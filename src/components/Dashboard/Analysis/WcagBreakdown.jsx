import React from "react";

export default function WcagBreakdown({ score, onDownloadReport }) {
    const getGradeColor = (grade) => {
        if (grade >= 90) return "text-success";
        if (grade >= 70) return "text-warning";
        return "text-danger";
    };

    return (
        <div className="bg-surface-1 border border-border-1 rounded-xl p-6">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-text-1 font-bold text-lg">WCAG Compliance</h3>
                    <p className="text-text-3 text-sm">Level {score.level} Standard</p>
                </div>
                <div className="text-right">
                    <div className={`text-3xl font-black ${getGradeColor(score.total)}`}>
                        {score.total}
                    </div>
                    <div className="text-xs text-text-3 uppercase font-bold tracking-wider">Overall Score</div>
                </div>
            </div>

            <div className="space-y-4">
                {Object.entries(score.breakdown).map(([key, value]) => (
                    <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-text-2 capitalize">{key}</span>
                            <span className={`font-bold ${getGradeColor(value)}`}>{value}%</span>
                        </div>
                        <div className="h-1.5 bg-bg-0 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${value >= 90 ? 'bg-success' : value >= 70 ? 'bg-warning' : 'bg-danger'}`}
                                style={{ width: `${value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border-1">
                <button 
                    className="flex items-center gap-2 text-xs text-accent-1 font-bold hover:underline w-full justify-center"
                    onClick={onDownloadReport}
                >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download Compliance Report
                </button>
            </div>
        </div>
    );
}
