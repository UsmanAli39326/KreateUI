import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border-1 bg-bg-1">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Kreate UI" className="h-14 w-auto" />
          <span className="text-text-2 text-sm">
            Kreate UI © {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex gap-8 text-text-3 text-sm">
          {["Privacy", "Security", "Status", "Contact"].map(link => (
            <a key={link} href="#" className="hover:text-primary transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
