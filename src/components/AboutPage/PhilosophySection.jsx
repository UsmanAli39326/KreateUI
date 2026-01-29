// src/pages/About/sections/PhilosophySection.jsx
import React from "react";

const ITEMS = [
  {
    icon: "analytics",
    title: "Data-Informed, Not Data-Led",
    desc:
      "We believe metrics are vital, but empathy is essential. We use AI to identify friction points that human testing might miss, combining algorithmic precision with qualitative human insight.",
  },
  {
    icon: "accessibility_new",
    title: "Accessibility by Default",
    desc:
      "Accessibility is not a feature or a phase—it is a foundation. We empower designers and developers to bake inclusivity into their code from the very first line.",
  },
  {
    icon: "terminal",
    title: "Developer-First Integration",
    desc:
      "Tools that slow down the workflow don't get used. We build invisible scaffolding that assists developers without disrupting their creative rhythm or existing toolchains.",
  },
  {
    icon: "diversity_3",
    title: "Universal Design",
    desc:
      "Good design is universal. By solving for the edges, we make the experience better for everyone. Our platform scales from simple blogs to complex enterprise applications.",
  },
];

export default function PhilosophySection() {
  return (
    <section className="w-full bg-surface-1 py-20 md:py-24 flex justify-center">
      <div className="max-w-240 w-full px-6">
        <h2 className="text-3xl font-bold mb-12 md:mb-16 text-center text-text-1">
          Our Philosophy
        </h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {ITEMS.map((x) => (
            <div key={x.title} className="flex flex-col gap-6">
              <div className="size-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">{x.icon}</span>
              </div>

              <h3 className="text-xl font-bold text-text-1">{x.title}</h3>
              <p className="text-text-3 leading-relaxed">{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
