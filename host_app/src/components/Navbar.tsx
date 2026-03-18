import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLink {
  label: string;
  to: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "User Dashboard", to: "/user/dash" },
  { label: "Admin Dashboard", to: "/roles" },
  // { label: "Permissions", to: "/permissions" },
  { label: "Admin Login", to: "/auth/admin/login" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 transition-all duration-300
        ${
          scrolled
            ? "bg-[#080a12]/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
    >
      <div className="w-full max-w-6xl mx-auto flex items-center gap-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <svg
            width="28"
            height="28"
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
          <span className="font-bold text-lg tracking-tight text-slate-100">
            User<span className="text-[#5b7cf6]">Hub</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150
                  ${
                    active
                      ? "text-[#7b93fa] bg-[#5b7cf6]/10"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center ml-4">
          <Link
            to="/auth/user/login"
            className="px-4 py-1.5 rounded-lg bg-[#5b7cf6] hover:bg-[#3a5af0] text-white text-sm font-semibold
                       transition-colors duration-150 shadow-[0_0_20px_rgba(91,124,246,0.4)]"
          >
            User Sign In
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="ml-auto md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-white/5"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((p) => !p)}
        >
          <span
            className={`block h-0.5 w-5 bg-slate-300 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-4 bg-slate-300 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-slate-300 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-[#0e1120]/95 backdrop-blur-md border-t border-white/5
                    flex flex-col px-6 transition-all duration-300 overflow-hidden md:hidden
                    ${menuOpen ? "max-h-96 py-4 gap-1" : "max-h-0 py-0"}`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors
              ${
                location.pathname === link.to
                  ? "text-[#7b93fa] bg-[#5b7cf6]/10"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/auth/user/login"
          className="mt-3 px-4 py-2 rounded-lg bg-[#5b7cf6] text-white text-sm font-semibold text-center"
        >
          User Sign In →
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
