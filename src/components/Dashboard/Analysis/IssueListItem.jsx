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
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-surface-1 border border-border-1 rounded-xl hover:border-accent-1/50 transition-colors cursor-pointer group"
            onClick={onClick}
        >
            <div className="flex items-start gap-4">
                <div className={`mt-1 size-2 rounded-full bg-${severityColors[issue.severity] || "text-3"}`} />
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-text-1 font-bold group-hover:text-accent-1 transition-colors">
                            {issue.title}
                        </h4>
                        <Badge variant={severityColors[issue.severity]} size="xs" className="uppercase">
                            {issue.severity}
                        </Badge>
                    </div>
                    <p className="text-text-3 text-sm line-clamp-1">
                        {issue.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-text-3 font-medium uppercase tracking-wider">
                            {issue.category}
                        </span>
                        <span className="text-xs text-text-3">
                            {issue.technical?.elementType}
                        </span>
                    </div>
                </div>
            </div>

            <Button
                variant="tertiary"
                size="sm"
                className="self-end sm:self-center shrink-0"
                icon={<span className="material-symbols-outlined">arrow_forward</span>}
            >
                View Fix
            </Button>
        </div>
    );
}
