// src/pages/About/sections/TeamSection.jsx
import React from "react";
import { Button, Card } from "../Common";

const TEAM = [
  {
    name: "Alex Rivera",
    role: "Founding Engineer",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAi9sK3vPSPq0wRt10_uugH2kP2boSythP84QKDoIn899Inf8X6HATkSwMMG4NlQaaBSSfu77ZHIRw4uwWFRE5sd8HUhzc7g1-UvTm7mjTiJmqHES2dG2EkDSne3EAT3UALmfKejw3Hl7Q1TK-tJvR0qjYpgEOECEuwyyVbdCtfLMSWGVlnsoFT3OVPnXrz-tdw6sNklrYLchQxha1enBzzsdiUueobq7nMH7gF4g3QN_m8TsAlaEjqLMI6fjEfGTMXlTkJC2MC_9WG",
    icons: ["code", "link"],
  },
  {
    name: "Sarah Chen",
    role: "Lead UX Researcher",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNYkCEZwhAnty4qy3FjFkktV_OlFMpMpXA3Z00-R1RRPX7zSYGnaDZQy4o3Tpp2JIc9I-S7Fu9JaVFN7q4YZ1UOrzTJSVpuZn9ns03DCUc5hUMNrBKz3AD0RxD0U_J31E14XlYyvmdlrM2VwcQK3Yzs57T952Ecz49Bk0llG4pMj6vwuEn8P7DFDwAB_1lfEV6pccUfy_PU0JXdVWfI8RxAgWLNve8F7Qji-jmj-0EacEuhp0JIN52FEf9SYKDTE7PF2IgFongBTfp",
    icons: ["palette", "link"],
  },
  {
    name: "Marcus Thorne",
    role: "AI Specialist",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuG6GNxdT34qu7t8wij9ZIAEhyMQfcMCNnd3N03RPEsmAxXfX72aAJWKdZM0VqoD4qyZklaqLtqqa93fTZvuM_3QRTb_rHgwcd_ZzzOdSVQ9Pn-_PiM3pcPh3zktIcga_z3HDs6tK0foWVF2NA5KBCVOyf81ShJ07Iggoth317hyN7OUGmgdplrZafebhOlZwJQOXgn2Vudx9WRStQ17FlirNICObJyG68KDfCvokbmy1qRYVRDALeosP7qlzdAhF9l0cGWvk0vu4V",
    icons: ["psychology", "link"],
  },
];

export default function TeamSection({ onViewOpenings }) {
  return (
    <section className="max-w-240 w-full px-6 py-20 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-text-1">The Team</h2>
          <p className="text-text-3">
            A group of engineers, designers, and researchers dedicated to making
            the web more usable.
          </p>
        </div>

        <Button
          variant="tertiary"
          className="text-primary hover:underline"
          onClick={onViewOpenings}
          iconRight={<span className="material-symbols-outlined text-sm">arrow_forward</span>}
        >
          View Openings
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEAM.map((m) => (
          <Card
            key={m.name}
            className="group bg-surface-1 border border-border-1 p-6 rounded-xl transition-all hover:border-primary/50"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 bg-white/5">
              <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-xl font-bold mb-1 text-text-1">{m.name}</h3>
            <p className="text-primary text-sm font-medium mb-4">{m.role}</p>

            <div className="flex gap-3">
              {m.icons.map((ic) => (
                <a key={ic} href="#" className="text-text-3 hover:text-text-1 transition-colors">
                  <span className="material-symbols-outlined text-xl">{ic}</span>
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
