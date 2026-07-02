import React, { useState } from "react";
import DashboardShell from "../../components/Dashboard/DashboardShell";
import { Button } from "../../components/Common";
import { useToast } from "../../components/Common";
import auditService from "../../services/auditService";
import marketplaceService from "../../services/marketplaceService";
import { useNavigate } from "react-router-dom";

export default function UploadTemplatePage() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditId, setAuditId] = useState(null);
  const [score, setScore] = useState(null);
  const [issues, setIssues] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: ""
  });
  const [zipFile, setZipFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a URL to analyze");
      return;
    }

    setIsAnalyzing(true);
    setScore(null);
    setIssues([]);
    try {
      // Step 1: Request an audit for this URL
      const response = await auditService.startAudit(url, false);

      const newAuditId = response?.auditId || response?.id || response?.data?.auditId || response?.data?.id;
      if (!newAuditId) {
        throw new Error("Audit ID not returned");
      }
      setAuditId(newAuditId);

      // Step 2: Fetch the audit details to get the score
      const auditDetails = await auditService.getAudit(newAuditId);
      const auditData = auditDetails?.data || auditDetails;
      const currentScore = auditData?.summary?.currentScore || 0;

      setScore(currentScore);
      setIssues(auditData?.issues || []);

      if (currentScore >= 80) {
        toast.success(`Analysis complete! Score: ${currentScore}. You can now upload your template.`);
        setStep(2);
      } else {
        toast.error(`Analysis complete. Score: ${currentScore}. Minimum score of 80 is required.`);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to analyze URL");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === "zip") setZipFile(file);
    else if (type === "image") setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !zipFile) {
      toast.error("Please fill in all required fields and select a ZIP file");
      return;
    }

    setIsUploading(true);
    try {
      const data = new FormData();
      data.append("url", url);
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("auditId", auditId);

      data.append("file", zipFile);
      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await marketplaceService.uploadTemplate(data);
      toast.success(res.message || "Template uploaded successfully!");
      navigate("/marketplace");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to upload template");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardShell active="upload-template">
      <header className="pb-8">
        <h2 className="text-4xl font-black tracking-tight text-text-1">Sell Template</h2>
        <p className="text-text-2 text-lg mt-2">
          Upload and list your accessible template on the Marketplace.
        </p>
      </header>

      <div className="max-w-3xl">
        {/* Step 1: Analysis */}
        <div className={`p-6 rounded-xl border ${step === 1 ? 'border-accent-1 bg-surface-1 shadow-lg' : 'border-border-1 bg-bg-0'} mb-6 transition-all`}>
          <div className="flex items-center gap-4 mb-4">
            <div className={`flex items-center justify-center size-8 rounded-full font-bold ${step >= 1 ? 'bg-accent-1 text-white' : 'bg-surface-2 text-text-3'}`}>1</div>
            <h3 className="text-xl font-bold text-text-1">Template Validation</h3>
          </div>
          <p className="text-sm text-text-2 mb-6">
            We require all templates to meet high accessibility standards (Score 80+). Please provide the URL where your template is currently hosted for live validation.
          </p>

          <form onSubmit={handleAnalyze} className="flex gap-4 flex-col sm:flex-row">
            <input
              type="url"
              placeholder="https://your-template-preview-url.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={step > 1 || isAnalyzing}
              required
              className="flex-1 bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-1 focus:ring-1 focus:ring-accent-1 transition-all disabled:opacity-50"
            />
            {step === 1 && (
              <Button type="submit" variant="primary" disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  "Analyze Template"
                )}
              </Button>
            )}
            {step > 1 && (
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Change URL
              </Button>
            )}
          </form>

          {score !== null && score < 80 && (
            <div className="mt-6 p-4 rounded-lg bg-danger/10 border border-danger/20 text-danger">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-xl">error</span>
                Validation Failed: Score {score}
              </h4>
              <p className="text-sm mb-4">Your template did not meet the minimum score of 80 required for the marketplace.</p>
              {issues.length > 0 && (
                <div className="text-xs space-y-2">
                  <p className="font-semibold">Top Issues Found:</p>
                  <ul className="list-disc pl-5">
                    {issues.slice(0, 5).map((issue, idx) => (
                      <li key={idx}>{issue.title || issue.message || 'Accessibility issue detected'}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {score !== null && score >= 80 && step === 1 && (
            <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20 text-success">
              <h4 className="font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">check_circle</span>
                Validation Passed: Score {score}
              </h4>
            </div>
          )}
        </div>

        {/* Step 2: Upload Details */}
        <div className={`p-6 rounded-xl border ${step === 2 ? 'border-accent-1 bg-surface-1 shadow-lg' : 'border-border-1 bg-bg-0 opacity-50 pointer-events-none'} transition-all`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center justify-center size-8 rounded-full font-bold ${step === 2 ? 'bg-accent-1 text-white' : 'bg-surface-2 text-text-3'}`}>2</div>
            <h3 className="text-xl font-bold text-text-1">Template Details</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-2">Template Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="E.g., Modern Portfolio Template"
                  className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-1"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-2">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-1"
              >
                <option value="">Select a category...</option>
                <option value="Landing Page">Landing Page</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Blog">Blog</option>
                <option value="Dashboard">Dashboard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe your template's features and benefits..."
                className="w-full bg-bg-1 border border-border-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-1 resize-y"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-2">Template Files (.zip) *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".zip,application/zip,application/x-zip-compressed"
                    onChange={(e) => handleFileChange(e, 'zip')}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center gap-3 w-full bg-bg-1 border border-dashed border-border-1 rounded-lg px-4 py-3 text-sm">
                    <span className="material-symbols-outlined text-text-3">folder_zip</span>
                    <span className="text-text-2 truncate">{zipFile ? zipFile.name : 'Select ZIP file...'}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-2">Preview Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => handleFileChange(e, 'image')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center gap-3 w-full bg-bg-1 border border-dashed border-border-1 rounded-lg px-4 py-3 text-sm">
                    <span className="material-symbols-outlined text-text-3">image</span>
                    <span className="text-text-2 truncate">{imageFile ? imageFile.name : 'Select cover image...'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border-1 flex justify-end">
              <Button type="submit" variant="primary" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Publish to Marketplace"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
