export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#090b0e]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="text-slate-400 text-sm">
          UI ENHANCE AI © 2024
        </span>

        <div className="flex gap-8 text-slate-500 text-sm">
          {["Privacy", "Security", "Status", "Contact"].map(link => (
            <a key={link} href="#" className="hover:text-white">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
