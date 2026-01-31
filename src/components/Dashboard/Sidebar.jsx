import React from "react";
import { Link } from "react-router-dom";
import nav from "@/assets/api/dashboardNavbar.json";
import UpgradeCard from "@/components/Dashboard/UpgradeCard";

function Icon({ name }) {
  const cls = "size-5";
  const common = { className: cls, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };

  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <path d="M4 4h7v7H4z" />
          <path d="M13 4h7v7h-7z" />
          <path d="M4 13h7v7H4z" />
          <path d="M13 13h7v7h-7z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 2l9 5-9 5-9-5 9-5z" />
          <path d="M3 12l9 5 9-5" />
          <path d="M3 17l9 5 9-5" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
          <path d="M19.4 15a7.8 7.8 0 0 0 .1-2l2-1.2-2-3.5-2.3.7a7.7 7.7 0 0 0-1.7-1l-.3-2.4H9.8l-.3 2.4a7.7 7.7 0 0 0-1.7 1l-2.3-.7-2 3.5 2 1.2a7.8 7.8 0 0 0 .1 2l-2 1.2 2 3.5 2.3-.7c.5.4 1.1.8 1.7 1l.3 2.4h4.4l.3-2.4c.6-.2 1.2-.6 1.7-1l2.3.7 2-3.5-2-1.2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ active, onClose }) {
  const topItems = nav.filter((n) => n.id !== "settings");
  const settings = nav.find((n) => n.id === "settings");

  const NavLink = onClose ? 'a' : Link;
  const getLinkProps = (item) => {
    if (onClose) {
      return { href: item.href, onClick: () => onClose() };
    }
    return { to: item.href };
  };

  return (
    <aside className="w-64 border-r border-border-1 flex flex-col h-screen bg-bg-1">
      {/* Mobile header (only in drawer mode) */}
      {onClose ? (
        <div className="lg:hidden p-4 flex items-center justify-between border-b border-border-1">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-accent-1 rounded-lg flex items-center justify-center text-white">
              <span className="text-sm font-bold">AI</span>
            </div>
            <div className="font-bold text-text-1">AI ENHANCE</div>
          </div>

          <button
            type="button"
            className="p-2 rounded-lg hover:bg-surface-2 text-text-2"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      ) : null}

      {/* Brand (desktop + also visible inside drawer below mobile header) */}
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-accent-1 rounded-lg flex items-center justify-center text-white">
          <span className="text-sm font-bold">AI</span>
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-bold tracking-tight text-text-1">AI ENHANCE</h1>
          <p className="text-[10px] text-text-3 font-medium uppercase tracking-widest">
            Pro Workspace
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
        {topItems.map((item) => {
          const isActive = item.id === active;
          return (
            <NavLink
              key={item.id}
              {...getLinkProps(item)}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-1/10 text-accent-1"
                  : "text-text-2 hover:bg-surface-2 hover:text-text-1",
              ].join(" ")}
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          );
        })}

        <div className="my-4 border-t border-border-1" />

        {settings ? (
          <NavLink
            {...getLinkProps(settings)}
            className={[
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              settings.id === active
                ? "bg-accent-1/10 text-accent-1"
                : "text-text-2 hover:bg-surface-2 hover:text-text-1",
            ].join(" ")}
          >
            <Icon name={settings.icon} />
            {settings.label}
          </NavLink>
        ) : null}
      </nav>

      {/* Upgrade */}
      <div className="p-4 border-t border-border-1">
        <UpgradeCard />
      </div>
    </aside>
  );
}

