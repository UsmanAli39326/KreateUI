import React from "react";

const severityConfig = {
    critical: {
        bgColor: "bg-red-500/5",
        borderColor: "border-red-500/10",
        textColor: "text-red-400",
        iconColor: "text-red-500"
    },
    high: {
        bgColor: "bg-orange-500/5",
        borderColor: "border-orange-500/10",
        textColor: "text-orange-400",
        iconColor: "text-orange-500"
    },
    medium: {
        bgColor: "bg-yellow-500/5",
        borderColor: "border-yellow-500/10",
        textColor: "text-yellow-400",
        iconColor: "text-yellow-500"
    },
    low: {
        bgColor: "bg-blue-500/5",
        borderColor: "border-blue-500/10",
        textColor: "text-blue-400",
        iconColor: "text-blue-500"
    }
};

function IssueIcon({ name, className }) {
    switch (name) {
        case "error":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            );
        case "contrast":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
                </svg>
            );
        case "keyboard":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
                </svg>
            );
        case "text":
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 7V4h16v3" />
                    <path d="M9 20h6" />
                    <path d="M12 4v16" />
                </svg>
            );
        default:
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            );
    }
}

export default function CriticalIssues({ issues }) {
    return (
        <div className="bg-surface-1 border border-border-1 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-1">Critical Issues</h3>
                <button className="text-[#8e52ff] text-xs font-bold hover:underline">
                    View All
                </button>
            </div>

            {/* Issues List */}
            <div className="space-y-4">
                {issues.map((issue) => {
                    const config = severityConfig[issue.severity] || severityConfig.low;

                    return (
                        <div
                            key={issue.id}
                            className={`flex items-start gap-3 p-3 rounded-lg ${config.bgColor} border ${config.borderColor}`}
                        >
                            {/* Icon */}
                            <div className={`${config.iconColor} mt-1`}>
                                <IssueIcon name={issue.icon} className="size-5" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <p className={`text-xs font-bold uppercase tracking-tight ${config.textColor}`}>
                                        WCAG Level {issue.level}
                                    </p>
                                    <span className="text-[10px] text-text-3">{issue.timeAgo}</span>
                                </div>
                                <p className="text-sm font-semibold text-text-1 mb-1">{issue.title}</p>
                                <p className="text-[11px] text-text-3 truncate">{issue.location}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
