import React from "react";
import { Link } from "react-router-dom";

import "../index.css";

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
    <div className="shared-app">
      <footer className="relative bg-slate-950 border-t border-white/10 px-6 pt-16 pb-8">
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
                  className="text-indigo-500"
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
                    opacity="0.4"
                  />
                  <rect
                    x="2"
                    y="16"
                    width="10"
                    height="10"
                    rx="2"
                    fill="currentColor"
                    opacity="0.4"
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
                  User<span className="text-indigo-500">Hub</span>
                </span>
              </Link>

              <p className="text-sm text-slate-500 leading-relaxed">
                Production-grade user management as a micro frontend. Built for
                scale.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-5">
                {["GitHub", "Twitter"].map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500
                             hover:text-slate-200 hover:bg-white/10 transition-colors"
                  >
                    {label[0]}
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
                            className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            to={link.to}
                            className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
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
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
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
    </div>
  );
};

export default Footer;
