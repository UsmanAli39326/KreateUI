import React, { useState } from "react";
import Badge from "@/components/Common/Badge";
import Button from "@/components/Common/Button";

function VisualComparison({ visual }) {
    if (!visual) return null;
    return (
        <div className="bg-surface-1 rounded-xl border border-border-1 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-border-1 bg-bg-0/30">
                <h3 className="text-sm font-bold text-text-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent-1 text-lg">compare</span> Visual Comparison
                </h3>
                <div className="flex bg-bg-0 p-1 rounded-lg">
                    <label className="flex cursor-pointer items-center px-3 py-1 rounded-md bg-surface-1 text-text-1 text-xs font-medium shadow-sm">
                        <span>Before</span>
                    </label>
                    <label className="flex cursor-pointer items-center px-3 py-1 rounded-md text-text-3 hover:text-text-1 text-xs font-medium">
                        <span>After Fix</span>
                    </label>
                </div>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-[radial-gradient(#302348_1px,transparent_1px)] [background-size:20px_20px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full h-48 bg-[#1a1a20] rounded-lg border-2 border-dashed border-danger/30 flex items-center justify-center relative">
                        {/* Placeholder for actual element rendering - using styling from visual data */}
                        <button
                            className="px-6 py-2 rounded-md font-medium text-sm"
                            style={{ backgroundColor: visual.before.bgColor, color: visual.before.textColor }}
                        >
                            Subscribe Now
                        </button>
                        <div className="absolute top-2 left-2 bg-danger text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                            {visual.before.ratio} RATIO
                        </div>
                    </div>
                    <p className="text-xs text-text-3 font-medium uppercase tracking-widest">Current Implementation</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full h-48 bg-[#1a1a20] rounded-lg border-2 border-dashed border-success/30 flex items-center justify-center relative">
                        <button
                            className="px-6 py-2 rounded-md font-medium text-sm"
                            style={{ backgroundColor: visual.after.bgColor, color: visual.after.textColor }}
                        >
                            Subscribe Now
                        </button>
                        <div className="absolute top-2 left-2 bg-success text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                            {visual.after.ratio} RATIO
                        </div>
                    </div>
                    <p className="text-xs text-text-3 font-medium uppercase tracking-widest">AI Proposed Fix</p>
                </div>
            </div>
        </div>
    );
}

function CodeBlock({ code }) {
    if (!code) return null;
    return (
        <div className="bg-surface-1 rounded-xl border border-border-1 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-border-1">
                <h3 className="text-sm font-bold text-text-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent-1 text-lg">code</span> Affected Element
                </h3>
                <div className="flex items-center gap-4">
                    <span className="text-text-3 text-xs font-mono">{code.file}</span>
                    <Button variant="tertiary" size="sm" className="!p-0 h-auto text-xs text-accent-1 hover:text-accent-hover font-bold">
                        Apply Auto-Fix
                    </Button>
                </div>
            </div>
            <div className="p-4 text-sm leading-relaxed overflow-x-auto bg-[#0d0d10] font-mono">
                <div className="flex gap-4">
                    <div className="text-slate-600 text-right select-none w-4 flex flex-col">
                        {code.preview.map((line, i) => (
                            <span key={i}>{line.line}</span>
                        ))}
                    </div>
                    <div className="text-slate-300 flex flex-col w-full">
                        {code.preview.map((line, i) => (
                            <div key={i} className={line.highlight ? "bg-danger/10 -mx-2 px-2 border-l-2 border-danger" : ""}>
                                <pre className="font-mono whitespace-pre-wrap">{line.content}</pre>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function IssueDetail({ issue, onBack }) {
    const [showToast, setShowToast] = useState(false);

    const handleCopyFix = () => {
        if (!issue.code) return;
        navigator.clipboard.writeText(issue.code.preview.map(l => l.content).join('\n'));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-start gap-4 py-6">
                <div className="flex flex-col gap-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="tertiary"
                            size="sm"
                            className="!p-0 h-auto text-text-3 hover:text-text-1 mr-2"
                            onClick={onBack}
                        >
                            <span className="material-symbols-outlined">arrow_back</span> Back
                        </Button>
                        <Badge variant={issue.severity} size="sm" className="uppercase tracking-wider">
                            {issue.severity}
                        </Badge>
                        <span className="text-text-3 text-xs font-medium uppercase tracking-wider">
                            Detected: {issue.detectedAt}
                        </span>
                    </div>
                    <h1 className="text-text-1 text-3xl font-black leading-tight tracking-tight mt-2">
                        {issue.title}
                    </h1>
                    <p className="text-text-3 text-base font-normal">
                        {issue.description}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        icon={<span className="material-symbols-outlined text-lg">share</span>}
                    >
                        Export to Jira
                    </Button>
                    <Button
                        variant="primary"
                        icon={<span className="material-symbols-outlined text-lg">content_copy</span>}
                        onClick={handleCopyFix}
                        className="shadow-lg shadow-accent-1/20"
                    >
                        Copy Fix
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
                {/* Left Column: Visual & Code */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <VisualComparison visual={issue.visual} />
                    <CodeBlock code={issue.code} />
                </div>

                {/* Right Column: Details & Docs */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Issue Analysis Panel */}
                    <div className="bg-surface-1 rounded-xl border border-border-1 p-6">
                        <h3 className="text-base font-bold text-text-1 mb-4">Technical Breakdown</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-border-1">
                                <span className="text-sm text-text-3">Measured Ratio</span>
                                <span className="text-sm font-bold text-danger">{issue.technical.measuredRatio}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-1">
                                <span className="text-sm text-text-3">Required Target</span>
                                <span className="text-sm font-bold text-success">{issue.technical.requiredRatio}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border-1">
                                <span className="text-sm text-text-3">Element Type</span>
                                <span className="text-sm font-mono text-text-1">{issue.technical.elementType}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-text-3">Detected via</span>
                                <span className="text-sm font-medium text-text-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">smart_toy</span> {issue.technical.detectedVia}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-bg-0 rounded-lg border border-border-1">
                            <h4 className="text-xs font-bold text-accent-1 uppercase tracking-widest mb-2">AI Recommendation</h4>
                            <p className="text-sm text-text-2 leading-relaxed">
                                {issue.recommendation}
                            </p>
                        </div>
                    </div>

                    {/* WCAG Documentation Card */}
                    <div className="bg-surface-1 rounded-xl border border-border-1 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="size-10 rounded-lg bg-info/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-info">menu_book</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-text-1 leading-none">{issue.wcag.spec}</h3>
                                <p className="text-xs text-text-3 mt-1">{issue.wcag.criterion}</p>
                            </div>
                        </div>
                        <p className="text-xs text-text-3 leading-normal mb-4">
                            {issue.wcag.description}
                        </p>
                        <a className="inline-flex items-center gap-1 text-accent-1 text-xs font-bold hover:underline" href={issue.wcag.link} target="_blank" rel="noopener noreferrer">
                            Read full documentation <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                    </div>

                    {/* Audit Metadata */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-text-3 text-xs">
                            <span className="material-symbols-outlined text-sm">link</span>
                            <span className="truncate max-w-[200px]">{issue.url}</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-3 text-xs">
                            <span className="material-symbols-outlined text-sm">devices</span>
                            <span>{issue.browser || "Desktop Chrome"}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Floating Toast */}
            <div
                className={`fixed bottom-6 right-6 flex items-center gap-3 bg-surface-1 border border-border-1 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 transform ${showToast ? "translate-y-0 opacity-100 visible" : "translate-y-10 opacity-0 invisible"
                    }`}
            >
                <span className="material-symbols-outlined text-success">check_circle</span>
                <span className="text-sm font-medium text-white">Fix copied to clipboard!</span>
            </div>
        </div>
    );
}
