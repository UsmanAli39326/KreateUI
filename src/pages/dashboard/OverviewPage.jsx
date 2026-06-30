import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import StatsCard from "@/components/Dashboard/StatsCard";
import ScanVelocityChart from "@/components/Dashboard/ScanVelocityChart";
import CriticalIssues from "@/components/Dashboard/CriticalIssues";
import ProjectsTable from "@/components/Dashboard/ProjectsTable";
import Button from "@/components/Common/Button";
import Skeleton from "@/components/Common/Skeleton";
import { useToast } from "@/components/Common";
import userService from "../../services/userService";

// Mock data imports
// TODO: replace with real API
// criticalIssues is now derived from API

function SearchIcon() {
    return (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    );
}

export default function OverviewPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [stats, setStats] = useState(null);
    const [scanHistory, setScanHistory] = useState(null);
    const [projects, setProjects] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            userService.getStats(),
            userService.getScanHistory(30),
            userService.getAudits(1, 5)
        ])
            .then(([statsRes, historyRes, auditsRes]) => {
                setStats(statsRes?.data || statsRes);
                const rawHistory = historyRes?.data || historyRes || [];
                
                // Format history data for the chart since the backend returns an array of scans
                const formattedHistory = {
                    totalScans: rawHistory.length,
                    monthlyTrend: 15, // Stub trend
                    chartPath: "M0,130 C100,110 200,140 300,80 C400,40 478,70 478,70", // Stub chart path
                    weeklyData: [
                        { week: "W1" }, { week: "W2" }, { week: "W3" }, { week: "W4" }
                    ]
                };
                
                setScanHistory(formattedHistory);

                const audits = auditsRes?.data?.audits || auditsRes?.audits || [];
                const mapped = audits.map(a => ({
                    id: a.id || a._id || Math.random().toString(),
                    name: a.name || a.targetUrl || "Unknown Project",
                    icon: a.icon || "globe",
                    score: a.score || a.performanceScore || 0,
                    issuesCount: a.summary?.issueCount || a.issuesCount || 0,
                    lastScanned: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : (a.lastScanned || "Unknown"),
                    status: a.status || "healthy",
                    issues: a.issues || []
                }));
                setProjects(mapped);
            })
            .catch((err) => {
                console.error("Dashboard data load error:", err);
                toast.error("Failed to load dashboard data", "Error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const breadcrumbs = useMemo(
        () => [{ label: "Workspace", href: "/dashboard" }, { label: "Overview" }],
        []
    );

    const projectCount = projects.length;

    return (
        <DashboardShell active="dashboard">
            <Breadcrumbs items={breadcrumbs} />

            {/* Header */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-text-1">
                        Workspace Overview
                    </h1>
                    <p className="text-text-3 text-sm mt-1">
                        Real-time accessibility performance across {projectCount} projects.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <label className="relative flex items-center">
                        <span className="absolute left-3 text-text-3">
                            <SearchIcon />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-surface-1 border border-border-1 rounded-lg pl-10 pr-4 py-2 text-sm w-48 lg:w-64 focus:ring-1 focus:ring-[#8e52ff] focus:border-[#8e52ff] text-text-1 placeholder-text-3 outline-none transition-colors"
                            placeholder="Search resources..."
                        />
                    </label>

                    {/* New Scan Button */}
                    <Button
                        variant="main"
                        size="md"
                        icon={<PlusIcon />}
                        className="shadow-lg shadow-[#8e52ff]/20"
                        onClick={() => navigate('/dashboard/analyze')}
                    >
                        New Scan
                    </Button>

                    {/* Notifications */}
                    <button className="bg-surface-1 border border-border-1 p-2 rounded-lg hover:bg-surface-2 transition-colors text-text-2 hover:text-text-1">
                        <BellIcon />
                    </button>
                </div>
            </header>

            {/* Stats Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-24 rounded-xl" />
                    ))}
                </div>
            ) : stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Accessibility Score */}
                    <StatsCard
                        title="Avg. Accessibility Score"
                        value={`${stats.accessibilityScore?.value ?? stats.accessibilityScore ?? 0}%`}
                        trend={stats.accessibilityScore?.trend}
                        trendDirection={stats.accessibilityScore?.trendDirection}
                        subtitle={`Last calculated ${stats.accessibilityScore?.lastUpdated || 'recently'}`}
                        icon="analytics"
                        iconColor="text-[#8e52ff]"
                        showGlow
                    />

                    {/* Total Issues */}
                    <StatsCard
                        title="Total Issues Across Sites"
                        value={(stats.totalIssues?.value ?? stats.totalIssues ?? 0).toLocaleString()}
                        trend={stats.totalIssues?.trend}
                        trendDirection={stats.totalIssues?.trendDirection}
                        icon="warning"
                        iconColor="text-orange-500"
                    >
                        {/* Issues breakdown bars */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="mt-4 flex gap-1">
                                <div className="h-1 flex-1 bg-red-500 rounded-full" />
                                <div className="h-1 flex-1 bg-orange-500 rounded-full" />
                                <div className="h-1 flex-1 bg-yellow-500 rounded-full" />
                                <div className="h-1 flex-1 bg-border-1 rounded-full" />
                            </div>
                        </div>
                    </StatsCard>

                    {/* Pending Recommendations */}
                    <StatsCard
                        title="Pending Recommendations"
                        value={stats.totalIssues?.value ?? stats.totalIssues ?? 0}
                        icon="lightbulb"
                        iconColor="text-blue-400"
                        subtitle={`${stats.pendingRecommendations?.criticalFixes || 0} Critical fixes auto-generated`}
                    >
                        {stats.pendingRecommendations?.badge && (
                            <span className="bg-blue-400/10 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-400/20 uppercase tracking-tight ml-2">
                                {stats.pendingRecommendations.badge}
                            </span>
                        )}
                    </StatsCard>
                </div>
            )}

            {/* Chart + Issues Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="lg:col-span-2">
                        <Skeleton className="h-[350px] rounded-xl" />
                    </div>
                ) : scanHistory && (
                    <ScanVelocityChart data={scanHistory} />
                )}
                
                <CriticalIssues issues={
                    projects
                        .flatMap(p => p.issues || [])
                        .filter(i => i.severity === 'critical')
                        .slice(0, 5) // Show top 5 critical issues
                } />
            </div>

            {/* Projects Table */}
            {isLoading ? (
                <div className="mt-8">
                    <Skeleton className="h-64 rounded-xl" />
                </div>
            ) : projects && (
                <ProjectsTable projects={projects} />
            )}
        </DashboardShell>
    );
}
