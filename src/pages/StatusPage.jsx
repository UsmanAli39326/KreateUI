import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StatusPage() {
    const services = [
        { name: "User Authentication", status: "Operational", active: true },
        { name: "Website Analysis Engine", status: "Operational", active: true },
        { name: "AI Recommendation Engine", status: "Operational", active: true },
        { name: "WCAG Compliance Checker", status: "Operational", active: true },
        { name: "Design Marketplace", status: "Operational", active: true },
        { name: "Report Generation", status: "Operational", active: true },
    ];

    return (
        <div className="min-h-screen bg-bg-1 text-text-1">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-12">
                    <div className="size-16 bg-success/10 text-success rounded-2xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl">signal_cellular_alt</span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-5xl font-black mb-2 tracking-tight">System Status</h1>
                            <p className="text-text-3 text-lg">Real-time updates on the operational status of our platform.</p>
                        </div>
                        <div className="bg-success/10 text-success px-6 py-3 rounded-xl border border-success/20 font-bold flex items-center gap-2">
                            <span className="size-2 bg-success rounded-full animate-pulse"></span>
                            All Systems Operational
                        </div>
                    </div>
                </header>

                <div className="space-y-4 mb-16">
                    <h3 className="text-sm font-bold text-text-3 uppercase tracking-widest px-4">Current Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-surface-1 border border-border-1 p-6 rounded-2xl flex items-center justify-between hover:border-accent-1/50 transition-all group">
                                <span className="font-bold text-text-1">{service.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-success">check_circle</span>
                                    <span className="text-sm font-bold text-success">{service.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-surface-1 border border-border-1 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4">Maintenance & Downtime</h2>
                    <div className="space-y-4">
                        <p className="text-text-2 leading-relaxed">
                            Scheduled maintenance activities will be announced in advance. During maintenance windows, some features may be temporarily unavailable.
                        </p>
                        <p className="text-text-2 leading-relaxed">
                            For unexpected outages, updates will be posted here until services are fully restored.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
