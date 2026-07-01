import React from "react";
import Badge from "@/components/Common/Badge";
import Button from "@/components/Common/Button";

export default function IssueListItem({ issue, onClick }) {
    const severityColors = {
        critical: "critical",
        high: "high",
        medium: "medium",
        low: "low",
    };

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-xl transition-colors cursor-pointer group ${
                issue.accepted 
                    ? "bg-success/5 border-success/30 opacity-70" 
                    : "bg-surface-1 border-border-1 hover:border-accent-1/50"
            }`}
            onClick={onClick}
        >
            <div className="flex items-start gap-4">
                <div className={`mt-1 size-2 rounded-full ${issue.accepted ? "bg-success" : `bg-${severityColors[issue.severity] || "text-3"}`}`} />
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-bold transition-colors ${issue.accepted ? "text-success line-through opacity-80" : "text-text-1 group-hover:text-accent-1"}`}>
                            {issue.title}
                        </h4>
                        {issue.accepted ? (
                            <Badge variant="success" size="xs" className="uppercase font-bold">
                                <span className="material-symbols-outlined text-[12px] mr-1">check_circle</span>
                                FIXED
                            </Badge>
                        ) : (
                            <Badge variant={severityColors[issue.severity]} size="xs" className="uppercase">
                                {issue.severity}
                            </Badge>
                        )}
                    </div>
                    <p className="text-text-3 text-sm line-clamp-1">
                        {issue.description || issue.suggestion}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-text-3 font-medium uppercase tracking-wider">
                            {issue.type || issue.category}
                        </span>
                        <span className="text-xs text-text-3">
                            {issue.technical?.elementType || issue.element}
                        </span>
                    </div>
                </div>
            </div>

            {issue.accepted ? (
                <div className="flex items-center gap-1 text-success text-sm font-bold self-end sm:self-center shrink-0">
                    <span className="material-symbols-outlined text-lg">done_all</span>
                    Applied
                </div>
            ) : (
                <Button
                    variant="tertiary"
                    size="sm"
                    className="self-end sm:self-center shrink-0"
                    icon={<span className="material-symbols-outlined">arrow_forward</span>}
                >
                    View Fix
                </Button>
            )}
        </div>
    );
}
