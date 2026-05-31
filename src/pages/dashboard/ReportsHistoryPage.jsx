import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Button from "@/components/Common/Button";

const mockHistory = [
    { id: "rep-001", date: "2023-10-25", title: "Monthly Compliance Audit", score: 84, status: "completed" },
    { id: "rep-002", date: "2023-10-20", title: "Homepage Optimization", score: 92, status: "completed" },
    { id: "rep-003", date: "2023-09-15", title: "Footer Accessibility Review", score: 78, status: "completed" },
    { id: "rep-004", date: "2023-08-30", title: "Initial Platform Audit", score: 65, status: "completed" },
];

export default function ReportsHistoryPage() {
    const [history, setHistory] = useState(mockHistory);

    const handleDelete = (id) => {
        setHistory(history.filter(item => item.id !== id));
    };

    return (
        <DashboardShell active="reports">
            <header className="pb-8">
                <div className="flex items-center gap-4 mb-4">
                    <Link to="/reports" className="text-text-3 hover:text-accent-1 transition-colors">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h2 className="text-4xl font-black tracking-tight text-text-1">Audit History</h2>
                </div>
                <p className="text-text-2 text-lg">Manage and review your previously generated accessibility reports.</p>
            </header>

            <div className="bg-surface-1 rounded-xl border border-border-1 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-bg-0 border-b border-border-1">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3">Date</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3">Report Name</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3 text-center">Score</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3 text-center">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-1">
                        {history.map((item) => (
                            <tr key={item.id} className="hover:bg-surface-2 transition-colors">
                                <td className="px-6 py-5 text-sm text-text-2">{item.date}</td>
                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-text-1">{item.title}</span>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${item.score >= 90 ? "bg-success/10 text-success" :
                                            item.score >= 80 ? "bg-accent-1/10 text-accent-1" :
                                                "bg-warning/10 text-warning"
                                        }`}>
                                        {item.score}%
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <span className="text-xs font-bold text-success flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-sm">check_circle</span>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-text-3 hover:text-accent-1 transition-colors" title="Download PDF">
                                            <span className="material-symbols-outlined">download</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-2 text-text-3 hover:text-danger transition-colors"
                                            title="Delete"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardShell>
    );
}
