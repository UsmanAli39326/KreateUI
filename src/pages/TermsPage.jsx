import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-bg-1 text-text-1">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-12">
                    <div className="size-16 bg-accent-1/10 text-accent-1 rounded-2xl flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl">gavel</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 tracking-tight">Terms and Services</h1>
                    <p className="text-text-3 text-lg leading-relaxed">By using the AI Driven Website UI Enhancement platform, you agree to the following terms and conditions.</p>
                </header>

                <div className="prose prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b border-border-1 pb-2">Usage Terms</h2>
                        <ul className="space-y-4 list-disc pl-5 text-text-2">
                            <li>Users must provide accurate and lawful information.</li>
                            <li>Uploaded websites or designs must be owned by or authorized for use by the user.</li>
                            <li>The platform may not be used for malicious or illegal activities.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b border-border-1 pb-2">Intellectual Property</h2>
                        <p className="text-text-2 leading-relaxed mb-4">
                            All AI-generated recommendations remain the property of the user. Platform branding, system architecture, and proprietary AI logic remain the intellectual property of the project owners.
                        </p>
                    </section>

                    <section className="bg-danger/5 border border-danger/20 p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-danger flex items-center gap-3">
                            <span className="material-symbols-outlined">warning</span>
                            Limitation of Liability
                        </h2>
                        <p className="text-text-2 leading-relaxed">
                            The platform provides recommendations as guidance. Final implementation decisions and responsibility remain with the user.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 border-b border-border-1 pb-2">Modifications</h2>
                        <p className="text-text-2 leading-relaxed">
                            Terms may be updated periodically. Continued use of the platform implies acceptance of updated terms.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
