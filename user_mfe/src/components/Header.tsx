import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "shared/useAuthStore";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// 👇 swap this with your real useAuth import when ready
// import { useAuth } from "../context/AuthContext";
function useAuth() {
  return {
    user: {
      name: "Jerin James",
      email: "jerin@acme.com",
      role: "user",
      avatarUrl: "",
    },
    logout: () => console.log("logout"),
  };
}

const Header: React.FC = () => {
  const { user, clearUserAuth: logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth/user/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#080a12]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            className="text-[#5b7cf6]"
          >
            <rect
              x="2"
              y="2"
              width="10"
              height="10"
              rx="2"
              fill="currentColor"
              opacity="0.9"
            />
            <rect
              x="16"
              y="2"
              width="10"
              height="10"
              rx="2"
              fill="currentColor"
              opacity="0.45"
            />
            <rect
              x="2"
              y="16"
              width="10"
              height="10"
              rx="2"
              fill="currentColor"
              opacity="0.45"
            />
            <rect
              x="16"
              y="16"
              width="10"
              height="10"
              rx="2"
              fill="currentColor"
              opacity="0.9"
            />
          </svg>
          <span className="font-bold text-base tracking-tight text-slate-100">
            User<span className="text-[#5b7cf6]">Hub</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            // { label: "Dashboard", to: "/" },
            // { label: "Users", to: "/users" },
            // { label: "Roles", to: "/roles" },
            // { label: "Audit Log", to: "/audit" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="px-3 py-1.5 rounded-md text-sm text-slate-400
                         hover:text-slate-100 hover:bg-white/5 transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((p) => !p)}
            className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#5b7cf6]/40"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full bg-[#5b7cf6]/20 ring-2 ring-[#5b7cf6]/40
                              flex items-center justify-center text-xs font-bold text-[#7b93fa]"
              >
                {user ? getInitials(user.name) : "?"}
              </div>
            )}
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-slate-200 leading-tight">
                {user?.name}
              </span>
              <span className="text-xs text-slate-500 capitalize leading-tight">
                {user?.role}
              </span>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-slate-500 hidden md:block"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div
                className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/[0.08]
                              bg-[#0e1120] shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-sm font-semibold text-slate-100 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
                {/* {[
                  { label: "Profile", to: "/user/profile" },
                  { label: "Settings", to: "/user/settings" },
                ].map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2.5 text-sm text-slate-400 hover:text-slate-100
                               hover:bg-white/5 transition-colors duration-150"
                  >
                    {label}
                  </Link>
                ))} */}
                <div className="border-t border-white/[0.06]">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-400
                               hover:text-red-300 hover:bg-red-500/5 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
