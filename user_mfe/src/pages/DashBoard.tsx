import React from "react";
import useAuthStore from "shared/useAuthStore";
import { getGreeting, getInitials } from "../utils/greeting";

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Something went wrong user is not here</div>;
  }
  return (
    <div className="relative max-w-6xl mx-auto px-6 py-10">
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px]
                        rounded-full bg-[#5b7cf6]/8 blur-[120px]"
        />
      </div>

      {/* Welcome banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#5b7cf6]/30"
            />
          ) : (
            <div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5b7cf6]/30 to-[#3a5af0]/20
                            ring-2 ring-[#5b7cf6]/30 flex items-center justify-center
                            text-lg font-bold text-[#7b93fa]"
            >
              {getInitials(user.name)}
            </div>
          )}
          <div>
            <p className="text-sm text-slate-500 mb-0.5">{getGreeting()},</p>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              {user.name} 👋
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 capitalize">
              {user.role} · {user.email}
            </p>
          </div>
        </div>
        <span
          className="self-start sm:self-center px-3 py-1.5 rounded-full border border-[#5b7cf6]/30
                         bg-[#5b7cf6]/10 text-xs font-semibold text-[#7b93fa] capitalize"
        >
          {user.role}
        </span>
      </div>
    </div>
  );
};

export default DashboardPage;
