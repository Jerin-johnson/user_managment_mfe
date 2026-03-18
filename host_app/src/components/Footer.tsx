import React from "react";
import { Link } from "react-router-dom";

interface FooterColumn {
  heading: string;
  links: { label: string; to: string; external?: boolean }[];
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Users", to: "/users" },
      { label: "Roles", to: "/roles" },
      { label: "Permissions", to: "/permissions" },
      { label: "Audit Log", to: "/audit" },
    ],
  },
  {
    heading: "Developers",
    links: [
      {
        label: "Documentation",
        to: "https://docs.example.com",
        external: true,
      },
      { label: "API Reference", to: "https://api.example.com", external: true },
      { label: "Changelog", to: "/changelog" },
      { label: "GitHub", to: "https://github.com", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#080a12] border-t border-white/[0.06] px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:w-64 shrink-0">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg
                width="24"
                height="24"
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
            <p className="text-sm text-slate-500 leading-relaxed">
              Production-grade user management as a micro frontend. Built for
              scale.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[
                {
                  href: "https://github.com",
                  label: "GitHub",
                  icon: (
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  ),
                },
                {
                  href: "https://twitter.com",
                  label: "Twitter",
                  icon: (
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500
                             hover:text-slate-200 hover:bg-white/5 transition-colors duration-150"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-150"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-150"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} UserHub. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
