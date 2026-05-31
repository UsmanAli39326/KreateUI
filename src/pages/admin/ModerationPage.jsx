import React, { useState } from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import PageHeader from "@/components/Dashboard/PageHeader";
import Badge from "@/components/Common/Badge";
import Button from "@/components/Common/Button";
import mockAdminData from "@/assets/api/mockAdminData.json";

export default function ModerationPage() {
    const [submissions, setSubmissions] = useState(mockAdminData.submissions);

    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Admin", href: "#" },
        { label: "Moderation Queue" },
    ];

    const handleAction = (id, action) => {
        // In a real app, this would call an API
        console.log(`Submission ${id} ${action}`);

        // Remove from list for demo
        setSubmissions(submissions.filter(sub => sub.id !== id));
    };

    return (
        <DashboardShell active="admin-moderation">
            <Breadcrumbs items={breadcrumbs} />
            <PageHeader
                title="Moderation Queue"
                subtitle="Review and approve user-submitted templates."
            />

            {submissions.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-surface-1 border border-border-1 rounded-xl text-center">
                    <div className="size-16 bg-success/10 text-success rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl">check</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-1 mb-2">All Caught Up!</h3>
                    <p className="text-text-3">There are no pending submissions to review.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {submissions.map(sub => (
                        <div key={sub.id} className="bg-surface-1 border border-border-1 rounded-xl p-6 flex flex-col md:flex-row gap-6">
                            {/* Preview Thumbnail */}
                            <div className="w-full md:w-64 h-40 bg-bg-0 rounded-lg overflow-hidden shrink-0 border border-border-1 relative group">
                                <img src={sub.previewUrl} alt={sub.templateName} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button variant="secondary" size="sm">View Preview</Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-text-1">{sub.templateName}</h3>
                                                <Badge variant="medium" size="sm" className="uppercase text-[10px]">Pending Review</Badge>
                                            </div>
                                            <p className="text-sm text-text-3">
                                                Submitted by <span className="text-text-1 font-medium">{sub.author}</span> • {new Date(sub.submittedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge variant="neutral" size="sm">{sub.category}</Badge>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3 pt-6 border-t border-border-1">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => handleAction(sub.id, 'approved')}
                                        icon={<span className="material-symbols-outlined">check</span>}
                                    >
                                        Approve & Publish
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleAction(sub.id, 'rejected')}
                                        icon={<span className="material-symbols-outlined">close</span>}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </DashboardShell>
    );
}
