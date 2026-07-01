import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardShell from '@/components/Dashboard/DashboardShell';
import Breadcrumbs from '@/components/Dashboard/BreadCrumbs';
import Badge from '@/components/Common/Badge';
import Button from '@/components/Common/Button';
import EmptyState from '@/components/Common/EmptyState';
import auditService from '@/services/auditService';

export default function IssuesPage() {
    const [searchParams] = useSearchParams();
    const auditId = searchParams.get('auditId');
    const url = searchParams.get('url') || '';
    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [severityFilter, setSeverityFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    useEffect(() => {
        if (!auditId) return;
        setIsLoading(true);
        auditService.getRecommendations(auditId)
            .then(res => {
                const recs = res?.recommendations || res?.data || [];
                setIssues(recs);
            })
            .catch(err => {
                console.error("Failed to fetch recommendations", err);
                setError("Failed to load issues from server.");
            })
            .finally(() => setIsLoading(false));
    }, [auditId]);

    const filteredIssues = useMemo(() => {
        return issues.filter(issue => {
            const issueSeverity = issue.severity || "Moderate";
            const matchSeverity = severityFilter === 'all' || issueSeverity.toLowerCase() === severityFilter.toLowerCase();
            
            // Category filter based on type
            const issueCategory = issue.type || "";
            const matchCategory = categoryFilter === 'all' || issueCategory.toLowerCase().includes(categoryFilter.toLowerCase()) || (issue.title && issue.title.toLowerCase().includes(categoryFilter.toLowerCase()));
            
            return matchSeverity && matchCategory;
        });
    }, [issues, severityFilter, categoryFilter]);

    const breadcrumbs = [
        { label: "Workspace", href: "/dashboard" },
        { label: "Analyze", href: "/dashboard/analyze" },
        { label: "Issues" }
    ];

    return (
        <DashboardShell active="analyze">
            <div className="flex flex-col h-full pb-10">
                <Breadcrumbs items={breadcrumbs} />

                {/* Page Heading */}
                <div className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border-1">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-black text-text-1">Issues Found</h1>
                        {url && (
                            <p className="text-text-3 text-sm font-medium">
                                Audit URL: <a href={url} target="_blank" rel="noreferrer" className="text-accent-1 hover:underline">{url}</a>
                            </p>
                        )}
                    </div>
                    <Button 
                        variant="primary" 
                        onClick={async () => {
                            if (!auditId || filteredIssues.length === 0) return;
                            const batchSize = 10;
                            setIsLoading(true);
                            try {
                                for (let i = 0; i < filteredIssues.length; i += batchSize) {
                                    const batch = filteredIssues.slice(i, i + batchSize);
                                    await auditService.generateFixes(auditId, batch);
                                }
                                alert("Batched AI fixes generation completed.");
                            } catch (error) {
                                console.error("Error generating fixes", error);
                                alert("Failed to generate some AI fixes.");
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        disabled={isLoading || filteredIssues.length === 0}
                        icon={<span className="material-symbols-outlined text-lg">auto_fix_high</span>}
                    >
                        {isLoading ? "Generating..." : "Generate AI Fixes (Batched)"}
                    </Button>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap gap-4 py-4 mb-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-bold text-text-2">Severity:</label>
                        <select 
                            className="bg-surface-1 border border-border-1 rounded-md px-3 py-1.5 text-sm text-text-1 outline-none focus:ring-2 focus:ring-accent-1/50"
                            value={severityFilter}
                            onChange={e => setSeverityFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="critical">Critical</option>
                            <option value="serious">Serious</option>
                            <option value="moderate">Moderate</option>
                            <option value="minor">Minor</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-bold text-text-2">Category:</label>
                        <select 
                            className="bg-surface-1 border border-border-1 rounded-md px-3 py-1.5 text-sm text-text-1 outline-none focus:ring-2 focus:ring-accent-1/50"
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="contrast">Contrast</option>
                            <option value="structure">Structure</option>
                            <option value="navigation">Navigation</option>
                            <option value="forms">Forms</option>
                        </select>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex flex-col gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse bg-surface-1 rounded-xl p-6 border border-border-1 flex flex-col gap-4">
                                    <div className="h-6 bg-border-1 rounded w-1/3"></div>
                                    <div className="h-4 bg-border-1 rounded w-full"></div>
                                    <div className="h-4 bg-border-1 rounded w-4/5"></div>
                                    <div className="h-10 bg-border-1 rounded w-32 mt-2"></div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <EmptyState 
                            icon={<span className="material-symbols-outlined text-4xl">error</span>}
                            title="Error Loading Issues"
                            description={error}
                            actionLabel="Try Again"
                            onAction={() => window.location.reload()}
                        />
                    ) : filteredIssues.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {filteredIssues.map((rec, idx) => (
                                <div key={idx} className="bg-surface-1 rounded-xl border border-border-1 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between hover:border-border-2 transition-colors">
                                    <div className="flex flex-col gap-3 flex-1">
                                        <div className="flex items-center gap-3">
                                            <Badge variant={rec.severity?.toLowerCase() === 'critical' ? 'critical' : rec.severity?.toLowerCase() === 'serious' ? 'danger' : rec.severity?.toLowerCase() === 'minor' ? 'success' : 'warning'} size="sm" className="uppercase tracking-wider">
                                                {rec.severity || "Moderate"}
                                            </Badge>
                                            <h3 className="text-lg font-bold text-text-1 m-0">
                                                {rec.title || "Untitled Issue"}
                                            </h3>
                                        </div>
                                        <p className="text-text-2 text-sm max-w-3xl">
                                            {rec.suggestion || "No detailed suggestion provided."}
                                        </p>
                                    </div>
                                    <div>
                                        <Button 
                                            variant="secondary" 
                                            onClick={() => navigate(`/dashboard/analyze/results?auditId=${auditId}`)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState 
                            icon={<span className="material-symbols-outlined text-4xl">check_circle</span>}
                            title="No Issues Found"
                            description={issues.length === 0 ? "Great job! We didn't find any recommendations for this audit." : "No issues match your current filters."}
                            actionLabel={issues.length > 0 ? "Clear Filters" : undefined}
                            onAction={issues.length > 0 ? () => { setSeverityFilter('all'); setCategoryFilter('all'); } : undefined}
                        />
                    )}
                </div>
            </div>
        </DashboardShell>
    );
}
