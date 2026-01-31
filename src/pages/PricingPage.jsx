import React, { useState } from "react";
import Button from "@/components/Common/Button";

function PricingCard({ tier, annual }) {
    const price = annual ? tier.price.yearly : tier.price.monthly;
    const isPopular = tier.popular;

    return (
        <div
            className={`relative flex flex-col p-8 rounded-2xl border ${isPopular ? "border-accent-1 shadow-lg shadow-accent-1/20 bg-surface-1" : "border-border-1 bg-surface-1/50"} transition-all duration-300 hover:-translate-y-1`}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-accent-1 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Most Popular
                    </span>
                </div>
            )}

            <div className="mb-8">
                <h3 className="text-lg font-bold text-text-1 mb-2">{tier.name}</h3>
                <p className="text-text-3 text-sm min-h-[40px]">{tier.description}</p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-1">${price}</span>
                <span className="text-text-3">/{annual ? "year" : "month"}</span>
            </div>

            <div className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <span className={`material-symbols-outlined text-[20px] ${feature.included ? "text-accent-1" : "text-text-3/50"}`}>
                            {feature.included ? "check_circle" : "cancel"}
                        </span>
                        <span className={`text-sm ${feature.included ? "text-text-2" : "text-text-3"}`}>{feature.label}</span>
                    </div>
                ))}
            </div>

            <Button variant={isPopular ? "primary" : "secondary"} fullWidth>
                {tier.cta}
            </Button>
        </div>
    );
}

const tiers = [
    {
        name: "Starter",
        description: "Perfect for hobby projects and experiments.",
        popular: false,
        price: { monthly: 0, yearly: 0 },
        cta: "Get Started Free",
        features: [
            { label: "Access to Free Templates", included: true },
            { label: "Community Support", included: true },
            { label: "Basic Analytics", included: true },
            { label: "Private Repositories", included: false },
            { label: "Premium Assets", included: false },
        ]
    },
    {
        name: "Pro Developer",
        description: "For professional developers building client sites.",
        popular: true,
        price: { monthly: 29, yearly: 290 },
        cta: "Start Free Trial",
        features: [
            { label: "Access to All Templates", included: true },
            { label: "Priority Email Support", included: true },
            { label: "Advanced Analytics", included: true },
            { label: "Unlimited Private Repos", included: true },
            { label: "Figma Source Files", included: true },
        ]
    },
    {
        name: "Team",
        description: "Scale your design system across your organization.",
        popular: false,
        price: { monthly: 99, yearly: 990 },
        cta: "Contact Sales",
        features: [
            { label: "Everything in Pro", included: true },
            { label: "Dedicated Account Manager", included: true },
            { label: "SSO & Audit Logs", included: true },
            { label: "Custom Contracts", included: true },
            { label: "Team Training", included: true },
        ]
    }
];

const faqs = [
    { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your plan at any time from your account settings. You'll stick to your plan until the end of the billing cycle." },
    { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact support for a full refund." },
    { q: "What happens to my projects if I downgrade?", a: "Your projects will remain accessible, but you may lose access to premium features like advanced analytics and private repo limits." },
    { q: "Do you offer student discounts?", a: "Yes! Students and non-profits can apply for a 50% discount. Contact our support team with proof of status." }
];

export default function PricingPage() {
    const [annual, setAnnual] = useState(true);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-text-1">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
                <p className="text-text-2 text-lg">Choose the plan that best fits your needs. No hidden fees, ever.</p>

                {/* Toggle */}
                <div className="mt-8 flex items-center justify-center gap-4">
                    <span className={`text-sm font-medium ${!annual ? "text-text-1" : "text-text-3"}`}>Monthly</span>
                    <button
                        onClick={() => setAnnual(!annual)}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${annual ? "bg-accent-1" : "bg-surface-2 border border-border-1"}`}
                    >
                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${annual ? "left-[calc(100%-1.75rem)]" : "left-1"}`} />
                    </button>
                    <span className={`text-sm font-medium ${annual ? "text-text-1" : "text-text-3"}`}>
                        Yearly <span className="text-accent-1 text-xs font-bold ml-1">(Save 20%)</span>
                    </span>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {tiers.map((tier, idx) => (
                    <PricingCard key={idx} tier={tier} annual={annual} />
                ))}
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((item, i) => (
                        <div key={i} className="p-6 rounded-xl bg-surface-1 border border-border-1">
                            <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                            <p className="text-text-2">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
