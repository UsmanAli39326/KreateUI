import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FeaturesPage() {
    const features = [
        {
            title: "Automated UI Analysis",
            desc: "Detects accessibility and usability issues such as low contrast, poor spacing, and unreadable fonts.",
            icon: "troubleshoot"
        },
        {
            title: "AI-Powered Recommendations",
            desc: "Generates context-aware design improvements while preserving layout integrity.",
            icon: "auto_awesome"
        },
        {
            title: "Real-Time Preview",
            desc: "Allows users to preview suggested UI enhancements before applying them.",
            icon: "visibility"
        },
        {
            title: "WCAG 2.1 Compliance Checking",
            desc: "Ensures websites meet international accessibility standards.",
            icon: "fact_check"
        },
        {
            title: "Multi-Platform Support",
            desc: "Available as a web application, browser extension, and JavaScript library.",
            icon: "devices"
        },
        {
            title: "Design Marketplace",
            desc: "Share, download, or purchase AI-validated UI templates.",
            icon: "shopping_bag"
        },
        {
            title: "Report Generation",
            desc: "Export detailed analysis and compliance reports in PDF or HTML format.",
            icon: "assessment"
        }
    ];

    return (
        <div className="min-h-screen bg-bg-1 text-text-1">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-20">
                <header className="mb-20 text-center max-w-3xl mx-auto">
                    <div className="inline-flex size-16 bg-accent-1/10 text-accent-1 rounded-2xl items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl">star</span>
                    </div>
                    <h1 className="text-6xl font-black mb-6 tracking-tight">Platform Features</h1>
                    <p className="text-text-3 text-xl leading-relaxed">
                        AI Driven Website UI Enhancement offers an intelligent and automated approach to improving website usability and accessibility.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-surface-1 border border-border-1 p-10 rounded-[2.5rem] hover:border-accent-1 transition-all group hover:shadow-2xl hover:shadow-accent-1/10">
                            <div className="size-14 bg-bg-2 text-text-1 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent-1 group-hover:text-white transition-all">
                                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-text-3 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center pb-12">
                    <h2 className="text-3xl font-bold mb-10">Ready to transform your UI?</h2>
                    <button className="bg-accent-1 hover:bg-accent-hover text-white px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-accent-1/25 hover:-translate-y-1">
                        Start Free Analysis
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
