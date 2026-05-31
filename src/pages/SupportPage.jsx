import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SupportPage() {
    const supportOptions = [
        { title: "Email Support", desc: "Contact us for technical or account-related issues", icon: "mail" },
        { title: "Documentation", desc: "Step-by-step guides and FAQs", icon: "menu_book" },
        { title: "Troubleshooting", desc: "Common issues and solutions", icon: "build" },
        { title: "Feedback & Suggestions", desc: "Help us improve the platform", icon: "thumbs_up_down" },
    ];

    return (
        <div className="min-h-screen bg-bg-1 text-text-1">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-20 text-center">
                    <div className="inline-flex size-16 bg-accent-1/10 text-accent-1 rounded-2xl items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl">help_center</span>
                    </div>
                    <h1 className="text-5xl font-black mb-4 tracking-tight">Support & Help Center</h1>
                    <p className="text-text-3 text-lg max-w-2xl mx-auto">We’re here to help you get the most out of AI Driven Website UI Enhancement.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {supportOptions.map((option, idx) => (
                        <div key={idx} className="bg-surface-1 border border-border-1 p-8 rounded-3xl hover:border-accent-1 transition-all group flex items-start gap-6">
                            <div className="size-12 bg-bg-2 text-accent-1 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent-1 group-hover:text-white transition-all">
                                <span className="material-symbols-outlined">{option.icon}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-text-1">{option.title}</h3>
                                <p className="text-text-3 text-sm leading-relaxed">{option.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-surface-1 border border-border-1 p-10 rounded-[3rem] text-center">
                    <div className="size-20 bg-accent-1/10 text-accent-1 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="material-symbols-outlined text-4xl">schedule</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Response Time</h2>
                    <p className="text-text-2 text-lg mb-10">Support requests are typically addressed within <span className="text-accent-1 font-bold">24–48 business hours</span>.</p>
                    <button className="bg-text-1 text-bg-1 hover:bg-white px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl">
                        Open Support Ticket
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
