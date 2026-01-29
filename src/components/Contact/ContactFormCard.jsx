// src/pages/Contact/sections/ContactFormCard.jsx
import React, { useMemo, useState } from "react";
import { Button, Card, Input } from "../Common";

const MAX = 1000;

export default function ContactFormCard({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const count = message.length;
  const remaining = MAX - count;

  const canSubmit = useMemo(() => {
    return name.trim() && email.trim() && message.trim() && count <= MAX;
  }, [name, email, message, count]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    onSubmit?.({ name, email, url, message });
  };

  return (
    <Card hoverable="true" className="bg-surface-1 border border-border-1 rounded-xl p-6 sm:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-text-1 mb-6">Send us a message</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            id="name"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            id="email"
            label="Work Email"
            type="email"
            placeholder="john@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Input
          id="url"
          label="Website URL (Optional)"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-2" htmlFor="message">
            Message
          </label>

          {/* If you have a Common Textarea component, replace this block with it */}
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project or inquiry..."
            rows={5}
            maxLength={MAX}
            className="w-full px-4 py-3 rounded-lg bg-bg-2 border border-border-1 focus:border-primary focus:ring-1 focus:ring-primary text-text-1 transition-all outline-none resize-none"
            required
          />

          <div className="flex justify-end">
            <span className={`text-xs ${remaining < 0 ? "text-danger" : "text-text-3"}`}>
              {count} / {MAX} characters
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full sm:w-auto min-w-45 h-12"
            isDisabled={!canSubmit}
            iconRight={<span className="material-symbols-outlined text-[20px]">send</span>}
          >
            Send Message
          </Button>

          {/* optional helper text on mobile */}
          <p className="text-xs text-text-3 leading-relaxed sm:hidden">
            By submitting, you agree to our Privacy Policy.
          </p>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t border-border-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-xs text-text-3 leading-relaxed max-w-sm hidden sm:block">
          By submitting this form, you agree to our processing of your personal data as described in our Privacy Policy.
        </p>

        <div className="flex gap-4">
          <a className="text-text-3 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined" aria-hidden="true">
              brand_family
            </span>
          </a>
          <a className="text-text-3 hover:text-primary transition-colors" href="#">
            <span className="material-symbols-outlined" aria-hidden="true">
              terminal
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
}
