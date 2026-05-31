import React, { useState } from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import PageHeader from "@/components/Dashboard/PageHeader";
import Badge from "@/components/Common/Badge";
import Button from "@/components/Common/Button";
import mockAdminData from "@/assets/api/mockAdminData.json";

export default function UserManagementPage() {
    const [users, setUsers] = useState(mockAdminData.users);
    const [searchTerm, setSearchTerm] = useState("");

    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Admin", href: "#" },
        { label: "User Management" },
    ];

    const handleStatusToggle = (userId) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    status: user.status === "active" ? "locked" : "active"
                };
            }
            return user;
        }));
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardShell active="admin-users">
            <Breadcrumbs items={breadcrumbs} />
            <PageHeader
                title="User Management"
                subtitle="Manage user access and roles across the platform."
            />

            <div className="mb-6 flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-3 material-symbols-outlined text-sm">search</span>
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-9 pr-4 py-2 bg-surface-1 border border-border-1 rounded-lg text-sm text-text-1 focus:outline-none focus:ring-2 focus:ring-accent-1/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-surface-1 border border-border-1 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-bg-0 border-b border-border-1">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-text-2">User</th>
                                <th className="px-6 py-3 font-semibold text-text-2">Role</th>
                                <th className="px-6 py-3 font-semibold text-text-2">Status</th>
                                <th className="px-6 py-3 font-semibold text-text-2">Last Active</th>
                                <th className="px-6 py-3 font-semibold text-text-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-1">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-bg-0/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-text-1">{user.name}</div>
                                            <div className="text-xs text-text-3">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={user.role === 'admin' ? 'high' : 'neutral'} size="sm" className="capitalize">
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            variant={user.status === 'active' ? 'low' : 'critical'}
                                            size="sm"
                                            dot
                                            className="capitalize"
                                        >
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-text-3">
                                        {new Date(user.lastActive).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            variant="tertiary"
                                            size="sm"
                                            onClick={() => handleStatusToggle(user.id)}
                                            className={user.status === 'active' ? "text-danger hover:bg-danger/10" : "text-success hover:bg-success/10"}
                                        >
                                            {user.status === 'active' ? 'Lock Account' : 'Unlock Account'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-text-3">
                        No users found matching "{searchTerm}"
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
