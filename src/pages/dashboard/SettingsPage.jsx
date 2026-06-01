import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import userService from "../../services/userService";
import { clearTokens } from "../../services/apiService";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState({ name: "", email: "" });
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userService.getProfile()
            .then(res => {
                if (res.data) setProfile({ name: res.data.name || "", email: res.data.email || "" });
            })
            .catch(err => console.error("Failed to load profile", err));
    }, []);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            await userService.updateProfile({ name: profile.name });
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        const pwd = prompt("Please enter your password to confirm account deletion:");
        if (!pwd) return;
        try {
            await userService.deleteAccount(pwd);
            clearTokens();
            navigate("/auth");
        } catch (err) {
            alert(err?.error || "Failed to delete account");
        }
    };

    const scrollToSection = (id) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: "person" },
        { id: "api", label: "API Keys", icon: "vpn_key" },
        { id: "integrations", label: "Integrations", icon: "extension" }, // "group" in HTML but extension fits better for generalized
        { id: "danger", label: "Danger Zone", icon: "warning", className: "text-danger hover:text-danger/80" }, // specific styling
    ];

    return (
        <DashboardShell active="settings">
            {/* Page Header */}
            <header className="border-b border-border-1 pb-8 mb-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-black tracking-tight text-text-1 mb-2">Platform Settings</h2>
                    <p className="text-text-2">Configure your environment, manage API credentials, and connect your workflow tools.</p>
                </div>
            </header>

            <div className="max-w-5xl mx-auto pb-24">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Inner Sidebar Navigation */}
                    <nav className="w-full md:w-56 flex flex-col gap-1 shrink-0 top-6 h-fit md:sticky">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => scrollToSection(tab.id)}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left relative ${activeTab === tab.id
                                        ? "bg-surface-1 text-text-1 shadow-sm"
                                        : "text-text-2 hover:bg-surface-2 hover:text-text-1"
                                    } ${tab.className || ""}`}
                            >
                                {activeTab === tab.id && (
                                    <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-accent-1 rounded-full"></div>
                                )}
                                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                                <span className="text-sm">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Content Sections */}
                    <div className="flex-1 space-y-12">

                        {/* Profile Section */}
                        <section id="profile" className="space-y-6 scroll-mt-6">
                            <div>
                                <h3 className="text-xl font-bold text-text-1">Profile Information</h3>
                                <p className="text-text-3 text-sm mt-1">Update your personal details and account preferences.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border border-border-1 bg-surface-1">
                                <div className="col-span-full flex items-center gap-6 pb-4 border-b border-border-1">
                                    <div
                                        className="size-20 rounded-xl bg-cover bg-center border-2 border-accent-1/40 relative group cursor-pointer bg-bg-2"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdwcTSa2fyJdubvyerrPf13PS7AdWCOUQmdJbxiApisNxsDjCWOrjPYN7O4-Ad8tm-84lqM8nA5pW_tRZ0Une5bpKACgB0dttB8w2LVJTQHqPqlnO6q2lMzqflbbPyCPcdn14t_EtAq9IW_DozkJlFTBgXBbLhZVS5dMYyQDDawvnZGzhbwG2r0kKduWVPCPTMBu0n2Ctsg5Yjn6fQrGm9UQ3bBcuGNPqraXVaKQla1ot1CQGuhRxf4TJHnUJtb643QsKJ4ZGNr_I3")' }}
                                    >
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                                            <span className="material-symbols-outlined text-white">photo_camera</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button variant="secondary" size="sm">Change Photo</Button>
                                        <p className="text-text-3 text-[11px]">JPG, GIF or PNG. Max size 2MB.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Input id="full-name" label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Input id="email" label="Email Address" type="email" value={profile.email} readOnly />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button variant="primary" onClick={handleSaveProfile} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </section>

                        {/* API Keys Section */}
                        <section id="api" className="space-y-6 scroll-mt-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-xl font-bold text-text-1">API Keys</h3>
                                    <p className="text-text-3 text-sm mt-1">Use these keys to authenticate your requests to our SDK.</p>
                                </div>
                                <Button variant="secondary" icon={<span className="material-symbols-outlined text-lg">add</span>}>
                                    Generate New Key
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-6 rounded-xl border border-border-1 bg-surface-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-text-1">Production Key</span>
                                            <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider">Active</span>
                                        </div>
                                        <span className="text-text-3 text-xs italic">Last used 2 hours ago</span>
                                    </div>
                                    <div className="relative group">
                                        <div className="bg-bg-1 border border-border-1 rounded-lg p-4 font-mono text-sm flex items-center justify-between overflow-hidden text-text-2">
                                            <span className="text-accent-1 mr-4 select-none">sk_live_</span>
                                            <span className="flex-1 blur-sm group-hover:blur-none transition-all">49a2b8e7c1d0f5g6h7i8j9k0l1m2n3o4p5q6r7s8</span>
                                            <div className="flex items-center gap-2 ml-4">
                                                <button className="p-1.5 hover:bg-surface-2 rounded transition-colors text-text-3 hover:text-text-1" title="Show key">
                                                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                </button>
                                                <button className="p-1.5 hover:bg-surface-2 rounded transition-colors text-text-3 hover:text-text-1" title="Copy to clipboard">
                                                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SDK Snippet */}
                                <div className="p-6 rounded-xl border border-border-1 bg-[#0f0a1a]">
                                    <p className="text-xs font-bold text-text-3 uppercase tracking-widest mb-3">Quick Start (Node.js)</p>
                                    <div className="bg-bg-0/50 p-4 rounded-lg font-mono text-xs text-blue-300 leading-relaxed overflow-x-auto">
                                        <p><span className="text-purple-400">const</span> <span className="text-blue-400">uiEnhance</span> = <span className="text-purple-400">require</span>(<span className="text-orange-300">'@ui-enhancer/sdk'</span>);</p>
                                        <p><span className="text-purple-400">const</span> client = <span className="text-blue-400">uiEnhance</span>.<span className="text-yellow-400">init</span>({`{`}</p>
                                        <p className="pl-4">apiKey: <span className="text-orange-300">'sk_live_...'</span>,</p>
                                        <p className="pl-4">mode: <span className="text-orange-300">'auto-accessibility'</span></p>
                                        <p>{`});`}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Integrations Section */}
                        <section id="integrations" className="space-y-6 scroll-mt-6">
                            <div>
                                <h3 className="text-xl font-bold text-text-1">Integrations</h3>
                                <p className="text-text-3 text-sm mt-1">Connect your existing development tools to sync data and automate updates.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* GitHub */}
                                <IntegrationCard
                                    icon={<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"></path></svg>}
                                    name="GitHub"
                                    desc="Automate UI reviews on pull requests."
                                    status="CONNECTED"
                                    statusColor="bg-success/10 text-success"
                                    btnText="Configure"
                                />
                                {/* Vercel */}
                                <IntegrationCard
                                    icon={<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M12 1L24 22H0L12 1Z"></path></svg>}
                                    name="Vercel"
                                    desc="Live preview enhancements for deployments."
                                    status="NOT LINKED"
                                    statusColor="bg-surface-2 text-text-3"
                                    btnText="Connect"
                                    btnVariant="accent"
                                />
                                {/* Slack */}
                                <IntegrationCard
                                    icon={<svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.263 0a2.527 2.527 0 0 1 2.523-2.52 2.528 2.528 0 0 1 2.523 2.52v6.313A2.528 2.528 0 0 1 8.828 24a2.528 2.528 0 0 1-2.523-2.522v-6.313zM8.828 5.042a2.528 2.528 0 0 1-2.523-2.52A2.528 2.528 0 0 1 8.828 0a2.528 2.528 0 0 1 2.523 2.522v2.52H8.828zm0 1.263a2.528 2.528 0 0 1 2.523 2.523 2.528 2.528 0 0 1-2.523 2.523H2.515A2.528 2.528 0 0 1 0 8.828a2.528 2.528 0 0 1 2.522-2.523h6.306zm10.13 0a2.527 2.527 0 0 1 2.522-2.52A2.528 2.528 0 0 1 24 6.305a2.528 2.528 0 0 1-2.522 2.523h-2.52V6.305zm-1.263 0a2.528 2.528 0 0 1-2.523 2.523 2.528 2.528 0 0 1-2.523-2.523V0c1.393 0 2.523 1.13 2.523 2.522v3.783zm-3.783 10.13a2.528 2.528 0 0 1 2.523 2.522 2.528 2.528 0 0 1-2.523 2.523h-6.305A2.528 2.528 0 0 1 6.305 18.96a2.528 2.528 0 0 1 2.523-2.522h6.306zm0-1.263a2.528 2.528 0 0 1-2.523-2.523 2.528 2.528 0 0 1 2.523-2.523h3.783A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.313z"></path></svg>}
                                    name="Slack"
                                    desc="Get real-time accessibility score alerts."
                                    status="CONNECTED"
                                    statusColor="bg-success/10 text-success"
                                    btnText="Configure"
                                />
                            </div>
                        </section>

                        {/* Danger Zone */}
                        <section id="danger" className="pt-12 border-t border-border-1 space-y-4">
                            <h3 className="text-xl font-bold text-danger">Danger Zone</h3>
                            <div className="p-6 rounded-xl border border-danger/30 bg-danger/5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-text-1">Delete Account</p>
                                    <p className="text-xs text-text-3 mt-1">Permanently remove your account and all projects. This cannot be undone.</p>
                                </div>
                                <Button variant="tertiary" className="text-danger border border-danger/50 hover:bg-danger/10" onClick={handleDeleteAccount}>Delete Account</Button>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}

function IntegrationCard({ icon, name, desc, status, statusColor, btnText, btnVariant }) {
    return (
        <div className="p-5 rounded-xl border border-border-1 bg-surface-1 hover:bg-surface-2 transition-all flex flex-col justify-between min-h-48 group">
            <div className="flex justify-between items-start">
                <div className="size-10 rounded-lg bg-bg-2 flex items-center justify-center text-text-1">
                    {icon}
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${statusColor}`}>{status}</span>
            </div>
            <div>
                <h4 className="font-bold text-sm text-text-1">{name}</h4>
                <p className="text-xs text-text-3 mt-1">{desc}</p>
            </div>
            <button className={`w-full mt-4 py-2 text-xs font-bold rounded-lg transition-colors ${btnVariant === 'accent'
                    ? 'bg-accent-1/20 hover:bg-accent-1/30 text-accent-1 border border-accent-1/20'
                    : 'bg-bg-0 hover:bg-bg-2 text-text-1'
                }`}>
                {btnText}
            </button>
        </div>
    );
}
