import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Common/Button";
import marketplaceService from "../services/marketplaceService";
import { useToast } from "@/components/Common";

export default function SubmitTemplatePage() {
    const navigate = useNavigate();
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        category: 'SaaS Landing',
        price: '',
        url: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [issues, setIssues] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (errors[e.target.name]) {
            setErrors({...errors, [e.target.name]: null});
        }
    };

    const handleFileChange = (e, setFileFn) => {
        if (e.target.files && e.target.files[0]) {
            setFileFn(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setIssues(null);
        setErrors({});

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('price', formData.price);
        data.append('url', formData.url);
        data.append('description', formData.description);
        if (file) data.append('file', file);
        if (image) data.append('image', image);

        try {
            const res = await marketplaceService.uploadTemplate(data);
            if (res.status === 201) {
                toast.success("Template approved and listed!");
                navigate("/marketplace");
            } else if (res.status === 200) {
                toast.warning("Template rejected due to low score. Check the issues returned.");
                setIssues(res.data?.issues || res.issues || []);
            }
        } catch (err) {
            console.error("Upload failed", err);
            if (err.response?.status === 400 || err.status === 400) {
                const responseErrors = err.response?.data?.errors || err.response?.data?.message || {};
                if (typeof responseErrors === 'string') {
                    setErrors({ general: responseErrors });
                } else {
                    setErrors(responseErrors);
                }
                toast.error("Validation failed. Please check the form.");
            } else {
                toast.error("Failed to submit template.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-text-1">
            <Link to="/marketplace" className="inline-flex items-center gap-2 text-text-3 hover:text-accent-1 transition-colors mb-8">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Marketplace
            </Link>

            <div className="mb-10">
                <h1 className="text-4xl font-black mb-2">Submit Your Template</h1>
                <p className="text-text-2 text-lg">Share your high-performance, accessible designs with the community.</p>
            </div>

            {issues && issues.length > 0 && (
                <div className="mb-8 p-6 bg-error/10 border border-error/20 rounded-xl">
                    <h3 className="text-error font-bold mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined">warning</span>
                        Accessibility Issues Found
                    </h3>
                    <ul className="space-y-2">
                        {issues.map((issue, idx) => (
                            <li key={idx} className="text-sm text-text-2 flex gap-2">
                                <span className="text-error mt-0.5">•</span>
                                <span>{issue.message || issue.description || issue}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {errors.general && (
                <div className="mb-8 p-4 bg-error/10 border border-error/20 text-error rounded-xl text-sm">
                    {errors.general}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-surface-1 border border-border-1 p-8 rounded-2xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Template Name</label>
                        <input
                            required
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Modern SaaS Starter"
                            className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all"
                        />
                        {errors.title && <p className="text-xs text-error mt-1">{errors.title}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Category</label>
                        <select 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all"
                        >
                            <option>SaaS Landing</option>
                            <option>E-commerce</option>
                            <option>Portfolio</option>
                            <option>Dashboard</option>
                            <option>Other</option>
                        </select>
                        {errors.category && <p className="text-xs text-error mt-1">{errors.category}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Price (USD)</label>
                        <input
                            required
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g. 49"
                            min="0"
                            className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all"
                        />
                        {errors.price && <p className="text-xs text-error mt-1">{errors.price}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Preview URL</label>
                        <input
                            type="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="https://your-demo.com"
                            className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all"
                        />
                        {errors.url && <p className="text-xs text-error mt-1">{errors.url}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-text-2 uppercase tracking-wider">Brief Description</label>
                    <textarea
                        required
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Explain the unique features and accessibility optimizations..."
                        className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-text-1 focus:ring-2 focus:ring-accent-1/50 outline-none transition-all resize-none"
                    />
                    {errors.description && <p className="text-xs text-error mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider mb-2 block">Cover Image</label>
                        <div className="relative border-2 border-dashed border-border-1 rounded-xl bg-bg-0 hover:border-accent-1 transition-colors cursor-pointer overflow-hidden">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleFileChange(e, setImage)} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                            />
                            <div className="p-6 flex flex-col items-center justify-center text-center">
                                <span className="material-symbols-outlined text-4xl text-text-3 mb-2">{image ? 'image' : 'add_photo_alternate'}</span>
                                <p className="text-sm font-bold text-text-2">{image ? image.name : 'Upload Cover Image'}</p>
                                <p className="text-xs text-text-3 mt-1">PNG, JPG, WebP</p>
                            </div>
                        </div>
                        {errors.image && <p className="text-xs text-error mt-1">{errors.image}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-text-2 uppercase tracking-wider mb-2 block">Source ZIP</label>
                        <div className="relative border-2 border-dashed border-border-1 rounded-xl bg-bg-0 hover:border-accent-1 transition-colors cursor-pointer overflow-hidden">
                            <input 
                                type="file" 
                                accept=".zip,.tar,.gz" 
                                onChange={(e) => handleFileChange(e, setFile)} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                            />
                            <div className="p-6 flex flex-col items-center justify-center text-center">
                                <span className="material-symbols-outlined text-4xl text-text-3 mb-2">{file ? 'folder_zip' : 'upload_file'}</span>
                                <p className="text-sm font-bold text-text-2">{file ? file.name : 'Upload Source ZIP'}</p>
                                <p className="text-xs text-text-3 mt-1">Max 50MB</p>
                            </div>
                        </div>
                        {errors.file && <p className="text-xs text-error mt-1">{errors.file}</p>}
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        isDisabled={submitting}
                        icon={submitting ? <span className="material-symbols-outlined animate-spin">refresh</span> : null}
                    >
                        {submitting ? "Submitting..." : "Submit for Moderation"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
