import React from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Button from "@/components/Common/Button";
import { useAdminData } from "../../hooks/useAdminData";
import { useToast } from "@/components/Common";
import adminService from "../../services/adminService";

export default function AdminPage() {
    const toast = useToast();
    const { analytics, users, logs, pendingTemplates, isLoading: loading, error, refetch: loadAdminData } = useAdminData();

    const handleDeleteUser = async (userId) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await adminService.deleteUser(userId);
            toast.success("User deleted successfully.");
            loadAdminData();
        } catch (err) {
            console.error("Failed to delete user", err);
            toast.error("Failed to delete user.");
        }
    };

    const handleToggleBlock = async (userId) => {
        try {
            await adminService.toggleUserBlock(userId);
            toast.success("User block status toggled.");
            loadAdminData();
        } catch (err) {
            console.error("Failed to toggle block", err);
            toast.error("Failed to toggle user block status.");
        }
    };

    const handleApproveTemplate = async (id) => {
        try {
            await adminService.approveTemplate(id);
            toast.success("Template approved.");
            loadAdminData();
        } catch (err) {
            toast.error("Failed to approve template.");
        }
    };

    const handleRejectTemplate = async (id) => {
        try {
            await adminService.rejectTemplate(id);
            toast.success("Template rejected.");
            loadAdminData();
        } catch (err) {
            toast.error("Failed to reject template.");
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

                    {/* User Management Table */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-text-1">User Management</h3>
                            <Button variant="tertiary" size="sm" onClick={loadAdminData}>Refresh</Button>
                        </div>
                        <div className="rounded-xl bg-surface-1 border border-border-1 overflow-hidden">
                            {users.length > 0 ? (
                                <table className="w-full text-sm">
                                    <thead className="bg-surface-2 border-b border-border-1">
                                        <tr>
                                            <th className="text-left px-4 py-3 text-text-3 font-medium">Name</th>
                                            <th className="text-left px-4 py-3 text-text-3 font-medium">Email</th>
                                            <th className="text-left px-4 py-3 text-text-3 font-medium">Role</th>
                                            <th className="text-left px-4 py-3 text-text-3 font-medium">Status</th>
                                            <th className="text-right px-4 py-3 text-text-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-1">
                                        {users.map((u) => (
                                            <tr key={u.id || u._id} className="hover:bg-surface-2 transition-colors">
                                                <td className="px-4 py-3 text-text-1 font-medium">{u.name || '—'}</td>
                                                <td className="px-4 py-3 text-text-2">{u.email}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                                        u.role === 'admin' ? 'bg-accent-1/10 text-accent-1' : 'bg-surface-2 text-text-3'
                                                    }`}>{u.role || 'user'}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                                        u.blocked ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
                                                    }`}>{u.blocked ? 'Blocked' : 'Active'}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2 justify-end">
                                                        <Button variant="tertiary" size="sm"
                                                            onClick={() => handleToggleBlock(u.id || u._id)}
                                                        >
                                                            {u.blocked ? 'Unblock' : 'Block'}
                                                        </Button>
                                                        <Button variant="tertiary" size="sm"
                                                            className="!text-danger hover:!bg-danger/10"
                                                            onClick={() => handleDeleteUser(u.id || u._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center text-text-3">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">group</span>
                                    <p>No users found.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Pending Templates Section */}
                    {pendingTemplates.length > 0 && (
                        <section>
                            <h3 className="text-xl font-bold text-text-1 mb-4">
                                Pending Templates
                                <span className="ml-2 text-sm bg-warning/10 text-warning px-2 py-0.5 rounded-full font-bold">
                                    {pendingTemplates.length}
                                </span>
                            </h3>
                            <div className="rounded-xl bg-surface-1 border border-border-1 overflow-hidden divide-y divide-border-1">
                                {pendingTemplates.map((t) => (
                                    <div key={t.id || t._id} className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center hover:bg-surface-2 transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-text-1 font-medium truncate">{t.name || 'Unnamed Template'}</p>
                                            <p className="text-text-3 text-xs mt-0.5">{t.description || 'No description'}</p>
                                            <p className="text-text-3 text-xs mt-0.5">By: {t.authorName || t.uploadedBy || '—'}</p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <Button variant="tertiary" size="sm"
                                                className="!text-success hover:!bg-success/10 !border-success/20"
                                                onClick={() => handleApproveTemplate(t.id || t._id)}
                                            >
                                                Approve
                                            </Button>
                                            <Button variant="tertiary" size="sm"
                                                className="!text-danger hover:!bg-danger/10"
                                                onClick={() => handleRejectTemplate(t.id || t._id)}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

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
