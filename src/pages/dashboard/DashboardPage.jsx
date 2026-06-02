import React, { useMemo, useState, useEffect } from "react";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import PageHeader from "@/components/Dashboard/PageHeader";
import AnalyzeBar from "@/components/Dashboard/AnalyzeBar";
import QuickOptions from "@/components/Dashboard/QuickOptions";
import RecentScans from "@/components/Dashboard/RecentScans";

import initialScans from "@/assets/api/recentScans.json";
import defaultOptions from "@/assets/api/defaultOptions.json";
import userService from "../../services/userService";
import auditService from "../../services/auditService";

function isValidUrlLike(v) {
  if (!v) return false;
  if (v.startsWith("http://") || v.startsWith("https://")) return true;
  return v.includes(".");
}

export default function AnalyzeDashboard() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [scans, setScans] = useState(initialScans);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await userService.getAudits();
        // API returns: { audits: [...], total, page, limit }
        const auditList = res?.audits || res?.data;
        if (auditList && auditList.length > 0) {
          setScans(auditList);
        }
      } catch (err) {
        console.error("Failed to load audits:", err);
      }
    };
    fetchScans();
  }, []);

  const breadcrumbs = useMemo(
    () => [{ label: "Workspace", href: "/dashboard" }, { label: "Analyze Website" }],
    []
  );

  const canAnalyze = isValidUrlLike(url) && !isAnalyzing;

  const onAnalyze = async () => {
    if (!canAnalyze) return;

    setIsAnalyzing(true);

    const id = `scan_${Date.now()}`;
    const formattedUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    const normalized = formattedUrl.replace(/^https?:\/\//, "");

    const newRow = {
      id,
      url: normalized,
      scannedAt: null,
      issuesCount: null,
      status: "processing",
      faviconColor: "#8e52ff",
      optionsUsed: { ...options } // reusable later for scan details/report
    };

    setScans((prev) => [newRow, ...prev]);

    try {
      const useAi = true; // or based on options
      const res = await auditService.startAudit(formattedUrl, useAi);
      
      setScans((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                id: res?.id || res?.data?.id || id, // update with real ID if provided
                status: "completed",
                scannedAt: new Date().toISOString(),
                issuesCount: res?.summary?.issueCount || res?.data?.issuesCount || Math.floor(6 + Math.random() * 18),
              }
            : s
        )
      );
    } catch (err) {
      console.error("Audit failed:", err);
      setScans((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "failed", issuesCount: 0 }
            : s
        )
      );
    } finally {
      setIsAnalyzing(false);
      setUrl("");
    }
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
