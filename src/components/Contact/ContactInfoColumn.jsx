// src/pages/Contact/sections/ContactInfoColumn.jsx
import React from "react";
import SupportInfoCard from "./SupportInfoCard";
import ContactDetails from "./ContactDetails";
import DocsPanel from "./DocsPanel";

export default function ContactInfoColumn() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="grid grid-cols-1 gap-6">
        <SupportInfoCard
          icon="engineering"
          title="Technical Support"
          desc="For API integration challenges, bug reporting, and detailed UX accessibility audits. Our engineering team responds within 12–24 hours."
        />

        <SupportInfoCard
          icon="payments"
          title="Sales Inquiry"
          desc="Looking for enterprise licensing or custom AI training models for your organization? Get in touch with our solutions architects."
        />
      </div>

      <ContactDetails />

      <DocsPanel />
    </div>
  );
}
