import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-bg-1 text-text-1">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-12">
                    <div className="size-16 bg-accent-1/10 text-accent-1 rounded-2xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl">lock</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-text-3 text-lg leading-relaxed">At AI Driven Website UI Enhancement, we respect your privacy and are committed to protecting your personal and project-related information.</p>
                </header>

                <div className="prose prose-invert max-w-none space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b border-border-1 pb-2">Information We Collect</h2>
                        <ul className="space-y-3 list-disc pl-5 text-text-2">
                            <li>Personal information such as name, email address, and login credentials</li>
                            <li>Website URLs or uploaded HTML files submitted for analysis</li>
                            <li>Usage data including analysis results, reports, and interaction logs</li>
                            <li>Marketplace activity such as uploaded or downloaded design templates</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b border-border-1 pb-2">How We Use Your Information</h2>
                        <ul className="space-y-3 list-disc pl-5 text-text-2">
                            <li>Authenticate users and manage accounts securely</li>
                            <li>Analyze website UI and accessibility issues</li>
                            <li>Generate AI-based recommendations and reports</li>
                            <li>Improve system accuracy through feedback and learning</li>
                            <li>Maintain system logs for compliance and performance monitoring</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b border-border-1 pb-2">Data Protection</h2>
                        <p className="text-text-2 leading-relaxed">
                            All sensitive data is encrypted using secure protocols (SSL/TLS). We do not sell or share personal data with third parties except where required by law.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b border-border-1 pb-2">Compliance</h2>
                        <p className="text-text-2 leading-relaxed">
                            Our system complies with international accessibility standards (WCAG 2.1) and applicable data protection regulations including GDPR principles.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
