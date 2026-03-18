import React, { useState } from "react";
import { Link } from "react-router-dom";

type Status = "idle" | "loading" | "sent";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStatus("loading");

    // TODO: replace with your actual API call
    // await api.post("/auth/forgot-password", { email });
    await new Promise((r) => setTimeout(r, 1500)); // simulate request

    setStatus("sent");
  };

  return (
    <div className="auth-app min-h-screen bg-[#080a12] flex items-center justify-center px-4">
      {/* glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px]
                        rounded-full bg-[#5b7cf6]/10 blur-[120px]"
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0e1120] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          {/* logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#5b7cf6]/15 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5b7cf6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>

          {status === "sent" ? (
            /* ── success state ── */
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-100 mb-2">
                Check your inbox
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed mb-1">
                We sent a password reset link to
              </p>
              <p className="text-sm font-semibold text-[#7b93fa] mb-6">
                {email}
              </p>
              <p className="text-xs text-slate-500 mb-6">
                Didn't get it? Check your spam folder or{" "}
                <button
                  onClick={() => setStatus("idle")}
                  className="text-[#7b93fa] hover:text-[#5b7cf6] underline underline-offset-2"
                >
                  try again
                </button>
                .
              </p>
              <Link
                to="/auth/user/login"
                className="block w-full py-2.5 rounded-xl border border-white/10 text-slate-300
                           hover:text-white hover:border-white/20 text-sm font-medium text-center
                           transition-colors duration-150"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            /* ── form state ── */
            <>
              <h1 className="text-2xl font-bold text-slate-100 text-center mb-1">
                Forgot password?
              </h1>
              <p className="text-sm text-slate-400 text-center mb-8">
                Enter your email and we'll send you a reset link.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* email field */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-slate-100
                                placeholder-slate-600 text-sm outline-none
                                focus:ring-2 focus:ring-[#5b7cf6]/50 transition-all duration-150
                                ${error ? "border-red-500/60" : "border-white/[0.08] focus:border-[#5b7cf6]/60"}`}
                  />
                  {error && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {error}
                    </p>
                  )}
                </div>

                {/* submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 rounded-xl bg-[#5b7cf6] hover:bg-[#3a5af0] disabled:opacity-60
                             disabled:cursor-not-allowed text-white font-semibold text-sm
                             shadow-[0_0_24px_rgba(91,124,246,0.4)] hover:shadow-[0_0_32px_rgba(91,124,246,0.6)]
                             transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>

                {/* back link */}
                <Link
                  to="/auth/user/login"
                  className="text-sm text-slate-500 hover:text-slate-300 text-center transition-colors duration-150"
                >
                  ← Back to sign in
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
