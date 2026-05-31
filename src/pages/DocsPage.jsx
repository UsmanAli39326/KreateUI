import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DocsPage() {
    const sections = [
        "Platform overview and architecture",
        "Step-by-step usage guides",
        "Website analysis workflow",
        "WCAG compliance explanation",
        "API and JavaScript library integration",
        "Browser extension usage",
        "Report generation and export",
        "Marketplace usage guidelines"
    ];

    return (
        <div className="min-h-screen bg-bg-1 text-text-1">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-12">
                    <div className="size-16 bg-accent-1/10 text-accent-1 rounded-2xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl">menu_book</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 tracking-tight">Documentation</h1>
                    <p className="text-text-3 text-lg leading-relaxed">Welcome to the official documentation for AI Driven Website UI Enhancement. This section helps developers, designers, and users understand how to use and integrate the system effectively.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent-1">explore</span>
                                What You’ll Find Here
                            </h2>
                            <ul className="space-y-4">
                                {sections.map((section, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-text-2 hover:translate-x-2 transition-transform cursor-default">
                                        <span className="size-1.5 bg-accent-1 rounded-full"></span>
                                        {section}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="bg-surface-1 border border-border-1 p-10 rounded-3xl flex flex-col justify-center items-center text-center">
                        <div className="size-20 bg-bg-2 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-4xl text-text-3">construction</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Detailed Docs Incoming</h3>
                        <p className="text-text-3 mb-8">We're currently expanding our knowledge base with in-depth technical references and tutorials.</p>
                        <button className="bg-accent-1 hover:bg-accent-hover text-white px-8 py-3 rounded-xl font-bold transition-all">
                            Request Specific Guide
                        </button>
                    </div>
                </div>

                <div className="mt-20 p-8 border border-border-1 rounded-3xl bg-surface-1 flex items-center gap-6">
                    <div className="size-14 bg-accent-1/10 text-accent-1 rounded-xl flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">lightbulb</span>
                    </div>
                    <p className="text-text-2">
                        The documentation is designed to support both technical and non-technical users. Our goal is to make web accessibility intuitive and automated.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
