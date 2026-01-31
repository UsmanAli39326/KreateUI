import React, { useState, useMemo } from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import StatsCard from "@/components/Dashboard/StatsCard";
import ScanVelocityChart from "@/components/Dashboard/ScanVelocityChart";
import CriticalIssues from "@/components/Dashboard/CriticalIssues";
import ProjectsTable from "@/components/Dashboard/ProjectsTable";
import Button from "@/components/Common/Button";

// Mock data imports
import overviewStats from "@/assets/api/overviewStats.json";
import scanVelocity from "@/assets/api/scanVelocity.json";
import criticalIssues from "@/assets/api/criticalIssues.json";
import recentProjects from "@/assets/api/recentProjects.json";

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
    const [searchQuery, setSearchQuery] = useState("");

    const breadcrumbs = useMemo(
        () => [{ label: "Workspace", href: "/dashboard" }, { label: "Overview" }],
        []
    );

    const projectCount = recentProjects.length;

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Accessibility Score */}
                <StatsCard
                    title="Avg. Accessibility Score"
                    value={`${overviewStats.accessibilityScore.value}%`}
                    trend={overviewStats.accessibilityScore.trend}
                    trendDirection={overviewStats.accessibilityScore.trendDirection}
                    subtitle={`Last calculated ${overviewStats.accessibilityScore.lastUpdated}`}
                    icon="analytics"
                    iconColor="text-[#8e52ff]"
                    showGlow
                />

                {/* Total Issues */}
                <StatsCard
                    title="Total Issues Across Sites"
                    value={overviewStats.totalIssues.value.toLocaleString()}
                    trend={overviewStats.totalIssues.trend}
                    trendDirection={overviewStats.totalIssues.trendDirection}
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
                    value={overviewStats.pendingRecommendations.value}
                    icon="lightbulb"
                    iconColor="text-blue-400"
                    subtitle={`${overviewStats.pendingRecommendations.criticalFixes} Critical fixes auto-generated`}
                >
                    <span className="bg-blue-400/10 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-400/20 uppercase tracking-tight ml-2">
                        {overviewStats.pendingRecommendations.badge}
                    </span>
                </StatsCard>
            </div>

            {/* Chart + Issues Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ScanVelocityChart data={scanVelocity} />
                <CriticalIssues issues={criticalIssues} />
            </div>

            {/* Projects Table */}
            <ProjectsTable projects={recentProjects} />
        </DashboardShell>
    );
}
