import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Button from "@/components/Common/Button";
import { useToast } from "@/components/Common";
import reportData from "@/assets/api/reportData.json";
import userService from "../../services/userService";
import auditService from "../../services/auditService";

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
    const [stats, setStats] = useState(reportData.stats);
    const [audit, setAudit] = useState(reportData.audit);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadStats = async () => {
        try {
            const res = await userService.getStats();
            if (res) {
                setStats({
                    overall: { score: res.accessibilityScore || 0, trend: 0 },
                    levelA: { score: res.accessibilityScore || 0 },
                    levelAA: { score: Math.round((res.accessibilityScore || 0) * 0.9) },
                    levelAAA: { score: Math.round((res.accessibilityScore || 0) * 0.7) }
                });
            }
        } catch (err) {
            console.error("Failed to load stats", err);
        }
    };

    const loadAudits = async (currentPage = 1) => {
        try {
            setLoading(true);
            const res = await userService.getAudits(currentPage, 10);
            // API returns: { audits: [...], total, page, limit }
            const auditList = res?.audits || res?.data;
            if (res?.total) {
                setTotalPages(Math.ceil(res.total / (res.limit || 10)));
            }
            if (auditList && auditList.length > 0) {
                const mappedAudits = auditList.map(a => ({
                    id: a.id,
                    criterion: a.name,
                    level: "AA",
                    status: a.score >= 80 ? "Pass" : "Fail",
                    impact: a.score < 50 ? "Critical" : a.score < 80 ? "Moderate" : "Minor",
                    description: `${a.summary?.issueCount || 0} issues found`
                }));
                setAudit(mappedAudits);
            } else {
                setAudit([]);
            }
        } catch (err) {
            console.error("Failed to load audits", err);
            toast.error("Failed to load compliance audit history from server.", "Load Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAudits(page);
        loadStats();
    }, [page]);

    const handleExportPdf = async (id = 1) => {
        try {
            toast.info("Generating PDF report...", "Exporting");
            const blob = await auditService.getPdfReport(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `audit-report-${id}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success("PDF report downloaded successfully!", "Success");
        } catch (err) {
            console.error("Failed to download PDF", err);
            toast.error("Failed to generate PDF compliance report.", "Export Error");
        }
    };

    const handleDeleteAudit = async (id) => {
        try {
            await auditService.deleteAudit(id);
            toast.success("Audit report deleted successfully.", "Deleted");
            loadAudits(); // reload after delete
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
                        <p className="text-text-2 text-lg">Comprehensive audit for accessibility & usability optimization</p>
                    </div>
                    <div className="flex gap-3">
                        <Button 
                            variant="secondary" 
                            icon={<span className="material-symbols-outlined text-lg">download</span>} 
                            onClick={() => handleExportPdf(audit[0]?.id)}
                            disabled={!audit || audit.length === 0}
                            title={(!audit || audit.length === 0) ? "Run an audit first." : ""}
                        >
                            Export PDF
                        </Button>
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
                    <p className="text-xs text-text-3 font-medium uppercase tracking-widest">Displaying 5 of 78 Guidelines</p>
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
                            {audit.map((row) => (
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
                                        <button className="text-accent-1 text-xs font-bold hover:underline">
                                            {row.status === 'Pass' ? 'Details' : 'Fix Guidance'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-6 py-4 bg-bg-0 border-t border-border-1 flex justify-between items-center">
                        <span className="text-xs text-text-3">Showing page {page} of {totalPages}</span>
                        <div className="flex gap-2">
                            <button 
                                className="size-8 flex items-center justify-center rounded border border-border-1 text-text-3 disabled:opacity-50 hover:bg-surface-2 transition-colors" 
                                disabled={page === 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            >
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button className="size-8 flex items-center justify-center rounded bg-accent-1 text-white text-xs font-bold">{page}</button>
                            <button 
                                className="size-8 flex items-center justify-center rounded border border-border-1 text-text-3 disabled:opacity-50 hover:bg-surface-2 transition-colors"
                                disabled={page >= totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            >
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </DashboardShell>
    );
}
