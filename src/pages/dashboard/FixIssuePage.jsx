import React, { useState } from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Toggle from "@/components/Common/Toggle";
import Button from "@/components/Common/Button";
import suggestionsData from "@/assets/api/aiSuggestions.json";

export default function FixIssuePage() {
    const [suggestions, setSuggestions] = useState(suggestionsData.suggestions);
    const [activeDevice, setActiveDevice] = useState("desktop");

    const toggleSuggestion = (catIndex, itemIndex) => {
        const newSuggestions = [...suggestions];
        newSuggestions[catIndex].items[itemIndex].applied = !newSuggestions[catIndex].items[itemIndex].applied;
        setSuggestions(newSuggestions);
    };

    const appliedCount = suggestions.reduce((acc, cat) =>
        acc + cat.items.filter(i => i.applied).length, 0
    );

    return (
        <DashboardShell active="analyze" fullWidth={true}>
            <div className="flex h-[calc(100vh-3.5rem)] lg:h-screen overflow-hidden">

                {/* Left Sidebar: AI Recommendations */}
                <aside className="w-[30%] min-w-[320px] border-r border-border-1 flex flex-col bg-surface-2 overflow-y-auto">
                    <div className="p-4 border-b border-border-1 flex justify-between items-center bg-bg-1/50 sticky top-0 z-10 backdrop-blur-md">
                        <div>
                            <h1 className="text-text-1 text-base font-bold">AI Suggestions</h1>
                            <p className="text-text-3 text-xs">{suggestionsData.projectInfo.metrics.improvements} improvements identified</p>
                        </div>
                        <button className="p-2 hover:bg-surface-3 rounded-lg transition-colors text-text-3 hover:text-text-1">
                            <span className="material-symbols-outlined">refresh</span>
                        </button>
                    </div>

                    <div className="flex-1 pb-20">
                        {suggestions.map((category, catIndex) => (
                            <div key={category.category} className="px-4 py-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-accent-1 text-sm">{category.icon}</span>
                                    <h3 className="text-text-1 text-sm font-bold uppercase tracking-wider">{category.category}</h3>
                                </div>
                                <div className="space-y-3">
                                    {category.items.map((item, itemIndex) => (
                                        <div
                                            key={item.id}
                                            className={`flex flex-col gap-3 rounded-lg border p-4 transition-all ${item.severity === 'Critical'
                                                    ? 'border-danger/50 bg-danger/5'
                                                    : 'border-border-2 bg-bg-1'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="text-text-1 text-sm font-bold">{item.title}</p>
                                                        {item.severity === 'Critical' && (
                                                            <span className="text-[10px] bg-danger/20 text-danger px-1.5 rounded uppercase font-bold tracking-tight">Critical</span>
                                                        )}
                                                    </div>
                                                    <p className="text-text-3 text-xs">{item.description}</p>
                                                </div>
                                                <Toggle
                                                    id={`toggle-${item.id}`}
                                                    checked={item.applied}
                                                    onChange={() => toggleSuggestion(catIndex, itemIndex)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto p-4 bg-surface-2 border-t border-border-1 sticky bottom-0 z-10">
                        <button className="w-full flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-surface-1 hover:bg-surface-3 text-text-1 text-sm font-bold transition-all border border-border-1">
                            <span className="truncate">Rescan Site</span>
                        </button>
                    </div>
                </aside>

                {/* Right Side: Live Preview */}
                <section className="flex-1 bg-[#0b0813] p-8 flex flex-col relative overflow-hidden">
                    {/* Preview Controls */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-surface-2 p-1 rounded-lg border border-border-1">
                            {['desktop_windows', 'tablet', 'smartphone'].map((icon) => (
                                <button
                                    key={icon}
                                    onClick={() => setActiveDevice(icon === 'desktop_windows' ? 'desktop' : icon)}
                                    className={`p-1.5 px-3 rounded shadow-sm flex items-center gap-2 text-xs font-medium transition-colors ${(activeDevice === 'desktop' && icon === 'desktop_windows') || activeDevice === icon
                                            ? 'bg-accent-1 text-white'
                                            : 'text-text-3 hover:text-text-1'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-sm">{icon}</span>
                                    {icon === 'desktop_windows' ? 'Desktop' : icon === 'tablet' ? 'Tablet' : 'Mobile'}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-text-3">{suggestionsData.projectInfo.url}</span>
                            <button className="material-symbols-outlined text-text-3 hover:text-text-1 text-lg transition-colors">open_in_new</button>
                        </div>
                    </div>

                    {/* Virtual Browser Shell */}
                    <div className={`flex-1 bg-white rounded-xl overflow-hidden border border-border-1 shadow-2xl relative flex flex-col transition-all duration-300 ${activeDevice === 'mobile' ? 'max-w-[375px] mx-auto' : activeDevice === 'tablet' ? 'max-w-[768px] mx-auto' : 'w-full'
                        }`}>
                        {/* Browser Header */}
                        <div className="h-10 bg-[#f1f1f4] border-b border-[#e2e2e7] flex items-center px-4 gap-4 shrink-0">
                            <div className="flex gap-1.5">
                                <div className="size-2.5 bg-red-400 rounded-full"></div>
                                <div className="size-2.5 bg-yellow-400 rounded-full"></div>
                                <div className="size-2.5 bg-green-400 rounded-full"></div>
                            </div>
                            <div className="bg-white px-3 py-1 rounded border border-[#e2e2e7] flex-1 max-w-md mx-auto text-[10px] text-gray-400 text-center">
                                {suggestionsData.projectInfo.url.replace("https://", "")}
                            </div>
                        </div>

                        {/* Live Content Mockup */}
                        <div className="flex-1 overflow-y-auto bg-white p-12 text-slate-900">
                            <div className="max-w-3xl mx-auto">
                                <div className="h-8 w-24 bg-indigo-500/10 rounded mb-12 border border-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-600 tracking-widest uppercase">
                                    Acme Corp
                                </div>

                                <div className="relative group">
                                    <h1 className="text-6xl font-extrabold tracking-tight mb-6 leading-[1.2] relative">
                                        Build better products, <span className="text-indigo-600 italic">faster than ever.</span>
                                        <div className="absolute -inset-2 border-2 border-dashed border-indigo-500 rounded-lg opacity-40 pointer-events-none"></div>
                                        <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded font-bold shadow-lg">
                                            Suggestion #2 Applied
                                        </div>
                                    </h1>
                                </div>

                                <p className="text-xl text-gray-500 mb-8 leading-[1.5]">
                                    Streamline your development workflow with AI-driven components and real-time collaboration.
                                </p>

                                <div className="flex gap-4 mb-20">
                                    <div className="h-12 w-40 bg-slate-900 rounded-lg"></div>
                                    <div className="h-12 w-40 border border-gray-200 rounded-lg"></div>
                                </div>

                                <div className="grid grid-cols-3 gap-8">
                                    {[
                                        { icon: 'bolt', title: 'Fast Performance', desc: 'Optimized delivery.' },
                                        { icon: 'security', title: 'Enterprise Security', desc: 'SOC2 Compliant.' },
                                        { icon: 'hub', title: 'Seamless Sync', desc: 'Connect tools.' }
                                    ].map((feat, i) => (
                                        <div key={i} className="space-y-4">
                                            <div className="size-10 bg-indigo-500/5 rounded-lg border border-indigo-500/10 flex items-center justify-center text-indigo-600">
                                                <span className="material-symbols-outlined">{feat.icon}</span>
                                            </div>
                                            <h3 className="font-bold text-slate-900">{feat.title}</h3>
                                            <p className="text-sm text-gray-400">{feat.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Action Bar */}
                    <div className="absolute bottom-12 right-12 flex gap-4">
                        <button className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 border border-border-1 bg-surface-1 text-white text-sm font-bold hover:bg-surface-2 transition-all shadow-xl">
                            <span className="material-symbols-outlined text-sm mr-2">download</span>
                            Export CSS
                        </button>
                        <Button
                            variant="primary"
                            size="lg"
                            className="min-w-[180px] shadow-lg shadow-accent-1/20"
                        >
                            Apply {appliedCount} Changes
                        </Button>
                    </div>
                </section>
            </div>
        </DashboardShell>
    );
}
