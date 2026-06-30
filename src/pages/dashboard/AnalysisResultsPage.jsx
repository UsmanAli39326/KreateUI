import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import Badge from "@/components/Common/Badge";
import Button from "@/components/Common/Button";
import { useToast } from "@/components/Common";
import mockIssue from "@/assets/api/issueDetails.json";
import auditService from "../../services/auditService";
import IssueListItem from "@/components/Dashboard/Analysis/IssueListItem";
import WcagBreakdown from "@/components/Dashboard/Analysis/WcagBreakdown";
function VisualComparison({ visual }) {
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
    return (
        <div className="bg-surface-1 rounded-xl border border-border-1 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-border-1">
                <h3 className="text-sm font-bold text-text-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent-1 text-lg">code</span> Affected Element
                </h3>
                <div className="flex items-center gap-4">
                    <span className="text-text-3 text-xs font-mono">{code.file}</span>
                    {code.onApplyFix && (
                        <Button variant="tertiary" size="sm" className="!p-0 h-auto text-xs text-accent-1 hover:text-accent-hover font-bold" onClick={code.onApplyFix}>
                            Apply Auto-Fix
                        </Button>
                    )}
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

export default function AnalysisResultsPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const url = searchParams.get("url") || mockIssue.url;
    const auditId = searchParams.get("auditId");
    const toast = useToast();
    const [showToast, setShowToast] = useState(false);

    const [issue, setIssue] = useState({ ...mockIssue, url: url });
    const [auditSummary, setAuditSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(!!auditId);

    const [issuesList, setIssuesList] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeSeverity, setActiveSeverity] = useState("all");

    const categories = ["all", ...new Set(issuesList.map(i => i.type || i.category).filter(Boolean))];
    const severities = ["all", ...new Set(issuesList.map(i => i.severity).filter(Boolean))];

    const filteredIssues = issuesList.filter(i => {
        const catMatch = activeCategory === "all" || (i.type || i.category) === activeCategory;
        const sevMatch = activeSeverity === "all" || i.severity === activeSeverity;
        return catMatch && sevMatch;
    });

    const handleIssueClick = (clickedIssue) => {
        setIssue(clickedIssue);
    };

    useEffect(() => {
        if (auditId) {
            Promise.all([
                auditService.getRecommendations(auditId),
                auditService.getAudit(auditId)
            ])
            .then(([recRes, auditRes]) => {
                const recs = recRes?.recommendations || recRes?.data?.recommendations || recRes?.data || [];
                if (recs && recs.length > 0) {
                    setIssuesList(recs);
                    setIssue(recs[0]); // Select first issue by default
                } else {
                    setIssuesList([]);
                }
                
                if (auditRes?.summary) {
                    setAuditSummary(auditRes.summary);
                }
            })
            .catch(err => {
                console.error("Failed to fetch data", err);
                toast.error("Failed to load audit data from server.", "Error");
            })
            .finally(() => setIsLoading(false));
        }
    }, [auditId]);

    const breadcrumbs = [
        { label: "Workspace", href: "/dashboard" },
        { label: "Analyze", href: "/dashboard/analyze" },
        { label: "Results" }
    ];

    const handleCopyFix = () => {
        const textToCopy = issue.code ? issue.code.preview.map(l => l.content).join('\n') : (issue.suggestion || issue.element || "");
        navigator.clipboard.writeText(textToCopy);
        toast.success("Fix snippet copied to clipboard!", "Copied");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const renderCodeBlock = () => {
        let fallbackSnippet = issue.suggestion || "No code snippet available.";
        if (issue.element && issue.element !== "page") {
            let tag = `<${issue.element.toLowerCase()}`;
            if (issue.id) tag += ` id="${issue.id}"`;
            if (issue.className) tag += ` class="${issue.className}"`;
            tag += `>`;
            if (issue.text) tag += `\n  ${issue.text}\n</${issue.element.toLowerCase()}>`;
            fallbackSnippet = tag;
        }

        const codeData = issue.code || {
            file: "Source HTML",
            preview: fallbackSnippet.split('\n').map((line, idx) => ({ line: idx + 1, content: line }))
        };
        return <CodeBlock code={{ ...codeData, onApplyFix: handleApplyFix }} />;
    };

    const handleApplyFix = async () => {
        if (!auditId) {
            toast.warning("This is a mock issue, cannot apply auto-fix in preview mode.", "Mock Preview");
            return;
        }
        try {
            await auditService.acceptSuggestion(auditId, issue.ruleId);
            toast.success("AI suggestion applied successfully to the source code!", "Success");
        } catch (err) {
            console.error(err);
            toast.error("Failed to automatically apply the proposed fix.", "Error");
        }
    };

    const handleRejectFix = async () => {
        if (!auditId) return;
        try {
            await auditService.rejectSuggestion(auditId, issue.ruleId);
            toast.info("Suggestion rejected.", "Info");
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject the suggestion.", "Error");
        }
    };

    const handleDownloadPdf = async () => {
        if (!auditId) return;
        try {
            toast.info("Generating PDF report...", "Processing");
            const blob = await auditService.getPdfReport(auditId);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `audit-report-${auditId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success("PDF report downloaded successfully.", "Success");
        } catch (err) {
            console.error(err);
            toast.error("Failed to download PDF report.", "Error");
        }
    };

    const handleDownloadHtml = async () => {
        if (!auditId) return;
        try {
            toast.info("Generating HTML report...", "Processing");
            const blob = await auditService.getHtmlReport(auditId);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `audit-report-${auditId}.html`;
            a.click();
            URL.revokeObjectURL(url);
            toast.success("HTML report downloaded successfully.", "Success");
        } catch (err) {
            console.error(err);
            toast.error("Failed to download HTML report.", "Error");
        }
    };

    const handleExportJira = () => {
        toast.info("Jira integration is coming soon!", "Feature Preview");
    };

    return (
        <DashboardShell active="analyze">
            <div className="flex justify-between items-center w-full pb-4">
                <Breadcrumbs items={breadcrumbs} />
                {auditId && (
                    <Button
                        variant="secondary"
                        onClick={() => navigate(`/dashboard/issues?auditId=${auditId}&url=${encodeURIComponent(url)}`)}
                    >
                        View All Issues
                    </Button>
                )}
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-start gap-4 py-6">
                <div className="flex flex-col gap-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                        <Badge variant="critical" size="sm" className="uppercase tracking-wider">
                            {issue.severity}
                        </Badge>
                        <span className="text-text-3 text-xs font-medium uppercase tracking-wider">
                            Detected: {issue.detectedAt || new Date(issue.scannedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date(issue.scannedAt || Date.now()).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-text-1 text-3xl font-black leading-tight tracking-tight">
                        {issue.title}
                    </h1>
                    <p className="text-text-3 text-base font-normal">
                        {issue.description || issue.suggestion || "No detailed description available."}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        icon={<span className="material-symbols-outlined text-lg">ios_share</span>}
                        onClick={handleExportJira}
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
                {/* Left Column: Visual & Code & Issues */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    {issue.visual && <VisualComparison visual={issue.visual} />}
                    {renderCodeBlock()}

                    {/* Main Content - Issues List */}
                    <div className="space-y-6 pt-6 mt-2 border-t border-border-1/50">
                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-3 pb-4">
                            <span className="text-sm font-bold text-text-2 mr-2">Filter by:</span>

                            <select
                                className="bg-surface-1 border border-border-1 rounded-md px-3 py-1.5 text-sm text-text-1 outline-none focus:ring-2 focus:ring-accent-1/50"
                                value={activeCategory}
                                onChange={(e) => setActiveCategory(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="capitalize">{cat === 'all' ? 'All Categories' : cat}</option>
                                ))}
                            </select>

                            <select
                                className="bg-surface-1 border border-border-1 rounded-md px-3 py-1.5 text-sm text-text-1 outline-none focus:ring-2 focus:ring-accent-1/50"
                                value={activeSeverity}
                                onChange={(e) => setActiveSeverity(e.target.value)}
                            >
                                {severities.map(sev => (
                                    <option key={sev} value={sev} className="capitalize">{sev === 'all' ? 'All Severities' : sev}</option>
                                ))}
                            </select>

                            {(activeCategory !== "all" || activeSeverity !== "all") && (
                                <button
                                    onClick={() => { setActiveCategory("all"); setActiveSeverity("all"); }}
                                    className="text-xs text-accent-1 font-medium hover:underline ml-auto"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>

                        {/* List */}
                        <div className="space-y-4">
                            {filteredIssues.length > 0 ? (
                                filteredIssues.map(issue => (
                                    <IssueListItem
                                        key={issue.id}
                                        issue={issue}
                                        onClick={() => handleIssueClick(issue)}
                                    />
                                ))
                            ) : (
                                <div className="p-12 text-center bg-surface-1 border border-border-1 rounded-xl border-dashed">
                                    <div className="size-16 bg-bg-0 text-text-3 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-symbols-outlined text-2xl">check_circle</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-text-1">No issues found</h3>
                                    <p className="text-text-3">Try adjusting your filters or run a new scan.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Details & Docs */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Issue Analysis Panel */}
                    <div className="bg-surface-1 rounded-xl border border-border-1 p-6">
                        <h3 className="text-base font-bold text-text-1 mb-4">Technical Breakdown</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-border-1">
                                <span className="text-sm text-text-3">Measured Ratio</span>
                                <span className="text-sm font-bold text-danger">{issue.technical?.measuredRatio || "N/A"}</span>
                            </div>
                            <p className="text-text-3">
                                Scanned on {new Date(issue.scannedAt || Date.now()).toLocaleDateString()} at {new Date(issue.scannedAt || Date.now()).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <div className="text-right">
                                <div className="text-3xl font-black text-text-1">{auditSummary?.currentScore ?? issue.overallScore ?? 85}</div>
                                <div className="text-xs text-text-3 font-bold uppercase tracking-wider">Health Score</div>
                            </div>
                            <div className="size-12 rounded-full border-4 border-accent-1 flex items-center justify-center bg-accent-1/10 ml-auto">
                                <span className="material-symbols-outlined text-accent-1">health_and_safety</span>
                            </div>
                        </div>
                    </div>

                    <WcagBreakdown 
                        score={{
                            level: "AA",
                            total: auditSummary?.compliancePercentage ?? issue.wcagScore ?? 90,
                            breakdown: { 
                                perceivable: auditSummary?.compliancePercentage ?? 90, 
                                operable: auditSummary?.compliancePercentage ? Math.max(0, auditSummary.compliancePercentage - 5) : 85, 
                                understandable: auditSummary?.compliancePercentage ? Math.min(100, auditSummary.compliancePercentage + 5) : 95, 
                                robust: 100 
                            }
                        }} 
                        onDownloadReport={handleDownloadPdf}
                    />

                    <div className="bg-surface-1 border border-border-1 rounded-xl p-6">
                        <h3 className="font-bold text-text-1 mb-4">Export Analysis</h3>
                        <p className="text-sm text-text-3 mb-6">
                            Download a comprehensive PDF report including all identified issues and remediation steps.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Button variant="secondary" fullWidth icon={<span className="material-symbols-outlined">picture_as_pdf</span>} onClick={handleDownloadPdf}>
                                Download PDF Report
                            </Button>
                            <Button variant="tertiary" fullWidth icon={<span className="material-symbols-outlined">html</span>} onClick={handleDownloadHtml}>
                                Download HTML Report
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
