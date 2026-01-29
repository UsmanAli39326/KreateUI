// src/pages/Contact/sections/ContactDetails.jsx
import React from "react";

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider font-bold text-text-3 mb-1">
          {label}
        </p>
        <p className="text-text-1 font-medium wrap-break-word">{value}</p>
      </div>
    </div>
  );
}

export default function ContactDetails() {
  return (
    <div className="space-y-6 pt-2 sm:pt-4">
      <DetailRow icon="mail" label="Support Email" value="support@uiplatform.ai" />
      <DetailRow icon="location_on" label="Office Location" value="101 Tech Way, San Francisco, CA 94105" />
    </div>
  );
}
