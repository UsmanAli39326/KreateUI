import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Button from "@/components/Common/Button";
import { useToast } from "@/components/Common";
import auditService from "../../services/auditService";
import { useUserStats } from "../../hooks/useUserStats";

function StatCard({ title, value, subValue, subLabel, subColor, progressColor, progressValue }) {
    return (
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-surface-1 border border-border-1 shadow-sm">
            <div className="flex justify-between items-start">
                <p className="text-text-3 text-sm font-medium">{title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${subColor}`}>
                    {subValue}
                </span>
            </div>
            <p className="text-4xl font-black mt-1 text-text-1">{value}</p>
            {subLabel && <p className="text-text-3 text-xs font-semibold">{subLabel}</p>}
            <div className="w-full bg-bg-1 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className={`h-full ${progressColor}`} style={{ width: `${progressValue}%` }}></div>
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        Fail: "bg-danger/10 text-danger",
        Pass: "bg-success/10 text-success",
        Review: "bg-warning/10 text-warning",
    };
    const icons = {
        Fail: "cancel",
        Pass: "check_circle",
        Review: "visibility",
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
            <span className="material-symbols-outlined text-[14px]">{icons[status]}</span> {status}
        </span>
    );
}

export default function ReportsPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    // useUserStats fetches stats + audit list + compliance in one shot
    const { stats: rawStats, audits, complianceReport = { report: [] }, isLoading: loading, refetch } = useUserStats({
        auditPage: page,
        auditLimit: 10,
    });

    // Derive WCAG-level scores from the real accessibilityScore
    // Extract the latest audit's score instead of the global average for the compliance report
    const latestAudit = audits && audits.length > 0 ? audits[0] : null;
    const accessScore = latestAudit?.summary?.wcagScore?.total ?? latestAudit?.summary?.currentScore ?? rawStats?.accessibilityScore?.value ?? rawStats?.accessibilityScore ?? 0;
    
    const stats = {
        overall: { score: accessScore, trend: rawStats?.accessibilityScore?.trend ?? 0 },
        levelA: { score: accessScore },
        levelAA: { score: rawStats?.levelAA ?? Math.round(accessScore * 0.9), trend: 0 },
        levelAAA: { score: rawStats?.levelAAA ?? Math.round(accessScore * 0.7), trend: 0 },
    };

    const audit = audits || [];
    const totalPages = Math.ceil((rawStats?.totalAudits || audit.length) / 10) || 1;

    const complianceList = complianceReport.report || [];
    const reportUrl = complianceReport.url;

    const [compliancePage, setCompliancePage] = useState(1);
    const [selectedGuideline, setSelectedGuideline] = useState(null);
    const complianceItemsPerPage = 5;
    const paginatedComplianceList = complianceList.slice(
        (compliancePage - 1) * complianceItemsPerPage,
        compliancePage * complianceItemsPerPage
    );
    const totalCompliancePages = Math.ceil(complianceList.length / complianceItemsPerPage) || 1;
    const handleDeleteAudit = async (id) => {
        try {
            await auditService.deleteAudit(id);
            toast.success("Audit report deleted successfully.", "Deleted");
            refetch(); // reload after delete
        } catch (err) {
            console.error("Failed to delete audit", err);
            toast.error("Failed to delete the selected audit report.", "Delete Error");
        }
    };

    return (
        <DashboardShell active="reports">
            {/* Header Section */}
            <header className="pb-8">
                <div className="flex flex-wrap justify-between items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-4xl font-black tracking-tight text-text-1">WCAG 2.1 Compliance Report</h2>
                        <p className="text-text-2 text-lg">
                            Comprehensive audit for accessibility & usability optimization
                            {reportUrl && <span className="ml-2 font-mono text-sm px-2 py-1 bg-surface-1 border border-border-1 rounded-md text-accent-1">{reportUrl}</span>}
                        </p>
                    </div>
                    <div className="flex gap-3">

                        <Button 
                            variant="primary" 
                            icon={<span className="material-symbols-outlined text-lg">refresh</span>} 
                            className="shadow-lg shadow-accent-1/20" 
                            onClick={() => navigate('/dashboard/analyze')}
                        >
                            Re-run Audit
                        </Button>
                    </div>
                </div>
            </header>

            <div className="w-full">
                {/* Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Overall Score"
                        value={`${stats.overall.score}%`}
                        subValue={`+${stats.overall.trend}%`}
                        subColor="bg-success/10 text-success"
                        progressColor="bg-accent-1"
                        progressValue={stats.overall.score}
                    />
                    <StatCard
                        title="Level A"
                        value={`${stats.levelA.score}%`}
                        subValue="Healthy"
                        subColor="bg-transparent text-success !p-0"
                        progressColor="bg-success"
                        progressValue={stats.levelA.score}
                    />
                    <StatCard
                        title="Level AA"
                        value={`${stats.levelAA.score}%`}
                        subValue={`${stats.levelAA.trend}%`}
                        subLabel="(Needs attention)"
                        subColor="bg-transparent text-warning !p-0"
                        progressColor="bg-warning"
                        progressValue={stats.levelAA.score}
                    />
                    <StatCard
                        title="Level AAA"
                        value={`${stats.levelAAA.score}%`}
                        subValue="Optional"
                        subColor="bg-transparent text-text-3 !p-0"
                        progressColor="bg-text-3"
                        progressValue={stats.levelAAA.score}
                    />
                </div>

                {/* Search and Filter */}
                <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                        <label className="flex items-center w-full bg-surface-1 border border-border-1 rounded-lg px-4 h-12">
                            <span className="material-symbols-outlined text-text-3">search</span>
                            <input
                                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-text-3 ml-2 text-text-1 outline-none"
                                placeholder="Search guidelines (e.g. 1.1.1, contrast, focus)"
                                type="text"
                            />
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <select className="bg-surface-1 border border-border-1 rounded-lg text-sm px-4 h-12 focus:ring-0 text-text-1 outline-none">
                            <option>All Severity</option>
                            <option>Critical</option>
                            <option>Serious</option>
                            <option>Moderate</option>
                        </select>
                        <select className="bg-surface-1 border border-border-1 rounded-lg text-sm px-4 h-12 focus:ring-0 text-text-1 outline-none">
                            <option>All Status</option>
                            <option>Pass</option>
                            <option>Fail</option>
                            <option>Manual Review</option>
                        </select>
                    </div>
                </div>

                {/* Table Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold tracking-tight text-text-1">Success Criteria Audit</h3>
                    <p className="text-xs text-text-3 font-medium uppercase tracking-widest">Displaying {Math.min(complianceItemsPerPage, complianceList.length)} of {complianceList.length} Guidelines</p>
                </div>

                {/* Detailed Audit Table */}
                <div className="bg-surface-1 rounded-xl border border-border-1 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-bg-0 border-b border-border-1">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3 w-24">ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3">Success Criterion</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3 text-center">Level</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3 text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3 text-center">Impact</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-1">
                            {paginatedComplianceList.map((row) => (
                                <tr key={row.id} className="hover:bg-surface-2 transition-colors">
                                    <td className="px-6 py-5 font-mono text-xs text-accent-1 font-bold">{row.id}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-text-1">{row.criterion}</span>
                                            <span className="text-xs text-text-3 mt-1 line-clamp-1">{row.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-xs font-bold bg-bg-2 px-2 py-1 rounded text-text-2">{row.level}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <StatusBadge status={row.status} />
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`text-xs font-bold ${row.impact === 'Critical' ? 'text-danger' :
                                            row.impact === 'Serious' ? 'text-danger' :
                                                row.impact === 'Moderate' ? 'text-warning' : 'text-text-3'
                                            }`}>{row.impact}</span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button 
                                            className="text-accent-1 text-xs font-bold hover:underline"
                                            onClick={() => {
                                                if (row.status === 'Pass') setSelectedGuideline(row);
                                                else navigate(`/dashboard/fix`);
                                            }}
                                        >
                                            {row.status === 'Pass' ? 'Details' : 'Fix Guidance'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-6 py-4 bg-bg-0 border-t border-border-1 flex justify-between items-center">
                        <span className="text-xs text-text-3">Showing {paginatedComplianceList.length} of {complianceList.length} Guidelines</span>
                        {totalCompliancePages > 1 && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCompliancePage(p => Math.max(1, p - 1))}
                                    disabled={compliancePage === 1}
                                    className="px-3 py-1 bg-surface-1 text-text-2 rounded border border-border-1 disabled:opacity-50 text-xs font-medium hover:bg-surface-2 transition-colors"
                                >
                                    Prev
                                </button>
                                <span className="text-xs text-text-3 self-center px-2">Page {compliancePage} of {totalCompliancePages}</span>
                                <button
                                    onClick={() => setCompliancePage(p => Math.min(totalCompliancePages, p + 1))}
                                    disabled={compliancePage === totalCompliancePages}
                                    className="px-3 py-1 bg-surface-1 text-text-2 rounded border border-border-1 disabled:opacity-50 text-xs font-medium hover:bg-surface-2 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>


            </div>

            {selectedGuideline && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-surface-1 border border-border-1 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-[fade-in-up_0.2s_ease-out]">
                        <div className="flex justify-between items-center p-6 border-b border-border-1 bg-surface-2">
                            <h3 className="text-xl font-bold text-text-1">Guideline Details</h3>
                            <button 
                                onClick={() => setSelectedGuideline(null)}
                                className="text-text-3 hover:text-text-1 transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <div className="text-xs text-accent-1 font-bold mb-1 font-mono">{selectedGuideline.id}</div>
                                <h4 className="text-lg font-black text-text-1">{selectedGuideline.criterion}</h4>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-surface-2 rounded-xl p-4 border border-border-1">
                                    <div className="text-xs text-text-3 font-bold uppercase mb-2">Status</div>
                                    <StatusBadge status={selectedGuideline.status} />
                                </div>
                                <div className="bg-surface-2 rounded-xl p-4 border border-border-1">
                                    <div className="text-xs text-text-3 font-bold uppercase mb-1">Impact</div>
                                    <div className="font-bold text-text-1">{selectedGuideline.impact === "Minor" ? "None (Passed)" : selectedGuideline.impact}</div>
                                </div>
                            </div>
                            
                            <div className="bg-success/5 border border-success/20 rounded-xl p-5">
                                <h5 className="text-success font-bold text-sm mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">verified</span>
                                    AI Verification Complete
                                </h5>
                                <p className="text-text-2 text-sm leading-relaxed">
                                    {selectedGuideline.description !== "No issues found" ? selectedGuideline.description : "Our automated engine successfully verified that your website complies with this WCAG criterion. No further manual intervention is required for this specific rule."}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 border-t border-border-1 bg-surface-2 flex justify-end">
                            <button className="px-4 py-2 bg-surface-3 text-text-1 rounded-lg text-sm font-bold transition-colors" onClick={() => setSelectedGuideline(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardShell>
    );
}
