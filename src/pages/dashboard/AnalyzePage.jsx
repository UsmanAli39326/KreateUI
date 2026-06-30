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
          url: audit.name || "Unknown",
          date: audit.createdAt || "Unknown",
          score: audit.score || 0
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

    // Navigate to the in-progress page with URL as query param
    navigate(`/dashboard/analyze/progress?url=${encodeURIComponent(formattedUrl)}&ai=${aiParam}`);
  };

  return (
    <DashboardShell active="analyze">
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        title="Analyze Website"
        subtitle="Enter a URL to audit accessibility, usability, and UI performance in seconds."
      />

      <section className="mb-16">
        <AnalyzeBar
          url={url}
          setUrl={setUrl}
          onAnalyze={onAnalyze}
          isAnalyzing={isAnalyzing}
          canAnalyze={canAnalyze}
        />
        <QuickOptions options={options} setOptions={setOptions} />
      </section>

      <RecentScans scans={scans} />
    </DashboardShell>
  );
}

