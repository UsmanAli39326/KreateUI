import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    description: "Perfect for hobby projects and experiments.",
    popular: false,
    price: { monthly: 0, yearly: 0 },
    cta: "Get Started Free",
    ctaVariant: "secondary",
    features: [
      { label: "10 AI Generations / month", included: true },
      { label: "Community Support", included: true },
      { label: "Basic Export (HTML/CSS)", included: true },
      { label: "Private Repositories", included: false },
      { label: "Figma Integration", included: false },
      { label: "Priority AI Queue", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For professionals building client-grade products.",
    popular: true,
    price: { monthly: 29, yearly: 290 },
    cta: "Start Free Trial",
    ctaVariant: "primary",
    features: [
      { label: "Unlimited Generations", included: true },
      { label: "Priority AI Queue", included: true },
      { label: "Advanced Accessibility Fixes", included: true },
      { label: "Private Repositories", included: true },
      { label: "Figma Integration", included: true },
      { label: "Custom Model Training", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "Scale your design system across your organization.",
    popular: false,
    price: { monthly: 99, yearly: 990 },
    cta: "Contact Sales",
    ctaVariant: "dark",
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Dedicated Account Manager", included: true },
      { label: "Custom Model Training", included: true },
      { label: "SSO & Audit Logs", included: true },
      { label: "SLA Guarantees", included: true },
      { label: "Team Training Sessions", included: true },
    ],
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 sm:py-32 bg-bg-1 relative overflow-hidden">
      {/* bg decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border-2 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-border-2 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-4 font-[var(--font-display)]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-2 text-lg sm:text-xl">
            Choose the plan that fits your scale. No hidden fees, ever.
          </p>

          {/* Toggle */}
          <div className="mt-10 inline-flex items-center gap-4 bg-bg-2 border border-border-1 rounded-2xl p-2">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                !annual ? "bg-white text-navy shadow-ambient" : "text-text-3 hover:text-text-2"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                annual ? "bg-white text-navy shadow-ambient" : "text-text-3 hover:text-text-2"
              }`}
            >
              Yearly
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, idx) => {
            const price = annual ? tier.price.yearly : tier.price.monthly;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`relative flex flex-col rounded-3xl overflow-hidden ${
                  tier.popular ? "glow-border" : ""
                }`}
              >
                <div
                  className={`flex-1 flex flex-col p-8 ${
                    tier.popular
                      ? "bg-navy text-white"
                      : "bg-white border border-border-1"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-5 right-5">
                      <span className="bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Tier name */}
                  <div className="mb-8">
                    <h3
                      className={`text-xl font-extrabold mb-1 ${
                        tier.popular ? "text-white" : "text-navy"
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        tier.popular ? "text-white/60" : "text-text-2"
                      }`}
                    >
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={annual ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-baseline gap-1"
                      >
                        <span
                          className={`text-5xl font-black font-mono ${
                            tier.popular ? "text-white" : "text-navy"
                          }`}
                        >
                          ${price}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            tier.popular ? "text-white/50" : "text-text-3"
                          }`}
                        >
                          /{annual ? "yr" : "mo"}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                    {annual && price > 0 && (
                      <p className={`text-xs mt-1 ${tier.popular ? "text-white/40" : "text-text-3"}`}>
                        Billed annually · ${Math.round(price / 12)}/mo
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-3 mb-8">
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <span
                          className={`material-symbols-outlined text-[18px] flex-shrink-0 ${
                            feature.included
                              ? tier.popular
                                ? "text-primary"
                                : "text-primary"
                              : tier.popular
                              ? "text-white/20"
                              : "text-border-2"
                          }`}
                        >
                          {feature.included ? "check_circle" : "cancel"}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            feature.included
                              ? tier.popular
                                ? "text-white/90"
                                : "text-text-1"
                              : tier.popular
                              ? "text-white/30"
                              : "text-text-3 line-through"
                          }`}
                        >
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 rounded-xl font-extrabold text-base transition-all cursor-pointer ${
                      tier.ctaVariant === "primary"
                        ? "bg-primary text-white hover:bg-accent-hover shadow-lg shadow-primary/30"
                        : tier.ctaVariant === "dark"
                        ? "bg-navy text-white hover:bg-navy-hover border border-navy"
                        : "bg-bg-2 text-navy hover:bg-border-1 border border-border-1"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-text-3 text-sm mt-10 font-medium">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
