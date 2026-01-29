import { useState } from "react";
import { Button, Drawer } from "../components/Common";
import { useNavigate,Link } from "react-router-dom";


export default function Navbar() {
  const links = [
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Marketplace", href: "#marketplace" },
    { label: "Pricing", href: "#pricing" },
  ];

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur bg-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="shrink-0">
              <img src="logo.jpeg" alt="Kreate UI Logo" className="w-12 h-12" />
            </div>
            <span className="font-bold tracking-tight text-white truncate">
              Kreate UI
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {links.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="main"
                size="sm"
                className="text-white hover:text-primary"
                onClick={() => {
                  // TODO: navigate to /auth
                  navigate("/auth");
                }}
              >
                Sign In
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  // TODO: navigate to /get-started
                  navigate("/dashboard");
                }}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu trigger */}
            <Button
              variant="secondary"
              size="sm"
              className="md:hidden h-10 w-10 px-0 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              icon={<span className="material-symbols-outlined">menu</span>}
            >
              {/* keep children for Button layout; visually hide */}
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
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-text-2 hover:bg-white/5 hover:text-text-1 transition"
            >
              {item.label}
            </a>
          ))}

          <div className="mt-4 pt-4 border-t border-border-2 flex flex-col gap-2">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setOpen(false);
                // TODO: navigate to /auth
              }}
            >
              Sign In
            </Button>

            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setOpen(false);
                // TODO: navigate to /get-started
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
