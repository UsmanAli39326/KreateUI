import FeatureCard from "./FeatureCard";

export default function Features() {
  const cards = [
    {
      bgIcon: "shield",
      icon: "verified_user",
      title: "Accessibility Audits",
      description:
        "Instant WCAG 2.1/2.2 compliance scanning with deep-link error reporting and screen reader simulations.",
      items: ["Contrast Verification", "Tab Order Flow", "Screen Reader Path"],
    },
    {
      bgIcon: "magic_button",
      icon: "auto_fix_high",
      title: "AI-Driven Fixes",
      description:
        "Automated CSS and ARIA label patches delivered directly to your codebase through seamless GitHub integrations.",
      items: ["One-Click PRs", "Smart ARIA Mapping", "Style Correction"],
    },
    {
      bgIcon: "category",
      icon: "storefront",
      title: "Design Marketplace",
      description:
        "Premium, accessible-first UI components optimized for React, Vue, and Tailwind with built-in accessibility.",
      items: ["Headless UI Kit", "Ready-to-copy Code", "Themeable Assets"],
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-bg-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:gap-4 mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-text-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-[720px] font-[var(--font-display)]">
            Engineered for Accessibility.
          </h2>
          <p className="text-text-2 text-base sm:text-lg max-w-[600px] leading-relaxed">
            Move beyond manual testing with automated scans that understand your code architecture and intent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {cards.map((c) => (
            <FeatureCard key={c.title} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
