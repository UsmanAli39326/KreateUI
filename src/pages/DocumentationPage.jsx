import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const NAV_SECTIONS = [
  {
    id: "overview",
    label: "Platform Overview",
    icon: "explore",
    color: "text-accent-1",
  },
  {
    id: "getting-started",
    label: "Getting Started",
    icon: "rocket_launch",
    color: "text-blue-500",
  },

  {
    id: "wcag",
    label: "WCAG Compliance",
    icon: "accessibility_new",
    color: "text-amber-500",
  },
  {
    id: "browser-extension",
    label: "Browser Extension",
    icon: "extension",
    color: "text-pink-500",
  },
  {
    id: "faq",
    label: "FAQ",
    icon: "help",
    color: "text-teal-500",
  },
];



const WCAG_LEVELS = [
  {
    level: "A",
    title: "Level A — Minimum",
    color: "border-amber-400 bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    items: [
      "Non-text content has text alternatives",
      "Audio/video has captions",
      "Content doesn't rely on color alone",
      "Keyboard navigation supported",
      "No content flashes more than 3× per second",
    ],
  },
  {
    level: "AA",
    title: "Level AA — Standard",
    color: "border-accent-1 bg-accent-soft",
    badge: "bg-orange-100 text-orange-700",
    items: [
      "4.5:1 contrast ratio for normal text",
      "3:1 contrast ratio for large text",
      "Text resizable to 200% without loss",
      "Hover / focus content dismissible",
      "Status messages announced to screen readers",
    ],
  },
  {
    level: "AAA",
    title: "Level AAA — Enhanced",
    color: "border-violet-400 bg-violet-50",
    badge: "bg-violet-100 text-violet-700",
    items: [
      "7:1 contrast ratio for all text",
      "Sign language alternatives for audio",
      "Reading level ≤ lower secondary education",
      "No timing requirements for interaction",
      "Context-sensitive help provided",
    ],
  },
];

