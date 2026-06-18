import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/Common/Button";
import marketplaceData from "@/assets/api/marketplaceData.json";
import marketplaceService from "../services/marketplaceService";
import EmptyState from "@/components/Common/EmptyState";
import Spinner from "@/components/Common/Spinner";

function TemplateCard({ item }) {
    return (
        <div className="group flex flex-col bg-surface-1 border border-border-1 rounded-xl overflow-hidden hover:border-accent-1/50 transition-all duration-300">
            <div className="relative aspect-video overflow-hidden">
                <div
                    className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${item.image || "https://via.placeholder.com/400x225"}')` }}
                />
                {item.badge && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10 flex items-center gap-1 uppercase">
                            <span className="material-symbols-outlined text-[12px] text-accent-1">auto_fix_high</span>
                            {item.badge}
                        </span>
                    </div>
                )}
            </div>
            <div className="p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-lg text-text-1 group-hover:text-accent-1 transition-colors">{item.title}</h3>
                        <p className="text-xs text-text-3">by {item.author || "Unknown"} • {item.tech || item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center w-10 h-10">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle className="text-bg-2" cx="20" cy="20" fill="transparent" r="16" stroke="currentColor" strokeWidth="3"></circle>
                                <circle className="text-accent-1" cx="20" cy="20" fill="transparent" r="16" stroke="currentColor" strokeDasharray="100.5" strokeDashoffset={100.5 - (100.5 * (item.score || 90)) / 100} strokeWidth="3"></circle>
                            </svg>
                            <span className="absolute text-[10px] font-bold text-text-1">{item.score || 90}%</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(item.stack || []).map((stackItem, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-bg-2 text-text-3 border border-border-1">{stackItem}</span>
                    ))}
                </div>
                <Link to={`/marketplace/${item.id}`} className="block w-full">
                    <Button variant="secondary" fullWidth className="dark:bg-bg-1 dark:hover:bg-accent-1 hover:text-white">View Template</Button>
                </Link>
            </div>
        </div>
    );
}

export default function MarketplacePage() {
    const { featured, filters } = marketplaceData;
    const [items, setItems] = useState(marketplaceData.items);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoading(true);
                const res = await marketplaceService.getTemplates(searchQuery);
                // API may return flat array or { items: [...] }
                let templatesList = Array.isArray(res) ? res : (res?.items || res?.data);
                
                if (templatesList) {
                    templatesList = templatesList.map(item => ({
                        ...item,
                        id: item._id || item.id,
                        image: item.imagePath ? (item.imagePath.startsWith('http') ? item.imagePath : marketplaceService.getStaticFile(item.imagePath)) : item.image,
                    }));
                }

                if (templatesList && templatesList.length > 0) {
                    setItems(templatesList);
                } else {
                    setItems([]); // empty results
                }
            } catch (err) {
                console.error("Failed to load templates", err);
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        const timerId = setTimeout(() => {
            fetchTemplates();
        }, 400);

        return () => clearTimeout(timerId);
    }, [searchQuery]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-text-1">
            {/* Headline Section & Embedded Search */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-text-1">High-Performance Templates</h1>
                    <p className="text-text-2 max-w-2xl">Discover AI-validated website templates optimized for accessibility, usability, and developer experience.</p>
                </div>
                {/* Search Input */}
                <div className="relative max-w-md w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-text-3 text-sm">search</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2 border border-border-1 rounded-lg bg-surface-1 text-sm placeholder:text-text-3 focus:outline-none focus:ring-1 focus:ring-accent-1/50 focus:border-accent-1 transition-all text-text-1"
                        placeholder="Search templates, components..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <button className="flex items-center gap-2 px-4 py-2 bg-accent-1 text-white rounded-lg text-sm font-medium whitespace-nowrap">
                        <span>All Templates</span>
                    </button>
                    {filters && filters.slice(1).map((filter) => (
                        <button key={filter} className="flex items-center gap-2 px-4 py-2 bg-surface-1 border border-border-1 hover:border-accent-1 transition-colors rounded-lg text-sm font-medium whitespace-nowrap text-text-1">
                            <span>{filter}</span>
                            <span className="material-symbols-outlined text-xs">expand_more</span>
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-text-3 uppercase tracking-widest">Sort by</span>
                    <select className="bg-surface-1 border border-border-1 rounded-lg text-sm py-2 pl-3 pr-8 focus:ring-accent-1 focus:border-accent-1 outline-none text-text-1">
                        <option>Highest Accessibility</option>
                        <option>Newest Release</option>
                        <option>Most Downloaded</option>
                    </select>
                </div>
            </div>

            {/* Featured Banner */}
            <div className="mb-12 @container">
                <div className="flex flex-col md:flex-row items-stretch overflow-hidden rounded-xl border border-border-1 bg-surface-1 shadow-xl">
                    <div className="relative w-full md:w-3/5 aspect-video md:aspect-auto">
                        <div
                            className="w-full h-full bg-center bg-cover"
                            style={{ backgroundImage: `url('${featured.image}')` }}
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="bg-accent-1/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">verified</span> {featured.badges && featured.badges[0]}
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 p-8 flex flex-col justify-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                                <span className="text-accent-1 text-xs font-bold uppercase tracking-widest mb-1">Editors Choice</span>
                                <h2 className="text-2xl font-bold leading-tight text-text-1">{featured.title}</h2>
                            </div>
                            <div className="ml-auto flex items-center gap-2 bg-bg-1 p-2 rounded-lg border border-border-1">
                                <div className="relative flex items-center justify-center w-12 h-12">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-bg-2" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeWidth="4"></circle>
                                        <circle className="text-accent-1" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="1.25" strokeWidth="4"></circle>
                                    </svg>
                                    <span className="absolute text-xs font-bold text-text-1">{featured.score}</span>
                                </div>
                                <span className="text-[10px] uppercase font-bold text-text-3 leading-none">A11Y<br />Score</span>
                            </div>
                        </div>
                        <p className="text-text-2">{featured.description}</p>
                        <div className="flex items-center gap-6 pt-2">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-text-3 uppercase font-bold tracking-tighter">Stack</span>
                                <span className="text-sm font-medium text-text-1">{featured.stack}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-text-3 uppercase font-bold tracking-tighter">Performance</span>
                                <span className="text-sm font-medium text-text-1">{featured.performance}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-4">
                            <Link to={`/marketplace/${featured.id}`} className="flex-1">
                                <Button variant="primary" fullWidth className="h-full">View Template</Button>
                            </Link>
                            <button className="px-4 border border-border-1 hover:bg-surface-2 rounded-lg transition-colors text-text-2">
                                <span className="material-symbols-outlined">bookmark</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Grid */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Spinner size="lg" />
                </div>
            ) : items && items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <TemplateCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="py-8">
                    <EmptyState message="No templates found. Try a different search." />
                </div>
            )}

            {/* Load More */}
            <div className="mt-12 flex flex-col items-center gap-4">
                <Button variant="secondary" icon={<span className="material-symbols-outlined">refresh</span>}>
                    Load More Templates
                </Button>
                <p className="text-sm text-text-3">Showing {items ? items.length : 0} of 1,248 available high-quality templates</p>
            </div>
        </div>
    );
}
