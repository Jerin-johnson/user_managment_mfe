import { NavLink } from "react-router-dom";

export const adminNav = [
  { name: "Users", path: "/admin/users", icon: "👥" },
  { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  { name: "Profile", path: "/admin/profile", icon: "👤" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-56 bg-[#0f1221] border-r border-white/10 p-4 flex flex-col gap-2">
      {adminNav.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          {item.icon} {item.name}
        </NavLink>
      ))}
    </aside>
  );
}
