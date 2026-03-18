import React from "react";
import { Link } from "react-router-dom";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// 👇 swap with your real useAuth import
// import { useAuth } from "../context/AuthContext";
function useAuth() {
  return {
    user: {
      name: "Jerin James",
      email: "jerin@acme.com",
      role: "Admin",
      avatarUrl: "",
    },
  };
}

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

const ACTIVITY = [
  {
    id: "1",
    action: "Created user",
    target: "alice@acme.com",
    time: "2 min ago",
    type: "create" as const,
  },
  {
    id: "2",
    action: "Updated role",
    target: "bob@acme.com",
    time: "14 min ago",
    type: "update" as const,
  },
  {
    id: "3",
    action: "Deleted user",
    target: "old@acme.com",
    time: "1 hr ago",
    type: "delete" as const,
  },
  {
    id: "4",
    action: "Login detected",
    target: "admin@acme.com",
    time: "3 hr ago",
    type: "login" as const,
  },
];
const DOT = {
  create: "bg-emerald-400",
  update: "bg-[#5b7cf6]",
  delete: "bg-red-400",
  login: "bg-amber-400",
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    // ✅ No header here — it's already in App.tsx above <Outlet />
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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Users"
          value="1,284"
          delta="12 this week"
          positive
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <StatCard
          label="Active Now"
          value="47"
          delta="3 more than usual"
          positive
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        />
        <StatCard
          label="Roles"
          value="8"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
        />
        <StatCard
          label="Pending Invites"
          value="5"
          delta="2 expired"
          positive={false}
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-slate-200">
              Recent activity
            </h2>
            <Link
              to="/audit"
              className="text-xs text-[#7b93fa] hover:text-[#5b7cf6] transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {ACTIVITY.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${DOT[item.type]}`}
                />
                <p className="flex-1 text-sm text-slate-300">
                  <span className="font-medium">{item.action}</span>
                  {" — "}
                  <span className="text-slate-400">{item.target}</span>
                </p>
                <span className="text-xs text-slate-600 shrink-0">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
          <h2 className="text-sm font-semibold text-slate-200 mb-5">
            Quick actions
          </h2>
          <div className="flex flex-col gap-3">
            {[
              {
                label: "Invite user",
                desc: "Send an email invitation",
                to: "/users/invite",
              },
              {
                label: "Manage roles",
                desc: "Edit permissions & roles",
                to: "/roles",
              },
              {
                label: "View audit log",
                desc: "Track all system actions",
                to: "/audit",
              },
              {
                label: "Settings",
                desc: "Configure your workspace",
                to: "/settings",
              },
            ].map(({ label, desc, to }) => (
              <Link
                key={to}
                to={to}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.07]
                           bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#5b7cf6]/30
                           transition-all duration-200 group"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white">
                    {label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
