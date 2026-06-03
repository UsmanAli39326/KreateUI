import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
    case "home":
      return (
        <svg {...common}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M9 22V12h6v10" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ active, onClose }) {
  const { logout, isAdmin } = useAuth();
  const topItems = nav.filter((n) => n.id !== "settings");
  const settings = nav.find((n) => n.id === "settings");

  const linkClass = (isActive) =>
    [
      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
      isActive ? "bg-accent-1/10 text-accent-1" : "text-text-2 hover:bg-surface-2 hover:text-text-1",
    ].join(" ");

  const NavLink = onClose ? 'a' : Link;
  const getLinkProps = (item) => {
    if (onClose) {
      return { href: item.href, onClick: () => onClose() };
    }
    return { to: item.href };
  };

  return (
    <aside className="w-64 border-r border-border-1 flex flex-col h-screen bg-bg-1">
      {/* Brand & Mobile header */}
      <div className="p-4 lg:p-6 flex items-center justify-between gap-3 border-b lg:border-none border-border-1">
        <Link to="/" className="flex items-center min-w-0">
          <img src="/logo.png" alt="Kreate UI Logo" className="h-12 w-auto object-contain" />
        </Link>
        {onClose && (
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-surface-2 text-text-2"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
        {topItems.map((item) => {
          const isActive = item.id === active;
          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={onClose}
              className={linkClass(isActive)}
            >
              <Icon name={item.icon} />
              {item.label}
            </Link>
          );
        })}

        {/* Admin Section */}
        {isAdmin && (
          <>
            <div className="mt-6 mb-2 px-3 text-xs font-semibold text-text-3 uppercase tracking-wider">
              Admin
            </div>
            <Link
              to="/dashboard/admin/users"
              onClick={onClose}
              className={linkClass(active === "admin-users")}
            >
              <Icon name="users" />
              Users
            </Link>
            <Link
              to="/dashboard/admin/moderation"
              onClick={onClose}
              className={linkClass(active === "admin-moderation")}
            >
              <Icon name="shield" />
              Moderation
            </Link>
          </>
        )}

        <div className="my-4 border-t border-border-1" />

        {settings ? (
          <Link
            to={settings.href}
            onClick={onClose}
            className={linkClass(settings.id === active)}
          >
            <Icon name={settings.icon} />
            {settings.label}
          </Link>
        ) : null}

        <NavLink
          {...getLinkProps({ href: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-text-2 hover:bg-surface-2 hover:text-text-1 mt-auto w-full text-left"
        >
          <Icon name="home" />
          Back to Home
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-text-2 hover:bg-surface-2 hover:text-text-1 mt-1 text-left"
        >
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </button>
      </nav>

      {/* Upgrade */}
      <div className="p-4 border-t border-border-1">
        <UpgradeCard />
      </div>
    </aside>
  );
}