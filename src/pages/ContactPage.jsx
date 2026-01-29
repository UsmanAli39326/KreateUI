import React from "react";
import ContactHeading from "../components/Contact/ContactHeading";
import ContactInfoColumn from "../components/Contact/ContactInfoColumn";
import ContactFormCard from "../components/Contact/ContactFormCard";
import ContactMap from "../components/Contact/ContactMap";

export default function ContactPageContent() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-20">
      <ContactHeading />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-5">
          <ContactInfoColumn />
        </div>

        <div className="lg:col-span-7">
          <ContactFormCard />
        </div>
      </div>

      <ContactMap className="mt-14 sm:mt-20" />
    </main>
  );
}
