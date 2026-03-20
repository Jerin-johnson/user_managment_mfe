function StatCard({
  label,
  value,
  sub,
  accent,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  icon: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/8 bg-[#0f1221] p-5 flex flex-col gap-3">
      {/* decorative glow */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20"
        style={{ background: accent ?? "#6366f1" }}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
          {label}
        </span>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-3xl font-extrabold text-white tracking-tight">
        {value}
      </p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

export default StatCard;
