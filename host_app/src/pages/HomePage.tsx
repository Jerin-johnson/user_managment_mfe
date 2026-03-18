import React from "react";
import { Link } from "react-router-dom";

interface StatCardProps {
  value: string;
  label: string;
}
const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="flex flex-col items-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
    <span className="text-3xl font-bold text-[#5b7cf6]">{value}</span>
    <span className="mt-1 text-sm text-slate-400">{label}</span>
  </div>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  desc,
  delay,
}) => (
  <div
    className="group flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]
               hover:bg-white/[0.06] hover:border-[#5b7cf6]/30 transition-all duration-300"
    style={{ animationDelay: delay }}
  >
    <div
      className="w-11 h-11 rounded-xl bg-[#5b7cf6]/15 flex items-center justify-center text-[#7b93fa]
                    group-hover:bg-[#5b7cf6]/25 transition-colors duration-300"
    >
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-slate-100 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const IconUsers = () => (
  <svg
    width="20"
    height="20"
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
);
const IconShield = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconKey = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="15" r="4" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);
const IconActivity = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconLock = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconLayers = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const FEATURES = [
  {
    icon: <IconUsers />,
    title: "User Lifecycle",
    desc: "Create, update, deactivate, and bulk-manage users across teams with full audit trails.",
  },
  {
    icon: <IconShield />,
    title: "Role-Based Access",
    desc: "Define granular roles and assign them at organisation, team, or resource level.",
  },
  {
    icon: <IconKey />,
    title: "Permission Engine",
    desc: "Fine-grained permission policies with conditional logic and scope inheritance.",
  },
  {
    icon: <IconActivity />,
    title: "Audit Logging",
    desc: "Every action is logged with actor, timestamp, IP and payload diff for compliance.",
  },
  {
    icon: <IconLock />,
    title: "SSO & MFA",
    desc: "SAML 2.0, OIDC and TOTP support. Enforce MFA per role or risk score.",
  },
  {
    icon: <IconLayers />,
    title: "MFE-Ready",
    desc: "Ships as an isolated micro frontend — plug into any shell via Module Federation.",
  },
];

const STATS: StatCardProps[] = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<50ms", label: "Auth latency" },
  { value: "SOC 2", label: "Type II certified" },
  { value: "10M+", label: "Tokens issued/day" },
];

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#080a12] text-slate-100 overflow-x-hidden">
      {/* ── Background glow orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px]
                        rounded-full bg-[#5b7cf6]/10 blur-[120px]"
        />
        <div
          className="absolute top-1/3 -right-40 w-[400px] h-[400px]
                        rounded-full bg-[#5b7cf6]/6 blur-[100px]"
        />
        <div
          className="absolute bottom-0 left-0 w-[350px] h-[350px]
                        rounded-full bg-[#5b7cf6]/5 blur-[100px]"
        />
      </div>

      {/* ────────────────────────────────────
          HERO
      ──────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-36 pb-24">
        {/* Badge */}
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                         border border-[#5b7cf6]/30 bg-[#5b7cf6]/10
                         text-xs font-medium text-[#7b93fa] mb-6 animate-[fadeIn_0.5s_ease_forwards]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#5b7cf6] animate-pulse" />
          Micro Frontend · Module Federation Ready
        </span>

        <h1
          className="max-w-3xl text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]
                       text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-400
                       animate-[fadeUp_0.6s_0.1s_ease_both]"
        >
          Identity & Access,
          <br />
          <span className="text-[#5b7cf6]">Built to Scale.</span>
        </h1>

        <p
          className="mt-6 max-w-xl text-base md:text-lg text-slate-400 leading-relaxed
                      animate-[fadeUp_0.6s_0.2s_ease_both]"
        >
          A production-grade user management micro frontend — users, roles,
          permissions, SSO and audit logs delivered as a plug-and-play module.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4
                        animate-[fadeUp_0.6s_0.3s_ease_both]"
        >
          <Link
            to="/auth/user/login"
            className="px-6 py-3 rounded-xl bg-[#5b7cf6] hover:bg-[#3a5af0] text-white font-semibold
                       shadow-[0_0_28px_rgba(91,124,246,0.5)] hover:shadow-[0_0_36px_rgba(91,124,246,0.65)]
                       transition-all duration-200"
          >
            Get Started →
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white
                       hover:border-white/20 hover:bg-white/5 font-semibold transition-all duration-200"
          >
            View Docs
          </a>
        </div>

        {/* Hero visual — mini dashboard card */}
        <div
          className="mt-16 w-full max-w-2xl rounded-2xl border border-white/[0.07]
                        bg-[#0e1120] shadow-[0_24px_80px_rgba(0,0,0,0.6)]
                        p-4 animate-[fadeUp_0.7s_0.35s_ease_both]"
        >
          {/* Fake browser toolbar */}
          <div className="flex items-center gap-1.5 mb-4 px-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <div className="ml-3 flex-1 h-5 rounded bg-white/5 flex items-center px-2">
              <span className="text-[10px] text-slate-500">
                app.userhub.io/users
              </span>
            </div>
          </div>
          {/* Fake table */}
          <div className="rounded-xl overflow-hidden border border-white/5">
            <div className="grid grid-cols-4 px-4 py-2 bg-white/[0.04] text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              <span>Name</span>
              <span>Role</span>
              <span>Status</span>
              <span>Last Active</span>
            </div>
            {[
              {
                name: "Alice Chen",
                role: "Admin",
                status: "Active",
                last: "Just now",
              },
              {
                name: "Bob Martin",
                role: "Editor",
                status: "Active",
                last: "2 min ago",
              },
              {
                name: "Clara Davis",
                role: "Viewer",
                status: "Inactive",
                last: "3 days ago",
              },
              {
                name: "Dev Patel",
                role: "Manager",
                status: "Active",
                last: "12 min ago",
              },
            ].map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-4 px-4 py-2.5 border-t border-white/5 text-xs text-slate-300 hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-medium text-slate-100">{row.name}</span>
                <span>{row.role}</span>
                <span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold
                    ${row.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-slate-500/20 text-slate-400"}`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${row.status === "Active" ? "bg-emerald-400" : "bg-slate-500"}`}
                    />
                    {row.status}
                  </span>
                </span>
                <span className="text-slate-500">{row.last}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────
          STATS
      ──────────────────────────────────── */}
      <section className="relative px-6 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      <section className="relative px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#5b7cf6] uppercase tracking-widest mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything user management needs
            </h2>
            <p className="mt-3 text-slate-400 max-w-lg mx-auto text-sm md:text-base">
              Composable modules that work standalone or wired together inside
              your micro frontend shell.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={`${i * 60}ms`} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────
          CTA BANNER
      ──────────────────────────────────── */}
      <section className="relative px-6 pb-28">
        <div
          className="max-w-3xl mx-auto text-center rounded-2xl border border-[#5b7cf6]/20
                        bg-gradient-to-br from-[#5b7cf6]/10 to-transparent p-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to integrate?
          </h2>
          <p className="text-slate-400 mb-8">
            Drop UserHub into your shell in minutes. Works with any Module
            Federation setup.
          </p>
          <Link
            to="/auth/user/login"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#5b7cf6] hover:bg-[#3a5af0]
                       text-white font-semibold shadow-[0_0_28px_rgba(91,124,246,0.5)] transition-all duration-200"
          >
            Start now
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
