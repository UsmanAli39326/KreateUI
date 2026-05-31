import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Common/Button";
import Input from "@/components/AuthPages/AuthCard"; // Using Input-like structure from AuthCard if possible, or standard.
// Actually, let's use the standard Input component if available

export default function SubmitTemplatePage() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="max-w-3xl mx-auto px-6 py-20 text-center text-text-1">
                <div className="size-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">Submission Received!</h2>
                <p className="text-text-2 mb-8 text-lg">
                    Your template has been sent to our moderation team.
                    You'll receive an email notification once it's been reviewed.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button variant="primary" onClick={() => navigate("/marketplace")}>Back to Marketplace</Button>
                    <Button variant="secondary" onClick={() => setSuccess(false)}>Submit Another</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-text-1">
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-text-3 hover:text-accent-1 transition-colors mb-8">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Marketplace
            </Link>

            <div className="mb-10">
                <h1 className="text-4xl font-black mb-2">Submit Your Template</h1>
                <p className="text-text-2 text-lg">Share your high-performance, accessible designs with the community.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-surface-1 border border-border-1 p-8 rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Template Name</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Modern SaaS Starter"
                            className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Category</label>
                        <select className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all">
                            <option>SaaS Landing</option>
                            <option>E-commerce</option>
                            <option>Portfolio</option>
                            <option>Dashboard</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Primary Framework</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Next.js, React, Astro"
                            className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Preview URL</label>
                        <input
                            type="url"
                            placeholder="https://your-demo.com"
                            className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Brief Description</label>
                    <textarea
                        required
                        rows="4"
                        placeholder="Explain the unique features and accessibility optimizations..."
                        className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all resize-none"
                    />
                </div>

                <div className="p-6 border-2 border-dashed border-border-1 rounded-xl bg-bg-0 flex flex-col items-center justify-center text-center group hover:border-accent-1 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-4xl text-text-3 group-hover:text-accent-1 mb-2">upload_file</span>
                    <p className="text-sm font-bold text-text-2">Click to upload assets or drag and drop</p>
                    <p className="text-xs text-text-3 mt-1">ZIP, TAR files (Max 50MB)</p>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isDisabled={submitting}
                        icon={submitting ? <span className="material-symbols-outlined animate-spin">refresh</span> : null}
                    >
                        {submitting ? "Submitting..." : "Submit for Moderation"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
