import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import Badge from "@/components/Common/Badge";
import Button from "@/components/Common/Button";
import IssueListItem from "@/components/Dashboard/Analysis/IssueListItem";
import WcagBreakdown from "@/components/Dashboard/Analysis/WcagBreakdown";
import IssueDetail from "@/components/Dashboard/Analysis/IssueDetail";
import mockResults from "@/assets/api/mockAnalysisResults.json";

export default function AnalysisResultsPage() {
    const [searchParams] = useSearchParams();
    const url = searchParams.get("url") || mockResults.url;

    // State
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeSeverity, setActiveSeverity] = useState("all");

    // Derived state
    const filteredIssues = useMemo(() => {
        return mockResults.issues.filter(issue => {
            const matchesCategory = activeCategory === "all" || issue.category === activeCategory;
            const matchesSeverity = activeSeverity === "all" || issue.severity === activeSeverity;
            return matchesCategory && matchesSeverity;
        });
    }, [activeCategory, activeSeverity]);

    // Categories and Severities for filters
    const categories = ["all", ...new Set(mockResults.issues.map(i => i.category))];
    const severities = ["all", "critical", "high", "medium", "low"];

    const breadcrumbs = [
        { label: "Workspace", href: "/dashboard" },
        { label: "Analyze", href: "/dashboard/analyze" },
        { label: "Results", href: selectedIssue ? "/dashboard/analyze/results" : "#", onClick: () => setSelectedIssue(null) },
        ...(selectedIssue ? [{ label: `Issue #${selectedIssue.id}` }] : []),
    ];

    const handleIssueClick = (issue) => {
        setSelectedIssue(issue);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <DashboardShell active="analyze">
            <Breadcrumbs items={breadcrumbs} />

            {selectedIssue ? (
                <IssueDetail issue={selectedIssue} onBack={() => setSelectedIssue(null)} />
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-6 border-b border-border-1 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-black text-text-1 tracking-tight">Analysis Results</h1>
                                <Badge variant="neutral" size="sm" className="font-mono">{url}</Badge>
                            </div>
                            <p className="text-text-3">
                                Scanned on {new Date(mockResults.scannedAt).toLocaleDateString()} at {new Date(mockResults.scannedAt).toLocaleTimeString()}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-3xl font-black text-text-1">{mockResults.overallScore}</div>
                                <div className="text-xs text-text-3 font-bold uppercase tracking-wider">Health Score</div>
                            </div>
                            <div className="size-12 rounded-full border-4 border-accent-1 flex items-center justify-center bg-accent-1/10">
                                <span className="material-symbols-outlined text-accent-1">health_and_safety</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Issues List */}
                        <div className="lg:col-span-2 space-y-6">

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

                        {/* Sidebar - WCAG & Actions */}
                        <div className="space-y-6">
                            <WcagBreakdown score={mockResults.wcagScore} />

                            <div className="bg-surface-1 border border-border-1 rounded-xl p-6">
                                <h3 className="font-bold text-text-1 mb-4">Export Analysis</h3>
                                <p className="text-sm text-text-3 mb-6">
                                    Download a comprehensive PDF report including all identified issues and remediation steps.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Button variant="secondary" fullWidth icon={<span className="material-symbols-outlined">picture_as_pdf</span>}>
                                        Download PDF Report
                                    </Button>
                                    <Button variant="tertiary" fullWidth icon={<span className="material-symbols-outlined">html</span>}>
                                        Download HTML Report
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardShell>
    );
}
