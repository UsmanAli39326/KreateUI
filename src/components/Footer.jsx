import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { name: "Features", href: "/features" },
    { name: "Docs", href: "/docs" },
    { name: "Status", href: "/status" },
    { name: "Support", href: "/support" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="py-16 border-t border-border-1 bg-[#090b0e] text-text-1">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-black tracking-tighter flex items-center gap-2 mb-6">
              <span className="size-8 bg-accent-1 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
              </span>
              KREATE UI
            </Link>
            <p className="text-text-3 max-w-sm leading-relaxed">
              The world's first AI-driven interface enhancement engine. We're on a mission to make the web accessible and beautiful for everyone, automatically.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-text-2">Platform</h4>
            <ul className="space-y-4 text-sm text-text-3">
              {links.slice(0, 4).map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-accent-1 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-text-2">Legal & Support</h4>
            <ul className="space-y-4 text-sm text-text-3">
              {links.slice(4).map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="hover:text-accent-1 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-1 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-text-3 text-sm font-medium">
            © 2024 KREATE UI • AI DRIVEN INTERFACE ENHANCEMENT
          </span>
          <div className="flex gap-6">
            <a href="#" className="text-text-3 hover:text-white transition-colors">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a href="#" className="text-text-3 hover:text-white transition-colors">
              <span className="material-symbols-outlined">rss_feed</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
