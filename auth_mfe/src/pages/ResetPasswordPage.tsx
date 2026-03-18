import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

type Status = "idle" | "loading" | "success" | "invalid-token";

interface FieldState {
  password: string;
  confirm: string;
}

interface FieldErrors {
  password?: string;
  confirm?: string;
  general?: string;
}

/* password strength helper */
const getStrength = (
  pw: string,
): { score: number; label: string; color: string } => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-500" };
  if (score <= 2) return { score, label: "Fair", color: "bg-amber-400" };
  if (score <= 3) return { score, label: "Good", color: "bg-yellow-400" };
  if (score === 4) return { score, label: "Strong", color: "bg-emerald-400" };
  return { score, label: "Very strong", color: "bg-emerald-400" };
};

const EyeIcon: React.FC<{ open: boolean }> = ({ open }) =>
  open ? (
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
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
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [fields, setFields] = useState<FieldState>({
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>(
    token ? "idle" : "invalid-token",
  );
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);

  const strength = getStrength(fields.password);

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!fields.password) e.password = "Password is required.";
    else if (fields.password.length < 8)
      e.password = "Must be at least 8 characters.";
    if (!fields.confirm) e.confirm = "Please confirm your password.";
    else if (fields.password !== fields.confirm)
      e.confirm = "Passwords don't match.";
    return e;
  };

  const handleChange =
    (key: keyof FieldState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("loading");

    // TODO: replace with your actual API call
    // await api.post("/auth/reset-password", { token, password: fields.password });
    await new Promise((r) => setTimeout(r, 1500));

    setStatus("success");
    setTimeout(() => navigate("/auth/user/login"), 2500);
  };

  /* ── Invalid / missing token ── */
  if (status === "invalid-token") {
    return (
      <div className="auth-app min-h-screen bg-[#080a12] flex items-center justify-center px-4">
        <div
          className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0e1120] p-8 text-center
                        shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        >
          <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-100 mb-2">
            Invalid or expired link
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Link
            to="/auth/forgot-password"
            className="block w-full py-3 rounded-xl bg-[#5b7cf6] hover:bg-[#3a5af0]
                       text-white font-semibold text-sm text-center transition-colors duration-150"
          >
            Request new link
          </Link>
        </div>
      </div>
    );
  }

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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>

          {status === "success" ? (
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
                Password updated!
              </h1>
              <p className="text-sm text-slate-400 mb-1">
                Your password has been reset successfully.
              </p>
              <p className="text-xs text-slate-500 mt-4">
                Redirecting you to sign in…
              </p>
              <div className="mt-3 w-full h-0.5 rounded bg-white/5 overflow-hidden">
                <div className="h-full bg-[#5b7cf6] animate-[progress_2.5s_linear_forwards]" />
              </div>
            </div>
          ) : (
            /* ── form state ── */
            <>
              <h1 className="text-2xl font-bold text-slate-100 text-center mb-1">
                Reset your password
              </h1>
              <p className="text-sm text-slate-400 text-center mb-8">
                Choose a strong new password for your account.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* new password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPw ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Min. 8 characters"
                      value={fields.password}
                      onChange={handleChange("password")}
                      className={`w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border text-slate-100
                                  placeholder-slate-600 text-sm outline-none
                                  focus:ring-2 focus:ring-[#5b7cf6]/50 transition-all duration-150
                                  ${errors.password ? "border-red-500/60" : "border-white/[0.08] focus:border-[#5b7cf6]/60"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <EyeIcon open={showPw} />
                    </button>
                  </div>

                  {/* strength bar — only shown when typing */}
                  {fields.password && (
                    <div className="mt-1">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300
                              ${i <= strength.score ? strength.color : "bg-white/10"}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">
                        Strength:{" "}
                        <span className="text-slate-300">{strength.label}</span>
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
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
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* confirm password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="confirm"
                    className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm"
                      type={showCf ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter password"
                      value={fields.confirm}
                      onChange={handleChange("confirm")}
                      className={`w-full px-4 py-3 pr-11 rounded-xl bg-white/[0.04] border text-slate-100
                                  placeholder-slate-600 text-sm outline-none
                                  focus:ring-2 focus:ring-[#5b7cf6]/50 transition-all duration-150
                                  ${errors.confirm ? "border-red-500/60" : "border-white/[0.08] focus:border-[#5b7cf6]/60"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCf((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      <EyeIcon open={showCf} />
                    </button>
                  </div>

                  {/* match indicator */}
                  {fields.confirm &&
                    !errors.confirm &&
                    fields.password === fields.confirm && (
                      <p className="text-xs text-emerald-400 flex items-center gap-1">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Passwords match
                      </p>
                    )}
                  {errors.confirm && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
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
                      {errors.confirm}
                    </p>
                  )}
                </div>

                {/* general error */}
                {errors.general && (
                  <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                    {errors.general}
                  </div>
                )}

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
                      Updating…
                    </>
                  ) : (
                    "Reset password"
                  )}
                </button>

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

export default ResetPasswordPage;
