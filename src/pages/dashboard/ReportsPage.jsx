import React, { useState, useEffect } from "react";
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
    const [stats] = useState(reportData.stats);
    const [audit, setAudit] = useState(reportData.audit);
    const [loading, setLoading] = useState(true);

    const loadAudits = async () => {
        try {
            setLoading(true);
            const res = await userService.getAudits(1, 10);
            // API returns: { audits: [...], total, page, limit }
            const auditList = res?.audits || res?.data;
            if (auditList && auditList.length > 0) {
                // Map API format to UI format, assuming similar structure or fallback to mock
                // In a real app we would map auditList directly to setAudit(auditList)
                // setAudit(auditList);
            }
        } catch (err) {
            console.error("Failed to load audits", err);
            toast.error("Failed to load compliance audit history from server.", "Load Error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAudits();
    }, []);

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
                        <Button variant="secondary" icon={<span className="material-symbols-outlined text-lg">download</span>} onClick={() => handleExportPdf(1)}>
                            Export PDF
                        </Button>
                        <Button variant="primary" icon={<span className="material-symbols-outlined text-lg">refresh</span>} className="shadow-lg shadow-accent-1/20" onClick={loadAudits}>
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
                        <span className="text-xs text-text-3">Showing page 1 of 4</span>
                        <div className="flex gap-2">
                            <button className="size-8 flex items-center justify-center rounded border border-border-1 text-text-3 disabled:opacity-50" disabled>
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button className="size-8 flex items-center justify-center rounded bg-accent-1 text-white text-xs font-bold">1</button>
                            <button className="size-8 flex items-center justify-center rounded border border-border-1 text-text-3 hover:bg-surface-2 text-xs font-bold">2</button>
                            <button className="size-8 flex items-center justify-center rounded border border-border-1 text-text-3 hover:bg-surface-2">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Documentation & Collaboration */}
                <div className="mt-8 flex flex-col md:flex-row gap-6 pb-8">
                    <div className="flex-1 bg-gradient-to-br from-accent-1/10 to-transparent p-6 rounded-xl border border-accent-1/20 flex gap-4 items-start">
                        <div className="bg-accent-1/20 p-3 rounded-lg text-accent-1">
                            <span className="material-symbols-outlined">description</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-text-1">Documentation & Resources</h4>
                            <p className="text-sm text-text-3 mb-4 leading-relaxed">Access official W3C guidelines and common remediation code snippets to help your team resolve failures efficiently.</p>
                            <a href="#" className="text-accent-1 font-bold text-sm flex items-center gap-1 hover:underline">
                                Browse Docs <span className="material-symbols-outlined text-sm">open_in_new</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 bg-surface-1 p-6 rounded-xl border border-border-1 flex gap-4 items-start shadow-sm">
                        <div className="bg-bg-2 p-3 rounded-lg text-text-3">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-text-1">Collaboration</h4>
                            <p className="text-sm text-text-3 mb-4 leading-relaxed">Assign specific failure points to your developers or QA team and track remediation progress in real-time.</p>
                            <a href="#" className="text-text-1 font-bold text-sm flex items-center gap-1 hover:text-accent-1 transition-colors">
                                Assign Tasks <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
