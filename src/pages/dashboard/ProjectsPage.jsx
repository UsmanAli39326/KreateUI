import React, { useState } from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Button from "@/components/Common/Button";
import projectsList from "@/assets/api/projectsList.json";

function StatusBadge({ status }) {
    const styles = {
        healthy: "bg-success/10 text-success border-success/20",
        attention: "bg-warning/10 text-warning border-warning/20",
        critical: "bg-danger/10 text-danger border-danger/20",
    };
    const icons = {
        healthy: "check_circle",
        attention: "warning",
        critical: "error",
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
            <span className="material-symbols-outlined text-[14px]">{icons[status]}</span> {status}
        </span>
    );
}

function ProjectCard({ project }) {
    return (
        <div className="bg-surface-1 border border-border-1 rounded-xl p-5 hover:border-accent-1/50 transition-colors group shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-bg-2 border border-border-1 flex items-center justify-center text-accent-1">
                        <span className="material-symbols-outlined">{project.icon || "web"}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-text-1 group-hover:text-accent-1 transition-colors">{project.name}</h3>
                        <p className="text-xs text-text-3 font-mono">{project.url}</p>
                    </div>
                </div>
                <button className="text-text-3 hover:text-text-1">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </div>

            <div className="flex-1 mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-text-3">Framework</span>
                    <span className="text-xs font-medium text-text-1 bg-bg-2 px-2 py-0.5 rounded border border-border-1">{project.framework}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-text-3">Last Scan</span>
                    <span className="text-xs text-text-2">{project.lastScanned}</span>
                </div>
            </div>

            <div className="pt-4 border-t border-border-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-3 font-bold uppercase">Score</span>
                        <span className={`font-bold text-lg ${project.score >= 90 ? "text-success" : project.score >= 50 ? "text-warning" : "text-danger"}`}>
                            {project.score}
                        </span>
                    </div>
                    <div className="w-px h-8 bg-border-1"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-3 font-bold uppercase">Issues</span>
                        <span className="font-bold text-lg text-text-1">{project.issuesCount}</span>
                    </div>
                </div>
                <StatusBadge status={project.status} />
            </div>
        </div>
    );
}

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filteredProjects = projectsList.filter(p => {
        const matchesType = filter === "All" || p.status.toLowerCase() === filter.toLowerCase();
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.url.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <DashboardShell active="projects">
            <header className="pb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-text-1">Projects</h2>
                        <p className="text-text-2 mt-1">Manage and monitor your web properties.</p>
                    </div>
                    <Button variant="primary" icon={<span className="material-symbols-outlined">add</span>}>
                        New Project
                    </Button>
                </div>
            </header>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-3">search</span>
                    <input
                        type="text"
                        placeholder="Search projects by name or URL..."
                        className="w-full pl-10 pr-4 py-2.5 bg-surface-1 border border-border-1 rounded-lg text-sm text-text-1 outline-none focus:border-accent-1 transition-colors placeholder:text-text-3"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 text-sm">
                    {["All", "Healthy", "Attention", "Critical"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors border ${filter === status ? "bg-accent-1 text-white border-accent-1" : "bg-surface-1 text-text-2 border-border-1 hover:border-text-3"}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 bg-surface-1 border border-border-1 rounded-xl border-dashed">
                    <span className="material-symbols-outlined text-4xl text-text-3/50 mb-4">folder_off</span>
                    <h3 className="text-lg font-bold text-text-1">No projects found</h3>
                    <p className="text-text-3">Try adjusting your filters or create a new project.</p>
                </div>
            )}
        </DashboardShell>
    );
}
