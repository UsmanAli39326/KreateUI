import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import PageHeader from "@/components/Dashboard/PageHeader";
import AnalyzeBar from "@/components/Dashboard/AnalyzeBar";
import QuickOptions from "@/components/Dashboard/QuickOptions";
import RecentScans from "@/components/Dashboard/RecentScans";
import { useToast } from "@/components/Common";
import userService from "../../services/userService";

import initialScans from "@/assets/api/RecentScans.json";
import defaultOptions from "@/assets/api/defaultOptions.json";

function isValidUrlLike(v) {
  if (!v) return false;
  if (v.startsWith("http://") || v.startsWith("https://")) return true;
  return v.includes(".");
}

export default function AnalyzeDashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [options, setOptions] = useState(() => {
    const saved = localStorage.getItem("kreate_ai_pref");
    if (saved !== null) {
      return { ...defaultOptions, aiRecommendations: JSON.parse(saved) };
    }
    return defaultOptions;
  });
  const [scans, setScans] = useState([]);

  useEffect(() => {
    userService.getAudits(1, 5)
      .then(res => {
        const audits = res?.data?.audits || res?.audits || [];
        const mappedScans = audits.map(audit => ({
          ...audit,
          url: audit.name || audit.url || audit.targetUrl || "Unknown",
          scannedAt: audit.createdAt || audit.scannedAt,
          score: audit.score || audit.summary?.currentScore || 0,
          issuesCount: audit.summary?.issueCount || audit.issuesCount || 0,
          status: audit.status || "failed"
        }));
        setScans(mappedScans);
      })
      .catch(err => {
        console.error("Failed to fetch audits for scans", err);
        setScans(initialScans);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("kreate_ai_pref", JSON.stringify(options.aiRecommendations));
  }, [options.aiRecommendations]);

  const breadcrumbs = useMemo(
    () => [{ label: "Workspace", href: "/dashboard" }, { label: "Analyze Website" }],
    []
  );

  const canAnalyze = isValidUrlLike(url) && !isAnalyzing;

  const onAnalyze = async () => {
    if (!canAnalyze) return;

    setIsAnalyzing(true);

    const formattedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

    let aiParam = options.aiRecommendations;
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL 
          ? import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, '') 
          : 'https://webuifixer.onrender.com';
      const res = await fetch(`${baseUrl}/health`);
      if (!res.ok) throw new Error("Health check failed");
      const data = await res.json();
      if (!data.aiEngine || data.aiEngine === "down") {
        setOptions((prev) => ({ ...prev, aiRecommendations: false }));
        aiParam = false;
        toast.warning("AI engine is currently unavailable — running standard audit.");
      }
    } catch (err) {
      console.warn("Health check failed:", err);
      setOptions((prev) => ({ ...prev, aiRecommendations: false }));
      aiParam = false;
      toast.warning("AI engine is currently unavailable — running standard audit.");
    }

    // Delay navigation for HUD effect
    setTimeout(() => {
        navigate(`/dashboard/analyze/progress?url=${encodeURIComponent(formattedUrl)}&ai=${aiParam}`);
    }, 800);
  };

  return (
    <DashboardShell active="analyze">
      <Breadcrumbs items={breadcrumbs} />
      
      <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-4xl mx-auto text-center space-y-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-text-1 tracking-tight mb-4 bg-gradient-to-r from-text-1 to-text-3 bg-clip-text text-transparent">
              Audit Your Website
            </h1>
            <p className="text-lg text-text-3 max-w-2xl mx-auto">
              Enter a URL to evaluate accessibility, usability, and UI performance in seconds with our advanced AI engine.
            </p>
          </div>

          <div className="w-full relative z-10 transition-transform duration-500 ease-out hover:scale-[1.01]">
            <AnalyzeBar
              url={url}
              setUrl={setUrl}
              onAnalyze={onAnalyze}
              isAnalyzing={isAnalyzing}
              canAnalyze={canAnalyze}
            />
            <div className="mt-8">
              <QuickOptions options={options} setOptions={setOptions} />
            </div>
          </div>
      </div>

      <section className="mt-20 max-w-5xl mx-auto">
        <RecentScans scans={scans} />
      </section>
    </DashboardShell>
  );
}

