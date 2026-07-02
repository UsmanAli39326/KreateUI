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
                    <span className="text-text-3 text-xs font-mono hidden sm:inline">{code.file}</span>
                    <div className="flex items-center gap-2">
                        {code.onRejectFix && (
                            <Button variant="tertiary" size="sm" className="!p-1 h-auto text-xs text-text-3 hover:text-danger font-medium transition-colors" onClick={code.onRejectFix}>
                                Ignore
                            </Button>
                        )}
                        {code.onApplyFix && (
                            <Button variant="tertiary" size="sm" className="!px-3 !py-1.5 h-auto text-xs bg-accent-1/10 text-accent-1 hover:bg-accent-1 hover:text-white font-bold rounded-lg transition-all" onClick={code.onApplyFix}>
                                <span className="material-symbols-outlined text-[14px] mr-1">check</span>
                                Accept Fix
                            </Button>
                        )}
                    </div>
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
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    // Start with null — only show mock if no auditId is present at all
    const [issue, setIssue] = useState(auditId ? null : { ...mockIssue, url: url });
    const [auditSummary, setAuditSummary] = useState(null);
    const [isLoading, setIsLoading] = useState(!!auditId);

    const [issuesList, setIssuesList] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeSeverity, setActiveSeverity] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const categories = ["all", ...new Set(issuesList.map(i => i.type || i.category).filter(Boolean))];
    const severities = ["all", ...new Set(issuesList.map(i => i.severity).filter(Boolean))];

    const filteredIssues = issuesList.filter(i => {
        const catMatch = activeCategory === "all" || (i.type || i.category) === activeCategory;
        const sevMatch = activeSeverity === "all" || i.severity === activeSeverity;
        return catMatch && sevMatch;
    });

    const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
    const paginatedIssues = filteredIssues.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, activeSeverity]);

    const handleIssueClick = (clickedIssue) => {
        setIssue(clickedIssue);
    };

    const loadAuditData = async () => {
        if (!auditId) return;
        setIsLoading(true);
        try {
            const [recRes, auditRes] = await Promise.all([
                auditService.getRecommendations(auditId),
                auditService.getAudit(auditId)
            ]);
            const recs = recRes?.recommendations || recRes?.data?.recommendations || recRes?.data || [];
            if (recs && recs.length > 0) {
                setIssuesList(recs);
                // Only change selected issue if the current one is no longer in the list
                setIssue(prev => recs.find(r => r.ruleId === prev?.ruleId) || recs[0]);
            } else {
                setIssuesList([]);
            }
            if (auditRes?.summary) {
                setAuditSummary(auditRes.summary);
            }
        } catch (err) {
            console.error("Failed to fetch data", err);
            toast.error("Failed to load audit data from server.", "Error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAuditData();
    }, [auditId]);

    const breadcrumbs = [
        { label: "Workspace", href: "/dashboard" },
        { label: "Analyze", href: "/dashboard/analyze" },
        { label: "Results" }
    ];

    const getAIInsight = (issue) => {
        if (!issue) return "This fix improves the overall quality and polish of your website.";
        
        let insight = "This fix improves the overall quality and polish of your website.";
        if (issue.type === "accessibility" || issue.ruleId?.includes("wcag")) {
            if (issue.ruleId?.includes("contrast")) {
                insight = "We've adjusted the colors to increase contrast. This makes the text much easier to read for everyone, especially on mobile devices or in bright sunlight.";
            } else if (issue.ruleId?.includes("layout")) {
                insight = "We fixed a hidden structural bug that could cause this section of the page to completely collapse or break on certain devices.";
            } else {
                insight = "We've added hidden descriptions and structure to this element. This ensures that visually impaired visitors using screen readers can fully understand and navigate your site.";
            }
        } else if (issue.type === "design" || issue.ruleId?.includes("spacing")) {
            insight = "We subtly adjusted the spacing (padding/margins) to perfectly align with a professional design grid. This removes 'jank' and makes your website look much cleaner and premium.";
        } else if (issue.type === "performance") {
            insight = "We optimized how this element loads behind the scenes, making your website feel noticeably faster and snappier for visitors.";
        }
        return insight;
    };

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
        
        if (issue.accepted) {
             return (
                 <div className="relative">
                    <div className="absolute inset-0 bg-surface-1/50 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center rounded-xl border border-success/30">
                        <div className="bg-surface-1 border border-success text-success px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-success/20 animate-[fade-in-up_0.3s_ease-out]">
                            <span className="material-symbols-outlined text-2xl">check_circle</span>
                            <span className="font-bold text-lg">Fix Successfully Applied</span>
                        </div>
                    </div>
                    <CodeBlock code={{ ...codeData }} />
                 </div>
             );
        }

        return <CodeBlock code={{ ...codeData, onApplyFix: handleApplyFix, onRejectFix: handleRejectFix }} />;
    };

    const handleApplyFix = async () => {
        if (!auditId) {
            toast.warning("This is a mock issue, cannot apply auto-fix in preview mode.", "Mock Preview");
            return;
        }
        try {
            await auditService.acceptSuggestion(auditId, issue.ruleId);
            await loadAuditData();
            toast.success("AI suggestion applied successfully to the source code!", "Success");
        } catch (err) {
            console.error(err);
            toast.error("Failed to automatically apply the proposed fix.", "Error");
        }
    };

    const handleRejectFix = async () => {
        if (!auditId) {
            // Mock preview mode logic
            setIssuesList(prev => prev.filter(i => i.ruleId !== issue.ruleId));
            toast.info("Suggestion rejected.", "Info");
            return;
        }
        try {
            await auditService.rejectSuggestion(auditId, issue.ruleId);
            await loadAuditData();
            toast.info("Suggestion rejected.", "Info");
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject the suggestion.", "Error");
        }
    };

    const handleFixAll = async () => {
        const fixableIssues = issuesList.filter(i => i.severity !== "critical"); // AI can fix non-critical easily
        if (fixableIssues.length === 0) {
            toast.info("No safe issues left to auto-fix.");
            return;
        }

        toast.info(`Applying bulk fix to ${fixableIssues.length} issues...`, "Processing");
        
        if (!auditId) {
            // Mock preview mode logic
            setTimeout(() => {
                setIssuesList(prev => prev.filter(i => i.severity === "critical"));
                setAuditSummary(prev => ({ ...prev, currentScore: 100 }));
                toast.success(`Bulk fix completed! ${fixableIssues.length} issues resolved.`, "Fix All Triggered");
                navigate(`/dashboard/fix?url=${encodeURIComponent(url)}`);
            }, 1000);
            return;
        }

        try {
            // Send requests
            await Promise.all(fixableIssues.map(i => auditService.acceptSuggestion(auditId, i.ruleId)));
            
            // Reload data from backend to get fresh scores and lists
            await loadAuditData();
            toast.success(`Bulk fix completed! ${fixableIssues.length} safe recommendations applied.`, "Fix All Triggered");
            navigate(`/dashboard/fix?auditId=${auditId}&url=${encodeURIComponent(url)}`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to apply all fixes.", "Error");
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
            const htmlText = await auditService.getHtmlReport(auditId);
            const blob = new Blob([htmlText], { type: 'text/html' });
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

            {/* Loading skeleton — shown while API call is in flight */}
            {(isLoading || !issue) && (
                <div className="space-y-6 animate-pulse">
                    <div className="h-32 bg-surface-1 border border-border-1 rounded-2xl" />
                    <div className="h-10 bg-surface-1 border border-border-1 rounded-xl w-1/3" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="h-40 bg-surface-1 border border-border-1 rounded-xl" />
                            <div className="h-64 bg-surface-1 border border-border-1 rounded-xl" />
                        </div>
                        <div className="lg:col-span-4 space-y-4">
                            <div className="h-40 bg-surface-1 border border-border-1 rounded-xl" />
                            <div className="h-40 bg-surface-1 border border-border-1 rounded-xl" />
                        </div>
                    </div>
                </div>
            )}

            {/* Main content — only rendered when issue data is available */}
            {!isLoading && issue && (<>

            {/* Global Health Gauge & Actions Banner */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 mb-8 bg-surface-1 border border-border-1 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-1/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="flex items-center gap-6 z-10 w-full md:w-auto">
                    {/* Circular Score Gauge */}
                    <div className="relative size-20 md:size-24 flex items-center justify-center rounded-full border-[6px] md:border-8 border-bg-0 bg-surface-2 shadow-inner shrink-0">
                        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 36 36">
                            <path
                                className="text-border-1"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                            />
                            <path
                                className={`${(auditSummary?.currentScore ?? issue.overallScore ?? 85) >= 80 ? 'text-success' : (auditSummary?.currentScore ?? issue.overallScore ?? 85) >= 50 ? 'text-warning' : 'text-danger'}`}
                                strokeDasharray={`${auditSummary?.currentScore ?? issue.overallScore ?? 85}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-xl md:text-2xl font-black text-text-1">{auditSummary?.currentScore ?? issue.overallScore ?? 85}</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-text-1">Audit Complete</h2>
                        <p className="text-text-3 text-sm hidden sm:block">Found {issuesList.length} issues across {categories.length > 1 ? categories.length - 1 : 0} categories</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-4 z-10 w-full md:w-auto justify-end mt-4 md:mt-0">
                    <Button
                        variant="secondary"
                        icon={<span className="material-symbols-outlined text-lg">preview</span>}
                        className="font-bold !py-3 px-6 rounded-xl border border-accent-1 text-accent-1 hover:bg-accent-1 hover:text-white transition-all"
                        onClick={() => navigate(`/dashboard/fix?url=${encodeURIComponent(url)}${auditId ? `&auditId=${auditId}` : ''}`)}
                        disabled={issuesList.length === 0}
                    >
                        View Preview
                    </Button>
                     <Button
                        variant="primary"
                        icon={<span className="material-symbols-outlined text-lg">auto_fix_high</span>}
                        className="shadow-lg shadow-accent-1/30 bg-accent-1 hover:bg-accent-hover text-white font-bold !py-3 px-6 rounded-xl animate-[pulse_2s_ease-in-out_infinite]"
                        onClick={handleFixAll}
                        disabled={issuesList.length === 0}
                    >
                        Fix All Automatically
                    </Button>
                </div>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-start gap-4 py-2 mb-6">
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
                    {/* Non-Technical AI Insight */}
                    <div className="bg-gradient-to-br from-accent-1/10 to-transparent border border-accent-1/20 rounded-2xl p-6 relative overflow-hidden flex gap-5 items-start">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-1/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="bg-surface-1 border border-accent-1/30 p-3 rounded-full shrink-0 flex items-center justify-center shadow-lg shadow-accent-1/10">
                            <span className="material-symbols-outlined text-accent-1 text-2xl">auto_awesome</span>
                        </div>
                        <div className="z-10 pt-1">
                            <h3 className="text-text-1 font-bold text-lg mb-2">What this means for you</h3>
                            <p className="text-text-2 leading-relaxed">
                                {getAIInsight(issue)}
                            </p>
                        </div>
                    </div>

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
                            {paginatedIssues.length > 0 ? (
                                <>
                                    {paginatedIssues.map(issue => (
                                        <IssueListItem
                                            key={issue.id}
                                            issue={issue}
                                            onClick={() => handleIssueClick(issue)}
                                        />
                                    ))}
                                    
                                    {/* Pagination Controls */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-between pt-4 border-t border-border-1/50">
                                            <button 
                                                className="px-3 py-1.5 text-sm font-medium bg-surface-1 border border-border-1 rounded-md text-text-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-1"
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </button>
                                            <span className="text-sm font-medium text-text-3">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <button 
                                                className="px-3 py-1.5 text-sm font-medium bg-surface-1 border border-border-1 rounded-md text-text-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-1"
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
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
                    <div className="bg-surface-1 rounded-xl border border-border-1 p-6 hidden lg:block">
                        <h3 className="text-base font-bold text-text-1 mb-4">Technical Breakdown</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-border-1">
                                <span className="text-sm text-text-3">Measured Ratio</span>
                                <span className="text-sm font-bold text-danger">{issue?.technical?.measuredRatio || "N/A"}</span>
                            </div>
                            <p className="text-text-3">
                                Scanned on {new Date(issue?.scannedAt || Date.now()).toLocaleDateString()} at {new Date(issue?.scannedAt || Date.now()).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <div className="text-right">
                                <div className="text-3xl font-black text-text-1">{auditSummary?.currentScore ?? issue?.overallScore ?? 85}</div>
                                <div className="text-xs text-text-3 font-bold uppercase tracking-wider">Health Score</div>
                            </div>
                            <div className="size-12 rounded-full border-4 border-accent-1 flex items-center justify-center bg-accent-1/10 ml-auto">
                                <span className="material-symbols-outlined text-accent-1">health_and_safety</span>
                            </div>
                        </div>
                    </div>

                    <WcagBreakdown 
                        score={auditSummary?.wcagScore || {
                            level: "AA",
                            total: auditSummary?.compliancePercentage ?? issue?.wcagScore ?? 90,
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
                            <Button variant="tertiary" fullWidth icon={<span className="material-symbols-outlined">html</span>} onClick={handleDownloadHtml}>
                                Download HTML Report
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


            </>)}

        </DashboardShell>
    );
}
