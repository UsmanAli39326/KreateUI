import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Toggle from "@/components/Common/Toggle";
import Button from "@/components/Common/Button";
import { useToast } from "@/components/Common";
import mockSuggestionsData from "@/assets/api/aiSuggestions.json";
import auditService from "../../services/auditService";

export default function FixIssuePage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const url = searchParams.get("url") || mockSuggestionsData.projectInfo.url;
    const auditId = searchParams.get("auditId");
    const toast = useToast();

    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(!!auditId);
    const [isApplying, setIsApplying] = useState(false);
    const [activeDevice, setActiveDevice] = useState("desktop");
    const [previewHtml, setPreviewHtml] = useState(null);
    const [styleOverlay, setStyleOverlay] = useState({});
    const [appliedSuccessfully, setAppliedSuccessfully] = useState(false);

    // Debounce timer for auto-generating fixes when toggles change
    const generateDebounceRef = useRef(null);

    // ─── Load audit data ───────────────────────────────────────────────────────
    const loadAuditData = useCallback(async () => {
        if (!auditId || auditId === 'undefined' || auditId === 'null') {
            setSuggestions(mockSuggestionsData.suggestions);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const [recRes, auditRes] = await Promise.all([
                auditService.getRecommendations(auditId),
                auditService.getAudit(auditId),
            ]);

            const recs = recRes?.recommendations || recRes?.data?.recommendations || recRes?.data || [];

            if (auditRes?.fixedHtml) {
                setPreviewHtml(auditRes.fixedHtml);
            } else if (auditRes?.rawHtml) {
                setPreviewHtml(auditRes.rawHtml);
            }
            setStyleOverlay(auditRes?.styleOverlay || {});

            const groups = {};
            recs.forEach(rec => {
                const catName = String(rec.type || rec.category || "General");
                if (!groups[catName]) {
                    let icon = "build";
                    if (catName.toLowerCase().includes("access")) icon = "accessibility";
                    else if (catName.toLowerCase().includes("design")) icon = "brush";
                    else if (catName.toLowerCase().includes("perf")) icon = "speed";
                    else if (catName.toLowerCase().includes("seo")) icon = "travel_explore";
                    groups[catName] = { category: catName, icon, items: [] };
                }
                groups[catName].items.push({
                    _rawIssue: rec,
                    id: rec.id || rec.ruleId || Math.random().toString(),
                    ruleId: rec.ruleId,
                    title: rec.title || "Fix Issue",
                    description: rec.description || rec.suggestion || "",
                    severity: rec.severity || "Medium",
                    applied: false,
                });
            });

            if (Object.keys(groups).length === 0) {
                setSuggestions(mockSuggestionsData.suggestions);
            } else {
                setSuggestions(Object.values(groups));
            }
        } catch (err) {
            console.error("Failed to load recommendations", err);
            toast.error(err?.error || err?.message || "Failed to load recommendations.", "Error");
            setSuggestions(mockSuggestionsData.suggestions);
        } finally {
            setIsLoading(false);
        }
    }, [auditId, toast]);

    useEffect(() => {
        loadAuditData();
    }, [loadAuditData]);

    // ─── Toggle a suggestion ───────────────────────────────────────────────────
    const toggleSuggestion = (catIndex, itemIndex) => {
        setSuggestions(prev => {
            const next = prev.map((cat, ci) => ({
                ...cat,
                items: cat.items.map((item, ii) =>
                    ci === catIndex && ii === itemIndex
                        ? { ...item, applied: !item.applied }
                        : item
                ),
            }));

            // Auto-generate fixes for toggled-on items after a short debounce
            if (auditId && auditId !== 'undefined') {
                clearTimeout(generateDebounceRef.current);
                generateDebounceRef.current = setTimeout(() => {
                    const toggled = [];
                    next.forEach(cat => cat.items.forEach(item => {
                        if (item.applied) toggled.push(item._rawIssue);
                    }));
                    if (toggled.length > 0) {
                        autoGenerateFixes(toggled);
                    } else {
                        // All toggles off — revert to original rawHtml
                        auditService.getAudit(auditId).then(res => {
                            setPreviewHtml(res?.rawHtml || null);
                            setStyleOverlay({});
                        }).catch(() => {});
                    }
                }, 600);
            }

            return next;
        });
    };

    // ─── Auto-generate fixes (called on debounced toggle) ─────────────────────
    const autoGenerateFixes = async (issues) => {
        if (!auditId || auditId === 'undefined') return;
        try {
            const result = await auditService.generateFixes(auditId, issues);
            if (result?.fixedHtml) setPreviewHtml(result.fixedHtml);
            if (result?.styleOverlay) setStyleOverlay(prev => ({ ...prev, ...result.styleOverlay }));
        } catch (err) {
            // Silent — this is a live preview update, not a user-triggered action
            console.warn("[FixIssuePage] Auto-generate fixes failed:", err);
        }
    };

    // ─── Derived values ────────────────────────────────────────────────────────
    const appliedCount = suggestions.reduce((acc, cat) =>
        acc + cat.items.filter(i => i.applied).length, 0);

    const totalImprovements = suggestions.reduce((acc, cat) => acc + cat.items.length, 0);

    const selectedIssues = [];
    suggestions.forEach(cat => cat.items.forEach(item => {
        if (item.applied) selectedIssues.push(item);
    }));

    // ─── Build injected styles for iframe preview ─────────────────────────────
    const activeCssRules = [];
    suggestions.forEach(cat => {
        cat.items.forEach(item => {
            if (item.applied) {
                const issue = item._rawIssue;
                let selector = "";
                if (issue?.id) selector = `#${issue.id}`;
                else if (issue?.className) {
                    selector = `.${issue.className.trim().split(/\s+/).join('.')}`;
                    if (issue?.element) selector = `${issue.element}${selector}`;
                }

                if (selector && styleOverlay?.[selector]) {
                    const props = styleOverlay[selector];
                    const cssProps = Object.keys(props)
                        .map(k => `${k}: ${props[k]} !important;`)
                        .join(" ");
                    activeCssRules.push(`${selector} { ${cssProps} }`);
                } else if (selector) {
                    activeCssRules.push(
                        `${selector} { outline: 3px dashed #10b981 !important; outline-offset: 4px !important; background-color: rgba(16, 185, 129, 0.1) !important; transition: all 0.3s ease !important; }`
                    );
                }
            }
        });
    });

    const injectedStyles = activeCssRules.length > 0 ? `<style>${activeCssRules.join("\n")}</style>` : "";
    const iframeSrcDoc = previewHtml ? (previewHtml + injectedStyles) : null;

    // ─── Apply Changes (marks accepted in backend + saves state) ──────────────
    const handleApplyChanges = async () => {
        if (!auditId) {
            toast.success(`Applied ${appliedCount} mock changes!`, "Success (Demo)");
            setAppliedSuccessfully(true);
            return;
        }
        if (selectedIssues.length === 0) {
            toast.info("No changes selected to apply.");
            return;
        }

        setIsApplying(true);
        toast.info(`Saving ${selectedIssues.length} accepted fixes...`, "Applying");

        try {
            // 1. Generate fresh fixes to ensure styleOverlay is up-to-date
            const genResult = await auditService.generateFixes(
                auditId,
                selectedIssues.map(i => i._rawIssue)
            );
            if (genResult?.fixedHtml) setPreviewHtml(genResult.fixedHtml);
            if (genResult?.styleOverlay) setStyleOverlay(prev => ({ ...prev, ...genResult.styleOverlay }));

            // 2. Mark each selected suggestion as accepted in the backend
            await Promise.allSettled(
                selectedIssues.map(item =>
                    item.ruleId ? auditService.acceptSuggestion(auditId, item.ruleId) : Promise.resolve()
                )
            );

            setAppliedSuccessfully(true);
            toast.success(`${selectedIssues.length} fixes applied and saved!`, "Success");
        } catch (err) {
            console.error(err);
            toast.error(err?.error || "Failed to apply some changes.", "Error");
        } finally {
            setIsApplying(false);
        }
    };

    // ─── Export CSS ───────────────────────────────────────────────────────────
    const handleExportCss = () => {
        if (activeCssRules.length === 0) {
            toast.info("Toggle some fixes first to export their CSS.", "Nothing to export");
            return;
        }
        const header = `/* WebFixer — Generated CSS fixes\n * URL: ${url}\n * Generated: ${new Date().toLocaleString()}\n */\n\n`;
        const cssContent = header + activeCssRules.join("\n\n");
        const blob = new Blob([cssContent], { type: "text/css" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `webfixer-fixes-${Date.now()}.css`;
        link.click();
        URL.revokeObjectURL(link.href);
        toast.success("CSS file downloaded!", "Export");
    };

    // ─── Rescan site ─────────────────────────────────────────────────────────
    const handleRescan = async () => {
        if (!url) return;
        toast.info("Starting rescan...", "Scanning");
        try {
            const result = await auditService.startAudit(url, true);
            const newAuditId = result?.id || result?.auditId;
            if (newAuditId) {
                navigate(`/dashboard/fix?url=${encodeURIComponent(url)}&auditId=${newAuditId}`);
                toast.success("Rescan complete! Loading new results...", "Done");
            }
        } catch (err) {
            toast.error(err?.error || "Rescan failed.", "Error");
        }
    };

    // ─── Render ────────────────────────────────────────────────────────────────
    return (
        <DashboardShell active="analyze" fullWidth={true}>
            <div className="flex h-[calc(100vh-3.5rem)] lg:h-screen overflow-hidden">

                {/* Left Sidebar: AI Recommendations */}
                <aside className="w-[30%] min-w-[320px] border-r border-border-1 flex flex-col bg-surface-2 overflow-y-auto">
                    <div className="p-4 border-b border-border-1 flex justify-between items-center bg-bg-1/50 sticky top-0 z-10 backdrop-blur-md">
                        <div>
                            <h1 className="text-text-1 text-base font-bold">AI Suggestions</h1>
                            <p className="text-text-3 text-xs">
                                {appliedCount > 0
                                    ? <span className="text-accent-1 font-semibold">{appliedCount} selected</span>
                                    : null
                                }
                                {appliedCount > 0 ? " · " : ""}
                                {totalImprovements} improvements identified
                            </p>
                        </div>
                        <button
                            className="p-2 hover:bg-surface-3 rounded-lg transition-colors text-text-3 hover:text-text-1"
                            onClick={loadAuditData}
                            title="Refresh suggestions"
                        >
                            <span className="material-symbols-outlined">refresh</span>
                        </button>
                    </div>

                    <div className="flex-1 pb-20">
                        {isLoading ? (
                            <div className="space-y-4 p-4 animate-pulse">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-24 bg-surface-1 rounded-lg border border-border-1" />
                                ))}
                            </div>
                        ) : suggestions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-2 text-text-3">
                                <span className="material-symbols-outlined text-3xl opacity-40">check_circle</span>
                                <p className="text-sm">No suggestions found.</p>
                            </div>
                        ) : (
                            suggestions.map((category, catIndex) => (
                                <div key={category.category} className="px-4 py-3">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-accent-1 text-sm">{category.icon}</span>
                                        <h3 className="text-text-1 text-sm font-bold uppercase tracking-wider">{category.category}</h3>
                                        <span className="ml-auto text-xs text-text-3">
                                            {category.items.filter(i => i.applied).length}/{category.items.length}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {category.items.map((item, itemIndex) => (
                                            <div
                                                key={item.id}
                                                className={`flex flex-col gap-3 rounded-lg border p-4 transition-all duration-200 cursor-pointer ${
                                                    item.applied
                                                        ? 'border-accent-1/50 bg-accent-1/5 shadow-sm shadow-accent-1/10'
                                                        : item.severity === 'Critical' || item.severity === 'critical'
                                                        ? 'border-danger/50 bg-danger/5'
                                                        : 'border-border-2 bg-bg-1 hover:border-border-1'
                                                }`}
                                                onClick={() => toggleSuggestion(catIndex, itemIndex)}
                                            >
                                                <div className="flex justify-between items-start gap-3">
                                                    <div className="flex flex-col gap-1 min-w-0">
                                                        <div className="flex items-center gap-1.5 flex-wrap">
                                                            <p className="text-text-1 text-sm font-bold">{item.title}</p>
                                                            {(item.severity === 'Critical' || item.severity === 'critical') && (
                                                                <span className="text-[10px] bg-danger/20 text-danger px-1.5 rounded uppercase font-bold tracking-tight">Critical</span>
                                                            )}
                                                            {item.applied && (
                                                                <span className="text-[10px] bg-accent-1/20 text-accent-1 px-1.5 rounded uppercase font-bold tracking-tight">Selected</span>
                                                            )}
                                                        </div>
                                                        <p className="text-text-3 text-xs leading-relaxed">{item.description}</p>
                                                    </div>
                                                    <div className="shrink-0" onClick={e => e.stopPropagation()}>
                                                        <Toggle
                                                            id={`toggle-${item.id}`}
                                                            checked={item.applied}
                                                            onChange={() => toggleSuggestion(catIndex, itemIndex)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Sidebar Footer */}
                    <div className="mt-auto p-4 bg-surface-2 border-t border-border-1 sticky bottom-0 z-10 space-y-2">
                        {/* Progress bar */}
                        {totalImprovements > 0 && (
                            <div className="mb-3">
                                <div className="flex justify-between text-xs text-text-3 mb-1">
                                    <span>Progress</span>
                                    <span>{Math.round((appliedCount / totalImprovements) * 100)}%</span>
                                </div>
                                <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-accent-1 rounded-full transition-all duration-500"
                                        style={{ width: `${(appliedCount / totalImprovements) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                        <button
                            className="w-full flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-surface-1 hover:bg-surface-3 text-text-1 text-sm font-bold transition-all border border-border-1 gap-2"
                            onClick={handleRescan}
                        >
                            <span className="material-symbols-outlined text-sm">refresh</span>
                            Rescan Site
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
                                    className={`p-1.5 px-3 rounded shadow-sm flex items-center gap-2 text-xs font-medium transition-colors ${
                                        (activeDevice === 'desktop' && icon === 'desktop_windows') || activeDevice === icon
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
                            <span className="text-xs text-text-3 truncate max-w-[200px]">{url}</span>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="material-symbols-outlined text-text-3 hover:text-text-1 text-lg transition-colors"
                            >
                                open_in_new
                            </a>
                        </div>
                    </div>

                    {/* Virtual Browser Shell */}
                    <div className={`flex-1 bg-white rounded-xl overflow-hidden border border-border-1 shadow-2xl relative flex flex-col transition-all duration-300 ${
                        activeDevice === 'mobile' ? 'max-w-[375px] mx-auto'
                        : activeDevice === 'tablet' ? 'max-w-[768px] mx-auto'
                        : 'w-full'
                    }`}>
                        {/* Browser Header */}
                        <div className="h-10 bg-[#f1f1f4] border-b border-[#e2e2e7] flex items-center px-4 gap-4 shrink-0">
                            <div className="flex gap-1.5">
                                <div className="size-2.5 bg-red-400 rounded-full" />
                                <div className="size-2.5 bg-yellow-400 rounded-full" />
                                <div className="size-2.5 bg-green-400 rounded-full" />
                            </div>
                            <div className="bg-white px-3 py-1 rounded border border-[#e2e2e7] flex-1 max-w-md mx-auto text-[10px] text-gray-400 text-center">
                                {url.replace("https://", "").replace("http://", "")}
                            </div>
                        </div>

                        {/* Iframe preview */}
                        <div className="flex-1 overflow-y-auto bg-white relative">
                            {iframeSrcDoc ? (
                                <iframe
                                    srcDoc={iframeSrcDoc}
                                    className="absolute inset-0 w-full h-full border-none transition-all duration-500 ease-in-out"
                                    title="Website Preview"
                                    sandbox="allow-same-origin allow-scripts"
                                />
                            ) : (
                                <iframe
                                    src={url}
                                    className="absolute inset-0 w-full h-full border-none"
                                    title="Website Preview"
                                />
                            )}

                            {/* Overlay indicator when fixes are being auto-generated */}
                            {isApplying && (
                                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10">
                                    <div className="bg-surface-1 border border-border-1 rounded-xl px-6 py-4 flex items-center gap-3 shadow-2xl">
                                        <span className="material-symbols-outlined text-accent-1 animate-spin">sync</span>
                                        <span className="text-text-1 font-medium text-sm">Generating fixes...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Success Banner */}
                    {appliedSuccessfully && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-success/10 border border-success/30 text-success rounded-xl px-5 py-3 flex items-center gap-2 shadow-lg z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            <span className="text-sm font-semibold">Fixes saved successfully!</span>
                            <button
                                className="ml-2 text-success/60 hover:text-success transition-colors"
                                onClick={() => setAppliedSuccessfully(false)}
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    )}

                    {/* Floating Action Bar */}
                    <div className="absolute bottom-12 right-12 flex gap-4">
                        <button
                            className={`flex min-w-[120px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 border border-border-1 text-white text-sm font-bold transition-all shadow-xl gap-2 ${
                                activeCssRules.length > 0
                                    ? 'bg-surface-1 hover:bg-surface-2'
                                    : 'bg-surface-1/50 opacity-50 cursor-not-allowed'
                            }`}
                            onClick={handleExportCss}
                            disabled={activeCssRules.length === 0}
                            title={activeCssRules.length === 0 ? "Toggle some fixes first" : "Download the fix CSS"}
                        >
                            <span className="material-symbols-outlined text-sm">download</span>
                            Export CSS
                        </button>
                        <Button
                            variant="primary"
                            size="lg"
                            className={`min-w-[180px] shadow-lg shadow-accent-1/20 ${appliedSuccessfully ? '!bg-success hover:!bg-success/90' : ''}`}
                            onClick={handleApplyChanges}
                            disabled={appliedCount === 0 || isApplying}
                        >
                            {isApplying ? (
                                <><span className="material-symbols-outlined text-sm animate-spin mr-2">sync</span>Applying...</>
                            ) : appliedSuccessfully ? (
                                <><span className="material-symbols-outlined text-sm mr-2">check</span>Applied!</>
                            ) : (
                                `Apply ${appliedCount > 0 ? appliedCount : ''} ${appliedCount === 1 ? 'Fix' : 'Fixes'}`
                            )}
                        </Button>
                    </div>
                </section>
            </div>
        </DashboardShell>
    );
}
