import { NavLink } from "react-router-dom";
import useAuthStore from "shared/useAuthStore";

// ── Navigation config ─────────────────────────────────────────────────────────
// Centralised here so adding/removing nav items never touches JSX.
// Each entry is a plain object — no logic, just data.
export const adminNav = [
  { name: "Dashboard", path: "/admin/dash", icon: "📊" },
  { name: "Users", path: "/admin/users", icon: "👥" },
  { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  { name: "Profile", path: "/admin/profile", icon: "👤" },
];

// ── Style helpers ─────────────────────────────────────────────────────────────
// Extracted so the JSX stays readable. isActive comes from NavLink's render-prop.
const navLinkClass = (isActive: boolean) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-indigo-600 text-white"
      : "text-gray-400 hover:bg-white/5 hover:text-white"
  }`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdminSidebar() {
  // Pull the logout action from your global auth store.
  // Only subscribing to `logout` so the sidebar never re-renders on user changes.
  // const { clearUserAuth } = useAuthStore();
  const clearUserAuth = useAuthStore((state) => state.clearUserAuth);

  return (
    <aside className="w-56 bg-[#0f1221] border-r border-white/10 p-4 flex flex-col">
      {/* ── Nav links (grows to fill space) ── */}
      <nav className="flex flex-col gap-1 flex-1">
        {adminNav.map(({ name, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => navLinkClass(isActive)}
          >
            <span>{icon}</span>
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 my-3" />

      <button
        onClick={() => clearUserAuth()}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                   text-red-400 hover:bg-red-500/10 hover:text-red-300
                   transition-colors w-full text-left"
      >
        <span>🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}
