import React, { useState, useEffect } from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Button from "@/components/Common/Button";
import adminService from "../../services/adminService";
import { useToast } from "@/components/Common";

export default function AdminPage() {
    const toast = useToast();
    const [analytics, setAnalytics] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadAdminData = async () => {
        try {
            setLoading(true);
            const [analyticsRes, logsRes] = await Promise.all([
                adminService.getAnalytics().catch(() => ({ data: { totalUsers: 0, activeProjects: 0 } })),
                adminService.getLogs(1).catch(() => ({ data: [] }))
            ]);
            setAnalytics(analyticsRes.data);
            setLogs(logsRes.data || []);
        } catch (err) {
            console.error("Failed to load admin data", err);
            setError("Failed to load admin dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAdminData();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await adminService.deleteUser(userId);
            toast.success("User deleted successfully.");
            // Ideally we'd reload the user list if we had one
        } catch (err) {
            console.error("Failed to delete user", err);
            toast.error("Failed to delete user.");
        }
    };

    const handleToggleBlock = async (userId) => {
        try {
            await adminService.toggleUserBlock(userId);
            toast.success("User block status toggled.");
            // Ideally we'd reload the user list if we had one
        } catch (err) {
            console.error("Failed to toggle block", err);
            toast.error("Failed to toggle user block status.");
        }
    };

    return (
        <DashboardShell active="admin">
            <header className="pb-8">
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-black tracking-tight text-text-1">Admin Dashboard</h2>
                    <p className="text-text-2 text-lg">Manage platform analytics, users, and system logs.</p>
                </div>
            </header>

            {error && <div className="p-4 mb-6 text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg">{error}</div>}

            {loading ? (
                <div className="flex items-center gap-2 text-text-3">
                    <span className="material-symbols-outlined animate-spin">sync</span> Loading...
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Analytics Section */}
                    <section>
                        <h3 className="text-xl font-bold text-text-1 mb-4">Platform Analytics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl bg-surface-1 border border-border-1 shadow-sm">
                                <p className="text-sm text-text-3 font-medium mb-1">Total Users</p>
                                <p className="text-3xl font-black text-text-1">{analytics?.totalUsers || "N/A"}</p>
                            </div>
                            <div className="p-6 rounded-xl bg-surface-1 border border-border-1 shadow-sm">
                                <p className="text-sm text-text-3 font-medium mb-1">Active Projects</p>
                                <p className="text-3xl font-black text-text-1">{analytics?.activeProjects || "N/A"}</p>
                            </div>
                            <div className="p-6 rounded-xl bg-surface-1 border border-border-1 shadow-sm">
                                <p className="text-sm text-text-3 font-medium mb-1">API Requests</p>
                                <p className="text-3xl font-black text-text-1">{analytics?.apiRequests || "N/A"}</p>
                            </div>
                        </div>
                    </section>

                    {/* Example User Management Section */}
                    <section>
                        <h3 className="text-xl font-bold text-text-1 mb-4">Quick User Actions</h3>
                        <div className="p-6 rounded-xl bg-surface-1 border border-border-1 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                            <input 
                                type="text" 
                                placeholder="Enter User ID" 
                                className="flex-1 bg-surface-2 border border-border-1 rounded-lg px-4 py-2 text-text-1 focus:outline-none focus:border-accent-1"
                                id="admin-user-id"
                            />
                            <div className="flex gap-2 w-full md:w-auto">
                                <Button 
                                    variant="secondary" 
                                    onClick={() => handleToggleBlock(document.getElementById('admin-user-id').value)}
                                >
                                    Toggle Block
                                </Button>
                                <Button 
                                    variant="danger" 
                                    className="!bg-danger/10 !text-danger hover:!bg-danger/20 border !border-danger/20"
                                    onClick={() => handleDeleteUser(document.getElementById('admin-user-id').value)}
                                >
                                    Delete User
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* System Logs Section */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-text-1">System Logs</h3>
                            <Button variant="tertiary" size="sm" onClick={() => loadAdminData()}>Refresh</Button>
                        </div>
                        <div className="rounded-xl bg-surface-1 border border-border-1 overflow-hidden">
                            {logs.length > 0 ? (
                                <ul className="divide-y divide-border-1">
                                    {logs.map((log, idx) => (
                                        <li key={idx} className="p-4 flex flex-col sm:flex-row gap-2 sm:items-center hover:bg-surface-2 transition-colors">
                                            <span className="text-xs font-mono text-text-3 whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold w-max ${
                                                log.level === 'error' ? 'bg-danger/10 text-danger' : 
                                                log.level === 'warn' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                                            }`}>
                                                {log.level?.toUpperCase() || 'INFO'}
                                            </span>
                                            <span className="text-sm text-text-1">{log.message}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-8 text-center text-text-3">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">receipt_long</span>
                                    <p>No logs found.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </DashboardShell>
    );
}