const FAQ_ITEMS = [
  {
    q: "Is KreateUI free to try?",
    a: "Yes. Our free tier includes up to 3 website analyses per month, access to the Marketplace, and the browser extension at no cost.",
  },
  {
    q: "What frameworks does the code generator support?",
    a: "We currently support React, Vue, plain HTML/CSS, and Tailwind CSS output. Angular and Svelte support are on our roadmap for Q3.",
  },
  {
    q: "How accurate is the WCAG compliance scanner?",
    a: "Our engine catches ~95% of automated WCAG issues. We recommend pairing it with manual testing for AAA-level compliance since some criteria require human judgment.",
  },
  {
    q: "Can I use KreateUI on private / staging sites?",
    a: "Yes. Use our browser extension to scan any page you can view, including localhost, staging environments, and password-protected sites.",
  },
  {
    q: "Do you store the website content you analyze?",
    a: "We only store the report metadata (URL, score, violations). Raw page content is processed in-memory and is never persisted to disk.",
  },
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function SectionTag({ children, color = "bg-accent-soft text-accent-1" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${color}`}
    >
      {children}
    </span>
  );
}

function CodeBlock({ code, language = "json" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative rounded-2xl bg-navy overflow-hidden border border-border-2">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-xs text-white/40 font-mono">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-sm">
            {copied ? "check" : "content_copy"}
          </span>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}



function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-border-1 rounded-2xl overflow-hidden bg-surface-1"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-bg-2 transition-colors"
      >
        <span className="size-8 rounded-full bg-accent-soft text-accent-1 flex items-center justify-center shrink-0 text-sm font-bold">
          {index + 1}
        </span>
        <span className="flex-1 font-semibold text-text-1">{item.q}</span>
        <span
          className="material-symbols-outlined text-text-3 shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          expand_more
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-text-2 leading-relaxed border-t border-border-1 pt-4">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRefs = useRef({});

  // Observe which section is in view
  useEffect(() => {
    const observers = NAV_SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-bg-1 text-text-1">

      {/* ── Hero Banner ── */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-navy via-navy-deep to-navy">
        {/* decorative circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 size-96 rounded-full bg-accent-1/10 blur-3xl" />
          <div className="absolute top-0 right-0 size-80 rounded-full bg-violet-500/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-sm font-medium mb-6"
          >
            <span className="material-symbols-outlined text-base text-accent-1">menu_book</span>
            Official Documentation — v2.1
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black !text-white leading-tight mb-5"
          >
            KreateUI{" "}
            <span className="text-gradient bg-gradient-to-r from-accent-1 to-orange-300 bg-clip-text text-transparent">
              Docs
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Everything you need to build, analyze, and ship production-ready,
            fully accessible websites — from first scan to final deploy.
          </motion.p>

          {/* Quick search-style chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-all"
              >
                <span className={`material-symbols-outlined text-base ${s.color}`}>
                  {s.icon}
                </span>
                {s.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Layout: Sticky sidebar + content ── */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 flex gap-10 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-surface-1 border border-border-1 rounded-2xl p-4 shadow-ambient">
            <p className="text-xs font-bold uppercase tracking-widest text-text-3 px-3 pb-3 border-b border-border-1 mb-2">
              Contents
            </p>
            <nav className="space-y-1">
              {NAV_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                    activeSection === s.id
                      ? "bg-accent-soft text-accent-1"
                      : "text-text-2 hover:bg-bg-2 hover:text-text-1"
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${activeSection === s.id ? "text-accent-1" : s.color}`}>
                    {s.icon}
                  </span>
                  {s.label}
                </button>
              ))}
            </nav>

            <div className="mt-6 p-3 bg-bg-2 rounded-xl border border-border-1">
              <p className="text-xs text-text-3 leading-relaxed">
                Need help? Visit our{" "}
                <Link to="/support" className="text-accent-1 hover:underline font-medium">
                  Support Center
                </Link>{" "}
                or{" "}
                <Link to="/contact" className="text-accent-1 hover:underline font-medium">
                  Contact Us
                </Link>
                .
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-24">

          {/* ══ OVERVIEW ══ */}
          <section id="overview" ref={(el) => (sectionRefs.current["overview"] = el)}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag>
                <span className="material-symbols-outlined text-xs">explore</span>
                Platform Overview
              </SectionTag>
              <h2 className="text-4xl font-black mt-4 mb-4">
                What is KreateUI?
              </h2>
              <p className="text-text-2 text-lg leading-relaxed mb-8">
                KreateUI is an AI-powered platform that analyses any public website for UI
                quality, accessibility violations, and design inconsistencies — then
                auto-generates WCAG-compliant, production-ready components to fix them.
              </p>

              {/* Architecture cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: "search", title: "Analyse", desc: "Crawl & score any URL against WCAG A/AA/AAA in seconds.", color: "bg-blue-50 text-blue-600 border-blue-100" },
                  { icon: "auto_fix_high", title: "Generate", desc: "AI creates accessible, on-brand components with real code.", color: "bg-accent-soft text-accent-1 border-orange-100" },
                  { icon: "rocket_launch", title: "Deploy", desc: "Copy code, use our CLI, or connect your CI pipeline directly.", color: "bg-violet-50 text-violet-600 border-violet-100" },
                ].map((c) => (
                  <div
                    key={c.title}
                    className={`p-5 rounded-2xl border ${c.color} flex flex-col gap-3`}
                  >
                    <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                    <h3 className="font-bold text-text-1">{c.title}</h3>
                    <p className="text-sm text-text-2">{c.desc}</p>
                  </div>
                ))}
              </div>

              <CodeBlock
                language="bash — Quick Start"
                code={`# Install the KreateUI CLI
npm install -g @kreateui/cli

# Analyse a website
kreate analyze https://yourwebsite.com

# Generate a WCAG-AA button component
kreate generate --component button --framework react`}
              />
            </motion.div>
          </section>

          {/* ══ GETTING STARTED ══ */}
          <section id="getting-started">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag color="bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-xs">rocket_launch</span>
                Getting Started
              </SectionTag>
              <h2 className="text-4xl font-black mt-4 mb-4">
                Up and running in 5 minutes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Create your account",
                    desc: "Sign up for free — no credit card required. Get 3 free analyses per month forever.",
                    code: null,
                  },
                  {
                    step: "02",
                    title: "Paste your URL",
                    desc: "Enter any public website URL in the Analyze dashboard. Our crawler handles the rest.",
                    code: "https://your-website.com",
                  },
                  {
                    step: "03",
                    title: "Review your report",
                    desc: "Get a full breakdown of violations, contrast failures, and missing ARIA labels — with severity scores.",
                    code: null,
                  },
                  {
                    step: "04",
                    title: "Generate fixes",
                    desc: "Click any issue and receive an AI-generated, drop-in replacement component in your chosen framework.",
                    code: `// Auto-generated accessible button
<button
  type="button"
  aria-label="Submit contact form"
  className="btn-primary focus-visible:ring-2"
>
  Submit
</button>`,
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="shrink-0 size-10 rounded-xl bg-navy text-white font-black text-sm flex items-center justify-center">
                      {s.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text-1 mb-1">{s.title}</h3>
                      <p className="text-text-2 text-sm mb-3">{s.desc}</p>
                      {s.code && <CodeBlock language="jsx" code={s.code} />}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>


          {/* ══ WCAG COMPLIANCE ══ */}
          <section id="wcag">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag color="bg-amber-50 text-amber-600">
                <span className="material-symbols-outlined text-xs">accessibility_new</span>
                WCAG Compliance
              </SectionTag>
              <h2 className="text-4xl font-black mt-4 mb-2">
                Understanding WCAG Levels
              </h2>
              <p className="text-text-2 text-lg leading-relaxed mb-10">
                The Web Content Accessibility Guidelines (WCAG) define three levels of
                conformance. KreateUI checks all three and lets you choose your target
                standard.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {WCAG_LEVELS.map((lvl, i) => (
                  <motion.div
                    key={lvl.level}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`rounded-2xl border-2 p-6 ${lvl.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-black ${lvl.badge}`}>
                        {lvl.level}
                      </span>
                      <h3 className="font-black text-text-1 text-sm">{lvl.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {lvl.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-text-2"
                        >
                          <span className="material-symbols-outlined text-sm text-emerald-500 shrink-0 mt-0.5">
                            check_circle
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ══ BROWSER EXTENSION ══ */}
          <section id="browser-extension">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag color="bg-pink-50 text-pink-600">
                <span className="material-symbols-outlined text-xs">extension</span>
                Browser Extension
              </SectionTag>
              <h2 className="text-4xl font-black mt-4 mb-4">
                Scan any page, anywhere
              </h2>
              <p className="text-text-2 text-lg leading-relaxed mb-8">
                Our Chrome & Firefox extension lets you run a full accessibility audit on
                any page you can view — including localhost, staging environments, and
                pages behind authentication.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {[
                  { icon: "bug_report", title: "Instant overlay", desc: "Highlights violations directly on the page with visual badges.", color: "text-red-500" },
                  { icon: "palette", title: "Contrast checker", desc: "Real-time color contrast ratio for any element you hover.", color: "text-accent-1" },
                  { icon: "keyboard", title: "Keyboard nav tester", desc: "Simulates Tab/Shift+Tab navigation and shows focus path.", color: "text-blue-500" },
                  { icon: "download", title: "Export to dashboard", desc: "Send any scan to your KreateUI dashboard with one click.", color: "text-emerald-500" },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="flex gap-4 p-5 bg-surface-1 border border-border-1 rounded-2xl hover:shadow-ambient-lg transition-shadow"
                  >
                    <span className={`material-symbols-outlined text-2xl shrink-0 ${f.color}`}>
                      {f.icon}
                    </span>
                    <div>
                      <h3 className="font-bold text-text-1 mb-1">{f.title}</h3>
                      <p className="text-sm text-text-2">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>


            </motion.div>
          </section>

          {/* ══ FAQ ══ */}
          <section id="faq">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag color="bg-teal-50 text-teal-600">
                <span className="material-symbols-outlined text-xs">help</span>
                FAQ
              </SectionTag>
              <h2 className="text-4xl font-black mt-4 mb-2">
                Frequently asked questions
              </h2>
              <p className="text-text-2 text-lg leading-relaxed mb-10">
                Quick answers to the questions we hear most often.
              </p>
              <div className="space-y-3">
                {FAQ_ITEMS.map((item, i) => (
                  <FaqItem key={i} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          </section>

          {/* ══ CTA ══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-navy to-navy-deep p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 size-64 rounded-full bg-accent-1/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-violet-500/10 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Ready to build accessible websites?
              </h2>
              <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of teams shipping production-ready, WCAG-compliant UI in
                record time.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-8 py-3.5 bg-accent-1 hover:bg-accent-hover text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-accent-1/30"
                >
                  Start for Free
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>
          </motion.div>

        </main>
      </div>

    </div>
  );
}
