import React from "react";
import { motion } from "framer-motion";
import { LineChart, Accessibility, TerminalSquare, Users } from "lucide-react";

const ITEMS = [
  {
    icon: <LineChart className="size-6" />,
    title: "Data-Informed, Not Data-Led",
    desc:
      "We believe metrics are vital, but empathy is essential. We use AI to identify friction points that human testing might miss, combining algorithmic precision with qualitative human insight.",
  },
  {
    icon: <Accessibility className="size-6" />,
    title: "Accessibility by Default",
    desc:
      "Accessibility is not a feature or a phase—it is a foundation. We empower designers and developers to bake inclusivity into their code from the very first line.",
  },
  {
    icon: <TerminalSquare className="size-6" />,
    title: "Developer-First Integration",
    desc:
      "Tools that slow down the workflow don't get used. We build invisible scaffolding that assists developers without disrupting their creative rhythm or existing toolchains.",
  },
  {
    icon: <Users className="size-6" />,
    title: "Universal Design",
    desc:
      "Good design is universal. By solving for the edges, we make the experience better for everyone. Our platform scales from simple blogs to complex enterprise applications.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function PhilosophySection() {
  return (
    <section className="w-full bg-surface-1 py-10 md:py-12 flex justify-center relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-linear-to-b from-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none translate-x-[20%] translate-y-[-20%]" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 md:mb-24 text-center text-text-1"
        >
          Our Philosophy
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-10 md:gap-16"
        >
          {ITEMS.map((x, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group flex flex-col gap-6 p-8 rounded-3xl bg-surface-2 border border-border-1 hover:border-primary/50 transition-colors duration-300 shadow-sm hover:shadow-primary/5"
            >
              <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {x.icon}
              </div>

              <h3 className="text-2xl font-bold text-text-1 group-hover:text-primary transition-colors duration-300">{x.title}</h3>
              <p className="text-text-3 text-lg leading-relaxed">{x.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
