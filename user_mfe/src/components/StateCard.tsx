interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  positive?: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  positive,
  icon,
}) => (
  <div
    className="flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]
                  hover:bg-white/[0.05] transition-colors duration-200"
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
        {label}
      </span>
      <span className="w-9 h-9 rounded-xl bg-[#5b7cf6]/10 flex items-center justify-center text-[#7b93fa]">
        {icon}
      </span>
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      {delta && (
        <p
          className={`text-xs mt-1 font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}
        >
          {positive ? "↑" : "↓"} {delta}
        </p>
      )}
    </div>
  </div>
);
