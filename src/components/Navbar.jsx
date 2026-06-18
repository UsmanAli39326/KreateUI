import { useState } from "react";
import { Button, Drawer } from "../components/Common";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    { label: "About", href: "/about", type: "route" },
    { label: "Contact Us", href: "/contact", type: "route" },
    { label: "Marketplace", href: "/marketplace", type: "route" },
    // { label: "Pricing", href: "/pricing", type: "route" },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const renderNavItem = (item) =>
    item.type === "route" ? (
      <Link
        key={item.label}
        to={item.href}
        className="text-text-2 hover:text-primary font-medium transition-colors"
        onClick={() => setOpen(false)}
      >
        {item.label}
      </Link>
    ) : (
      <a
        key={item.label}
        href={item.href}
        className="text-text-2 hover:text-primary font-medium transition-colors"
        onClick={() => setOpen(false)}
      >
        {item.label}
      </a>
    );

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-border-1 backdrop-blur-md bg-background-main/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="shrink-0">
              <img src="/logo.png" alt="Kreate UI Logo" className="h-14 w-auto" />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {links.map(renderNavItem)}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="tertiary"
                size="sm"
                className="text-navy font-semibold hover:text-primary"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/dashboard")}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu trigger */}
            <Button
              variant="secondary"
              size="sm"
              className="md:hidden h-10 w-10 px-0 rounded-lg bg-bg-2 border border-border-1 text-text-1 hover:bg-bg-3"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              icon={<span className="material-symbols-outlined">menu</span>}
            >
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={open}
        onClose={() => setOpen(false)}
        position="right"
        title="Menu"
        className="w-[320px] sm:w-95"
      >
        <div className="flex flex-col gap-2">
          {links.map(renderNavItem)}

          <div className="mt-4 pt-4 border-t border-border-1 flex flex-col gap-2">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                navigate("/auth");
                setOpen(false);
              }}
            >
              Sign In
            </Button>

            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                navigate("/dashboard");
                setOpen(false);
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
