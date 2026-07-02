import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ─── Helpers ────────────────────────────────────────────── */
const ease = [0.25, 0.46, 0.45, 0.94];
const fade = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
});

/* ─── Animated counter ───────────────────────────────────── */
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(to);
    const step = end / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [to]);
  return <span>{val}{suffix}</span>;
}

/* ─── SVG Spark-line ─────────────────────────────────────── */
const POINTS = [28, 42, 36, 55, 48, 62, 54, 70, 66, 78, 72, 82];
function SparkLine() {
  const W = 220, H = 80, n = POINTS.length;
  const xs = POINTS.map((_, i) => (i / (n - 1)) * W);
  const ys = POINTS.map(p => H - (p / 100) * H);
  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ");
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8743B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#E8743B" stopOpacity="0" />
        </linearGradient>
        <clipPath id="reveal">
          <motion.rect
            x="0" y="0" height={H}
            initial={{ width: 0 }}
            animate={{ width: W }}
            transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
          />
        </clipPath>
      </defs>
      <path d={area} fill="url(#sg)" clipPath="url(#reveal)" />
      <motion.path
        d={line}
        fill="none"
        stroke="#E8743B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
      />
      {/* Dot at last point */}
      <motion.circle
        cx={xs[n - 1]} cy={ys[n - 1]} r="4"
        fill="#E8743B"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.9, type: "spring" }}
      />
    </svg>
  );
}

/* ─── Metric tile ────────────────────────────────────────── */
function MetricTile({ value, suffix, label, delay }) {
  return (
    <motion.div
      {...fade(delay)}
      className="flex flex-col gap-0.5 p-4 rounded-2xl bg-surface-1 border border-border-1"
    >
      <p className="text-2xl font-bold text-text-1 tabular-nums">
        <Counter to={value} suffix={suffix} />
      </p>
      <p className="text-xs text-text-3">{label}</p>
    </motion.div>
  );
}

/* ─── Audit bar ──────────────────────────────────────────── */
function AuditBar({ label, pct, delay }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-2">{label}</span>
        <span className="text-xs font-semibold text-primary tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-bg-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function AboutHero() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 md:pt-10 md:pb-6">
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-6 items-start">

        {/* ── LEFT — Copy ── */}
        <div className="flex flex-col gap-7 md:sticky md:top-28">
          <motion.div {...fade(0)} className="flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-primary">Our Mission</span>
          </motion.div>

          <motion.h1
            {...fade(0.12)}
            className="text-[2.6rem] md:text-[3.2rem] font-bold leading-[1.1] tracking-tight text-text-1"
          >
            Building a web
            <br />
            that{" "}
            <span
              className="text-gradient"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              works for all.
            </span>
          </motion.h1>

          <motion.p {...fade(0.22)} className="text-text-2 text-base md:text-lg leading-[1.75] max-w-md">
            Kreate UI fuses AI-powered analysis with developer tooling to surface accessibility gaps before they ship — making inclusivity a default, not an afterthought.
          </motion.p>

          <motion.div {...fade(0.32)} className="flex flex-col gap-3.5 pt-2">
            {[
              { icon: "⚡", text: "Instant audit on every commit" },
              { icon: "🔍", text: "WCAG 2.2 AA/AAA coverage" },
              { icon: "🤝", text: "Integrates with your design system" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-sm">{icon}</span>
                <span className="text-sm text-text-2">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — Graphical Panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="flex flex-col gap-4"
        >
          {/* Chart card */}
          <div className="rounded-2xl bg-surface-1 border border-border-1 p-5 shadow-ambient">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-text-3">Accessibility Score Trend</p>
                <p className="text-2xl font-bold text-text-1 mt-0.5">+34% <span className="text-sm font-medium text-success">↑ this quarter</span></p>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-success-bg text-success border border-success/20">LIVE</span>
            </div>
            <div className="h-20">
              <SparkLine />
            </div>
            <div className="flex gap-4 mt-3 pt-3 border-t border-border-1">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <span key={m} className="flex-1 text-center text-[9px] text-text-3">{m}</span>
              ))}
            </div>
          </div>

          {/* Metric tiles row */}
          <div className="grid grid-cols-3 gap-3">
            <MetricTile value={98} suffix="%" label="Avg. Score" delay={0.3} />
            <MetricTile value={12} suffix="k" label="Developers" delay={0.38} />
            <MetricTile value={3} suffix="x" label="Faster Audits" delay={0.46} />
          </div>

          {/* Audit coverage card */}
          <div className="rounded-2xl bg-surface-1 border border-border-1 p-5 shadow-ambient flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-3">Coverage Breakdown</p>
              <span className="text-xs text-text-3">WCAG 2.2</span>
            </div>
            <div className="flex flex-col gap-3">
              <AuditBar label="Contrast & Color" pct={96} delay={0.5} />
              <AuditBar label="Keyboard Navigation" pct={89} delay={0.62} />
              <AuditBar label="Screen Reader Labels" pct={93} delay={0.74} />
              <AuditBar label="Focus Management" pct={87} delay={0.86} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
