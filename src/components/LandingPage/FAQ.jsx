import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does the AI understand design intent?",
    answer:
      "Our engine uses advanced visual and structural analysis to interpret layouts. It identifies patterns, spatial relationships, and component hierarchies to generate accurate, semantic code that matches your intent.",
    icon: "psychology",
  },
  {
    question: "Is the generated code accessible?",
    answer:
      "Yes, accessibility is our core principle. The engine automatically injects proper ARIA attributes, manages focus states, ensures keyboard navigability, and validates against WCAG 2.2 standards out of the box.",
    icon: "accessibility_new",
  },
  {
    question: "Can I use it with my existing React codebase?",
    answer:
      "Absolutely. Kreate UI generates clean, framework-agnostic React components styled with Tailwind CSS, making them drop-in compatible with any modern stack — Next.js, Vite, Remix, and more.",
    icon: "integration_instructions",
  },
  {
    question: "What export formats are supported?",
    answer:
      "We support React (JSX/TSX), plain HTML/CSS, and Vue.js. Enterprise plans unlock custom output templates so code conforms to your team's specific coding standards and file structure.",
    icon: "file_export",
  },
  {
    question: "Do you offer enterprise support?",
    answer:
      "Yes. Enterprise plans include a dedicated account manager, custom model training on your design system, SLA guarantees, SSO integration, and audit logs. Contact our sales team to get started.",
    icon: "business",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 sm:py-32 bg-background-main relative overflow-hidden">
      {/* background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,_#E8743B06_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left column: heading */}
          <div className="lg:col-span-2 lg:sticky lg:top-32">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight font-[var(--font-display)] mb-6">
              Questions?<br />
              <span className="text-text-3">We've got<br />answers.</span>
            </h2>
            <p className="text-text-2 text-lg leading-relaxed mb-8">
              Can't find what you're looking for? Reach out to our team directly.
            </p>
            <a
              href="mailto:hello@kreateui.com"
              className="inline-flex items-center gap-2 bg-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-hover transition-colors shadow-ambient"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              Contact support
            </a>
          </div>

          {/* Right column: accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-primary/30 bg-white shadow-[0_8px_30px_-10px_rgba(232,116,59,0.15)]"
                      : "border-border-1 bg-white hover:border-border-2 hover:shadow-ambient"
                  }`}
                >
                  <button
                    className="w-full px-6 py-5 text-left flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset cursor-pointer group"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen ? "bg-primary text-white" : "bg-bg-2 text-text-3 group-hover:bg-accent-soft group-hover:text-primary"
                    }`}>
                      <span className="material-symbols-outlined text-base">{faq.icon}</span>
                    </div>

                    <span className={`flex-1 font-bold text-base sm:text-lg transition-colors ${isOpen ? "text-navy" : "text-text-1"}`}>
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`material-symbols-outlined flex-shrink-0 transition-colors ${isOpen ? "text-primary" : "text-text-3"}`}
                    >
                      expand_more
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-6 ml-14 text-text-2 leading-relaxed text-base border-t border-border-1 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
