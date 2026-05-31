import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-bg-1 text-text-1">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-12">
                    <div className="size-16 bg-accent-1/10 text-accent-1 rounded-2xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 tracking-tight">Security Overview</h1>
                    <p className="text-text-3 text-lg leading-relaxed">Security is a core component of the AI Driven Website UI Enhancement platform. We implement industry-standard safeguards to ensure the integrity, confidentiality, and availability of data.</p>
                </header>

                <div className="prose prose-invert max-w-none space-y-10">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b border-border-1 pb-2">Key Security Measures</h2>
                        <ul className="space-y-4 list-none p-0 text-text-2">
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-accent-1 mt-1">verified_user</span>
                                <span>Secure authentication and role-based access control</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-accent-1 mt-1">https</span>
                                <span>Encrypted data transmission using HTTPS</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-accent-1 mt-1">password</span>
                                <span>Secure password storage using hashing mechanisms</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-accent-1 mt-1">health_and_safety</span>
                                <span>Input sanitization to prevent XSS and injection attacks</span>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-accent-1 mt-1">storage</span>
                                <span>Regular backups and system monitoring</span>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-surface-1 border border-border-1 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-4">Administrative Controls</h2>
                        <p className="text-text-2 leading-relaxed">
                            Only authorized administrators can access system logs, compliance reports, and user management features. All administrative actions are logged for auditing purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b border-border-1 pb-2">Responsible Use</h2>
                        <p className="text-text-2 leading-relaxed">
                            Users are expected to upload only websites or content they have permission to analyze. Any misuse of the platform may result in account suspension.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
