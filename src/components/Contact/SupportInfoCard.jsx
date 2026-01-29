// src/pages/Contact/sections/SupportInfoCard.jsx
import React from "react";
import { Card } from "../Common";

export default function SupportInfoCard({ icon, title, desc }) {
  return (
    <Card hoverable="true" className="p-6 rounded-xl border border-border-1 bg-surface-1">
      <div className="flex items-center gap-3 mb-3 text-primary">
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
        <h3 className="font-bold text-text-1 text-lg">{title}</h3>
      </div>

      <p className="text-text-3 text-sm leading-relaxed">{desc}</p>
    </Card>
  );
}
