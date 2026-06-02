import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import PageHeader from "@/components/Dashboard/PageHeader";
import AnalyzeBar from "@/components/Dashboard/AnalyzeBar";
import QuickOptions from "@/components/Dashboard/QuickOptions";
import RecentScans from "@/components/Dashboard/RecentScans";


import initialScans from "@/assets/api/RecentScans.json";
import defaultOptions from "@/assets/api/defaultOptions.json";

function isValidUrlLike(v) {
  if (!v) return false;
  if (v.startsWith("http://") || v.startsWith("https://")) return true;
  return v.includes(".");
}

export default function AnalyzeDashboard() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [scans] = useState(initialScans);

  const breadcrumbs = useMemo(
    () => [{ label: "Workspace", href: "/dashboard" }, { label: "Analyze Website" }],
    []
  );

  const canAnalyze = isValidUrlLike(url) && !isAnalyzing;

  const onAnalyze = () => {
    if (!canAnalyze) return;

    setIsAnalyzing(true);

    const formattedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

    // Navigate to the in-progress page with URL as query param
    navigate(`/dashboard/analyze/progress?url=${encodeURIComponent(formattedUrl)}`);
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

