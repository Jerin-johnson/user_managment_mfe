import { useState } from "react";
import useAuthStore from "shared/useAuthStore";

// ── Reusable input field ──────────────────────────────────────────────────────
function Field({
  label,
  value,
  type = "text",
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  type?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-widest uppercase text-gray-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`bg-[#080a12] border rounded-lg px-4 py-2.5 text-sm text-white outline-none transition-colors
          ${
            disabled
              ? "border-white/5 text-gray-600 cursor-not-allowed"
              : "border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
          }`}
      />
    </div>
  );
}

// ── Section card ──────────────────────────────────────────────────────────────
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#0f1221] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/8">
        <p className="text-sm font-semibold text-white">{title}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
        )}
      </div>
      <div className="px-6 py-5 flex flex-col gap-4">{children}</div>
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div
      className={`fixed bottom-6 right-6 bg-indigo-600 text-white text-sm px-4 py-2.5 rounded-lg shadow-xl
        transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}
    >
      ✓ {message}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user } = useAuthStore();

  const [name, setName] = useState(user?.name ?? "");
  const [email] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleSaveProfile = () => {
    // TODO: call your API → updateUser({ name })
    showToast("Profile updated");
  };

  const handleChangePassword = () => {
    if (!newPassword || newPassword !== confirmPassword) return;
    // TODO: call your API → changePassword({ currentPassword, newPassword })
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showToast("Password changed");
  };

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-2xl space-y-6 text-white">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Profile</h2>
        <p className="text-gray-500 text-sm mt-0.5">
          Manage your personal information and password
        </p>
      </div>

      {/* Avatar card */}
      <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-[#0f1221] px-6 py-5">
        <div className="w-14 h-14 rounded-full bg-indigo-600/30 text-indigo-300 text-xl font-extrabold flex items-center justify-center select-none">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-white">{name || "—"}</p>
          <p className="text-xs text-gray-500 mt-0.5">{email}</p>
        </div>
        <span className="ml-auto px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400">
          {user?.role ?? "USER"}
        </span>
      </div>

      {/* Personal info */}
      <Section
        title="Personal Information"
        description="Update your display name"
      >
        <Field label="Full Name" value={name} onChange={setName} />
        <Field label="Email Address" value={email} disabled />
        <Field label="Role" value={user?.role ?? ""} disabled />
        <div className="flex justify-end pt-1">
          <button
            onClick={handleSaveProfile}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </Section>

      {/* Password */}
      <Section
        title="Change Password"
        description="Use a strong, unique password"
      >
        <Field
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={setCurrentPassword}
        />
        <Field
          label="New Password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
        />
        <Field
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        {newPassword && newPassword !== confirmPassword && (
          <p className="text-xs text-red-400">Passwords do not match</p>
        )}
        <div className="flex justify-end pt-1">
          <button
            onClick={handleChangePassword}
            disabled={!newPassword || newPassword !== confirmPassword}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40
                       disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            Update Password
          </button>
        </div>
      </Section>

      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}
