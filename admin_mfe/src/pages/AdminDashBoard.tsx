import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { GROWTH_DATA, MOCK_USERS, SIGNUP_DATA } from "../mocks/Mock.User.data";
import StatCard from "../components/StatCard";
import CustomTooltip from "../components/CustomTooltip";

// ── Derived stats ─────────────────────────────────────────────────────────────

const totalUsers = MOCK_USERS.length;
const adminCount = MOCK_USERS.filter((u) => u.role === "ADMIN").length;
const modCount = MOCK_USERS.filter((u) => u.role === "MODERATOR").length;
const userCount = MOCK_USERS.filter((u) => u.role === "USER").length;

const prevMonthUsers = GROWTH_DATA[GROWTH_DATA.length - 2].users;
const currMonthUsers = GROWTH_DATA[GROWTH_DATA.length - 1].users;
const growthRate = (
  ((currMonthUsers - prevMonthUsers) / prevMonthUsers) *
  100
).toFixed(1);

const ROLE_DATA = [
  { name: "Users", value: userCount, color: "#6366f1" },
  { name: "Admins", value: adminCount, color: "#818cf8" },
  { name: "Moderators", value: modCount, color: "#c7d2fe" },
];

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "text-indigo-400 bg-indigo-500/10",
  MODERATOR: "text-sky-400 bg-sky-500/10",
  USER: "text-gray-300 bg-white/5",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 text-white">
      {/* Page title */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-0.5">
          Platform overview · March 2026
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Total Users"
          value={currMonthUsers.toLocaleString()}
          sub="All registered accounts"
          accent="#6366f1"
          icon="👥"
        />
        <StatCard
          label="Growth Rate"
          value={`+${growthRate}%`}
          sub="vs previous month"
          accent="#22d3ee"
          icon="📈"
        />
        <StatCard
          label="New This Week"
          value={SIGNUP_DATA.reduce((s, d) => s + d.signups, 0)}
          sub="Daily signups · last 7 days"
          accent="#a78bfa"
          icon="🆕"
        />
        <StatCard
          label="Admins"
          value={adminCount}
          sub={`${modCount} moderator${modCount !== 1 ? "s" : ""}`}
          accent="#f59e0b"
          icon="🛡️"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* User growth area chart */}
        <div className="xl:col-span-2 rounded-xl border border-white/8 bg-[#0f1221] p-5">
          <p className="text-sm font-semibold text-gray-300 mb-1">
            User Growth
          </p>
          <p className="text-xs text-gray-600 mb-4">
            Total registered users over 6 months
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={GROWTH_DATA}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ffffff08" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#userGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Role distribution donut */}
        <div className="rounded-xl border border-white/8 bg-[#0f1221] p-5 flex flex-col">
          <p className="text-sm font-semibold text-gray-300 mb-1">
            Role Distribution
          </p>
          <p className="text-xs text-gray-600 mb-4">By account type</p>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={ROLE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {ROLE_DATA.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0f1221",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#9ca3af" }}
                  itemStyle={{ color: "#e5e7eb" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 mt-2">
            {ROLE_DATA.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: r.color }}
                  />
                  <span className="text-gray-400">{r.name}</span>
                </span>
                <span className="font-semibold text-gray-200">{r.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Weekly signups bar-ish line chart */}
      <div className="rounded-xl border border-white/8 bg-[#0f1221] p-5">
        <p className="text-sm font-semibold text-gray-300 mb-1">
          Daily Signups — This Week
        </p>
        <p className="text-xs text-gray-600 mb-4">New accounts per day</p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={SIGNUP_DATA}>
            <CartesianGrid stroke="#ffffff08" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="signups"
              stroke="#818cf8"
              strokeWidth={2}
              dot={{ r: 3, fill: "#818cf8", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#818cf8", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
