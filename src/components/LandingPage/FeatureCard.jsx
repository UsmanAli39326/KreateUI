export default function FeatureCard({ icon, bgIcon, title, description, items }) {
  return (
    <div className="group p-6 sm:p-8 rounded-2xl bg-[#171a21] border border-white/5 hover:border-primary/30 transition-all relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <span className="material-symbols-outlined text-7xl sm:text-8xl md:text-9xl">
          {bgIcon}
        </span>
      </div>

      <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 sm:mb-6">
        <span className="material-symbols-outlined">{icon}</span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
        {title}
      </h3>

      <p className="text-slate-400 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
        {description}
      </p>

      <ul className="space-y-2.5 sm:space-y-3">
        {items.map((label) => (
          <li
            key={label}
            className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[16px] text-green-500">
              check_circle
            </span>
            <span className="wrap-break-word">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
