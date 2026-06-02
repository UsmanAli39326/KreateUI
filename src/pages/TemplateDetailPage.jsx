import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "@/components/Common/Button";
import marketplaceData from "@/assets/api/marketplaceData.json";
import marketplaceService from "../services/marketplaceService";
import { useToast } from "@/components/Common";

export default function TemplateDetailPage() {
    const { templateId } = useParams();
    const toast = useToast();
    const { featured, items } = marketplaceData;
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Find the template
    let template = null;
    if (featured.id === templateId) {
        template = featured;
    } else {
        template = items.find((item) => item.id === templateId);
    }

    const handleGetTemplate = async () => {
        try {
            setIsPurchasing(true);
            await marketplaceService.purchaseTemplate(templateId);
            toast.success("Template purchased successfully!");
            // After purchase, we could automatically trigger download or change UI state
        } catch (err) {
            console.error("Purchase failed", err);
            toast.error("Failed to purchase template");
        } finally {
            setIsPurchasing(false);
        }
    };

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const blob = await marketplaceService.downloadTemplate(templateId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${templateId}.zip`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download failed", err);
            toast.error("Failed to download template. Please make sure you have purchased it.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (!template) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center text-text-1">
                <span className="material-symbols-outlined text-6xl text-text-3 mb-4">search_off</span>
                <h2 className="text-2xl font-bold">Template Not Found</h2>
                <p className="text-text-2 mb-8">The template you are looking for does not exist.</p>
                <Link to="/marketplace">
                    <Button variant="primary">Return to Marketplace</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-text-1">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-text-3 mb-8">
                <Link to="/marketplace" className="hover:text-accent-1 transition-colors">Marketplace</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-text-1 font-medium truncate">{template.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Image & Overview */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Image */}
                    <div className="rounded-xl overflow-hidden border border-border-1 bg-surface-1 shadow-lg aspect-video relative group">
                        <div
                            className="w-full h-full bg-center bg-cover"
                            style={{ backgroundImage: `url('${template.image || "https://via.placeholder.com/800x450"}')` }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="secondary" icon={<span className="material-symbols-outlined">visibility</span>}>
                                Live Preview
                            </Button>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">About this template</h3>
                        <p className="text-text-2 leading-relaxed">
                            {template.longDescription || template.description}
                        </p>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Key Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {template.features && template.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-surface-1 border border-border-1">
                                    <span className="material-symbols-outlined text-accent-1 text-xl">check_circle</span>
                                    <span className="text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar Actions & Stats */}
                <div className="space-y-6">
                    <div className="p-6 rounded-xl border border-border-1 bg-surface-1 sticky top-24">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold mb-1">{template.title}</h1>
                                <p className="text-sm text-text-3">by <span className="text-accent-1 font-medium">{template.author || "Unknown"}</span></p>
                            </div>
                            {template.score && (
                                <div className="flex flex-col items-center">
                                    <div className="relative flex items-center justify-center w-12 h-12">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle className="text-bg-2" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                                            <circle className="text-accent-1" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * template.score) / 100} strokeWidth="4"></circle>
                                        </svg>
                                        <span className="absolute text-xs font-bold text-text-1">{template.score}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <span className="text-3xl font-bold">{template.price || "Free"}</span>
                            {template.price && <span className="text-text-3 text-sm ml-1">USD</span>}
                        </div>

                        <div className="space-y-3 mb-8">
                            <Button variant="primary" fullWidth size="lg" onClick={handleGetTemplate} disabled={isPurchasing}>
                                {isPurchasing ? "Processing..." : "Get Template"}
                            </Button>
                            <Button variant="secondary" fullWidth icon={<span className="material-symbols-outlined">download</span>} onClick={handleDownload} disabled={isDownloading}>
                                {isDownloading ? "Downloading..." : "Download Source ZIP"}
                            </Button>
                        </div>

                        <hr className="border-border-1 mb-6" />

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-text-3">Framework</span>
                                <span className="font-medium text-text-1">{template.tech}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-3">Version</span>
                                <span className="font-medium text-text-1">{template.version || "1.0.0"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-text-3">Last Updated</span>
                                <span className="font-medium text-text-1">{template.lastUpdated || "Recently"}</span>
                            </div>
                            <div className="pt-2">
                                <span className="text-text-3 block mb-2">Tech Stack</span>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(template.stack) ? template.stack.map((s, i) => (
                                        <span key={i} className="px-2 py-1 rounded bg-bg-2 border border-border-1 text-xs">{s}</span>
                                    )) : (
                                        <span className="px-2 py-1 rounded bg-bg-2 border border-border-1 text-xs">{template.stack}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
