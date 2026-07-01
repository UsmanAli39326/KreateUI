import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Breadcrumbs from "@/components/Dashboard/BreadCrumbs";
import auditService from "../../services/auditService";
import { useToast, ErrorState } from "../../components/Common";

const analysisSteps = [
    { id: 1, label: "Connecting to website", icon: "globe" },
    { id: 2, label: "Scanning page structure", icon: "code" },
    { id: 3, label: "Analyzing accessibility", icon: "accessibility" },
    { id: 4, label: "Checking color contrast", icon: "contrast" },
    { id: 5, label: "Evaluating mobile responsiveness", icon: "phone" },
    { id: 6, label: "Generating AI insights", icon: "ai" },
];

const analysisTips = [
    "💡 AI analysis typically takes 30–60 seconds for most sites.",
    "🔍 We check 50+ WCAG 2.1 criteria across your entire page.",
    "⚡ Results include auto-fix suggestions for every issue found."
];

function StepIcon({ name, isActive, isComplete }) {
    const baseClass = "size-5";
    const color = isComplete ? "text-success" : isActive ? "text-accent-1" : "text-text-3";

    const icons = {
        globe: (
            <svg className={`${baseClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        code: (
            <svg className={`${baseClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        accessibility: (
            <svg className={`${baseClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="4" r="2" />
                <path d="M12 6v6M9 20l3-8 3 8M6 12h12" />
            </svg>
        ),
        contrast: (
            <svg className={`${baseClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
            </svg>
        ),
        phone: (
            <svg className={`${baseClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
        ai: (
            <svg className={`${baseClass} ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    };

    return icons[name] || null;
}

function CheckIcon() {
    return (
        <svg className="size-4 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

export default function AnalyzeInProgressPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const url = searchParams.get("url") || "example.com";
    const ai = searchParams.get("ai");
    const toast = useToast();

    const [currentStep, setCurrentStep] = useState(0);
    const currentStepRef = useRef(0); // mirror of currentStep for use inside interval
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [auditId, setAuditId] = useState(null);
    const [auditError, setAuditError] = useState(null);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const apiRespondedRef = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % analysisTips.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const breadcrumbs = [
        { label: "Workspace", href: "/dashboard" },
        { label: "Analyze", href: "/dashboard/analyze" },
        { label: "In Progress" },
    ];

    const runAudit = (targetUrl) => {
        auditService.startAudit(targetUrl, ai === 'true')
            .then(res => {
                // API returns flat: { id, url, summary, issues, ... }
                const auditIdValue = res?.id || res?.data?.id;
                if (auditIdValue) {
                    setAuditId(auditIdValue);
                }
                apiRespondedRef.current = true;
            })
            .catch(err => {
                console.error("Audit failed", err);
                const errMsg = err?.error || "Failed to perform audit. Please try again later.";
                setAuditError(errMsg);
                toast.error(errMsg, "Audit Execution Failed");
            });
    };

    useEffect(() => {
        runAudit(url);
    }, [url]);

    const handleRetry = () => {
        setAuditError(null);
        setCurrentStep(0);
        setProgress(0);
        setIsComplete(false);
        setAuditId(null);
        apiRespondedRef.current = false;
        runAudit(url);
    };

    // Simulate analysis progress — single stable interval for the full animation.
    // currentStepRef lets us read the latest step inside the callback without
    // adding currentStep to the dependency array (which would tear down and
    // re-create the interval on every step, causing glitches).
    useEffect(() => {
        if (auditError) return;

        const stepDuration = 2000; // 2 seconds per step
        const tickInterval = 50;   // UI update frequency (ms)
        const progressIncrement = 100 / (stepDuration / tickInterval);

        let stepProgress = 0;

        const timer = setInterval(() => {
            stepProgress += progressIncrement;

            if (stepProgress >= 100) {
                const next = currentStepRef.current + 1;
                if (next >= analysisSteps.length) {
                    if (apiRespondedRef.current) {
                        clearInterval(timer);
                        setIsComplete(true);
                        setProgress(100);
                    } else {
                        // Hold progress if API hasn't responded yet
                        stepProgress = 99;
                        setProgress(99);
                    }
                    return;
                }
                
                stepProgress = 0;
                currentStepRef.current = next;
                setCurrentStep(next);
            }

            // Calculate overall progress from the ref (always current, no stale closure)
            const overallProgress =
                ((currentStepRef.current * 100) + stepProgress) / analysisSteps.length;
            
            // Only update progress normally if we haven't reached the end yet
            if (currentStepRef.current < analysisSteps.length) {
                setProgress(Math.min(overallProgress, 99));
            }
        }, tickInterval);

        return () => clearInterval(timer);
    }, [auditError]); // interval is created once; re-created only if an error occurs

    return (
        <DashboardShell active="analyze">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex flex-col items-center justify-center min-h-[60vh] py-12">
                {/* Main Card */}
                <div className="w-full max-w-lg bg-surface-1 border border-border-1 rounded-2xl p-8 shadow-xl">
                    {auditError ? (
                        <div className="space-y-6">
                            <ErrorState
                                title="Analysis Failed"
                                message={auditError}
                                onRetry={handleRetry}
                                className="!bg-transparent !border-none !p-0"
                            />
                            <div className="text-center pt-2">
                                <button
                                    onClick={() => navigate("/dashboard/analyze")}
                                    className="text-sm text-text-3 hover:text-text-1 transition-colors"
                                >
                                    Return to Analyze Page
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center size-16 bg-accent-1/10 rounded-full mb-4 relative">
                                    {isComplete ? (
                                        <svg className="size-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    ) : (
                                        <div className="relative size-12 flex items-center justify-center">
                                            {/* Outer: pulses opacity */}
                                            <div className="absolute inset-0 border-2 border-accent-1/40 rounded-full animate-pulse" />
                                            {/* Middle: spins medium */}
                                            <div className="absolute inset-1.5 border-2 border-accent-1 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
                                            {/* Inner: spins fast */}
                                            <div className="absolute inset-3 border-2 border-accent-1 border-b-transparent rounded-full animate-spin" style={{ animationDuration: '0.5s', animationDirection: 'reverse' }} />
                                        </div>
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold text-text-1 mb-2">
                                    {isComplete ? "Analysis Complete!" : "Analyzing Website"}
                                </h1>
                                <p className="text-text-3 text-sm">
                                    {isComplete ? "Your results are ready" : `Scanning ${url}`}
                                </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-xs text-text-3 mb-2">
                                    <span>Progress</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="flex gap-1.5 h-2">
                                    {analysisSteps.map((_, idx) => {
                                        const isSegmentComplete = idx < currentStep || isComplete;
                                        return (
                                            <div
                                                key={idx}
                                                className={`flex-1 rounded-full transition-colors duration-300 ${
                                                    isSegmentComplete ? "bg-accent-1" : "bg-bg-0"
                                                }`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Terminal HUD */}
                            <div className="bg-[#0a0a0f] border border-border-1 rounded-xl p-4 font-mono text-sm shadow-inner overflow-hidden relative">
                                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border-1/30">
                                    <div className="size-3 rounded-full bg-danger/80"></div>
                                    <div className="size-3 rounded-full bg-warning/80"></div>
                                    <div className="size-3 rounded-full bg-success/80"></div>
                                    <span className="ml-2 text-text-3 text-xs tracking-wider">AI_ENGINE_v2.4.sh</span>
                                </div>
                                <div className="space-y-3 h-[220px] overflow-y-auto custom-scrollbar">
                                    {analysisSteps.map((step, idx) => {
                                        const isActive = idx === currentStep && !isComplete;
                                        const isStepComplete = idx < currentStep || isComplete;

                                        // Only show steps that have started
                                        if (idx > currentStep && !isComplete) return null;

                                        return (
                                            <div key={step.id} className="flex items-start gap-3">
                                                <span className="text-accent-1/70">&gt;</span>
                                                <div className="flex-1">
                                                    <span className={`transition-all duration-500 ${
                                                        isStepComplete 
                                                            ? "text-success drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                                                            : isActive ? "text-text-1" : "text-text-3"
                                                    }`}>
                                                        {step.label}...
                                                    </span>
                                                    {isStepComplete && (
                                                        <span className="ml-2 text-success drop-shadow-[0_0_5px_rgba(34,197,94,0.8)] font-bold">
                                                            [DONE]
                                                        </span>
                                                    )}
                                                    {isActive && (
                                                        <span className="ml-2 text-accent-1 animate-pulse font-bold">
                                                            [PROCESSING]
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {!isComplete && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-accent-1/70">&gt;</span>
                                            <span className="inline-block w-2 h-4 bg-accent-1 animate-pulse mt-0.5"></span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8">
                                {isComplete ? (
                                    <button
                                        onClick={() => navigate(`/dashboard/analyze/results?url=${encodeURIComponent(url)}&auditId=${auditId || ''}`)}
                                        className="w-full bg-accent-1 hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg shadow-accent-1/20"
                                        disabled={!auditId} // Keep disabled ONLY if auditId is missing (prevent mock issues from bypassing)
                                    >
                                        View Results →
                                    </button>
                                ) : (
                                    <div className="text-center">
                                        <button
                                            onClick={() => navigate("/dashboard/analyze")}
                                            className="text-sm text-text-3 hover:text-text-1 transition-colors"
                                        >
                                            Cancel Analysis
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Tips */}
                <div className="mt-8 text-center max-w-md h-8 flex items-center justify-center">
                    <p className="text-text-3 text-sm transition-opacity duration-500">
                        {analysisTips[currentTipIndex]}
                    </p>
                </div>
            </div>
        </DashboardShell>
    );
}
