import React from "react";

const statusConfig = {
    healthy: {
        bgColor: "bg-emerald-500/10",
        textColor: "text-emerald-500",
        borderColor: "border-emerald-500/20",
        barColor: "bg-emerald-500",
        label: "HEALTHY"
    },
    attention: {
        bgColor: "bg-orange-500/10",
        textColor: "text-orange-500",
        borderColor: "border-orange-500/20",
        barColor: "bg-orange-500",
        label: "ATTENTION"
    },
    critical: {
        bgColor: "bg-red-500/10",
        textColor: "text-red-500",
        borderColor: "border-red-500/20",
        barColor: "bg-red-500",
        label: "CRITICAL"
    }
};

function ProjectIcon({ name }) {
    const cls = "size-4 text-[#8e52ff]";

    switch (name) {
        case "globe":
            return (
                <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            );
        case "cart":
            return (
                <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
            );
        case "dashboard":
            return (
                <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
            );
        case "phone":
            return (
                <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
            );
        default:
            return (
                <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            );
    }
}

export default function ProjectsTable({ projects }) {
    return (
        <section className="mt-8 bg-surface-1 border border-border-1 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-border-1 flex justify-between items-center">
                <h3 className="text-lg font-bold text-text-1">Recent Projects</h3>
                <button className="bg-[#8e52ff]/10 text-[#8e52ff] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#8e52ff]/20 transition-colors">
                    Manage Projects
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-bg-0/50 text-text-3 text-[10px] uppercase font-bold">
                            <th className="px-6 py-4">Project Name</th>
                            <th className="px-6 py-4">Current Score</th>
                            <th className="px-6 py-4">Issues Found</th>
                            <th className="px-6 py-4">Last Scanned</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-1">
                        {projects.map((project) => {
                            const status = statusConfig[project.status] || statusConfig.healthy;

                            return (
                                <tr key={project.id} className="hover:bg-bg-0/30 transition-colors">
                                    {/* Project Name */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-[#8e52ff]/20 flex items-center justify-center">
                                                <ProjectIcon name={project.icon} />
                                            </div>
                                            <span className="text-sm font-semibold text-text-1">{project.name}</span>
                                        </div>
                                    </td>

                                    {/* Score */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-border-1 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${status.barColor}`}
                                                    style={{ width: `${project.score}%` }}
                                                />
                                            </div>
                                            <span className={`text-xs font-bold ${status.textColor}`}>
                                                {project.score}%
                                            </span>
                                        </div>
                                    </td>

                                    {/* Issues */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-text-2">{project.issuesCount} Total</span>
                                    </td>

                                    {/* Last Scanned */}
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-text-3">{project.lastScanned}</span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className={`${status.bgColor} ${status.textColor} px-2 py-0.5 rounded-full text-[10px] font-bold border ${status.borderColor}`}>
                                            {status.label}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <button className="text-text-3 hover:text-text-1 p-1 rounded hover:bg-surface-2 transition-colors">
                                            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="1" />
                                                <circle cx="19" cy="12" r="1" />
                                                <circle cx="5" cy="12" r="1" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
