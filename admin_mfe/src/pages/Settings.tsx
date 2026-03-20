import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type ToggleKey =
  | "emailNotifications"
  | "securityAlerts"
  | "activityDigest"
  | "twoFactorAuth"
  | "sessionTimeout";

type Settings = Record<ToggleKey, boolean>;

// ── Sub-components ────────────────────────────────────────────────────────────

// Section card — same pattern as ProfilePage for visual consistency
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
      <div className="px-6 py-2 divide-y divide-white/5">{children}</div>
    </div>
  );
}

// Toggle row with label, description, and animated switch
function ToggleRow({
  label,
  description,
  checked,
  onChange,
  danger = false,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-4 gap-4">
      <div>
        <p
          className={`text-sm font-medium ${danger ? "text-red-400" : "text-gray-200"}`}
        >
          {label}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>

      {/* Toggle switch */}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 w-10 h-5.5 rounded-full transition-colors duration-200 focus:outline-none
          ${
            checked ? (danger ? "bg-red-500" : "bg-indigo-600") : "bg-white/10"
          }`}
        style={{ height: "22px", width: "40px" }}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow
            transition-transform duration-200 ${checked ? "translate-x-[18px]" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
}

// Select dropdown
function SelectRow({
  label,
  description,
  value,
  options,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 gap-4">
      <div>
        <p className="text-sm font-medium text-gray-200">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#080a12] border border-white/10 text-white text-sm rounded-lg px-3 py-1.5
                   outline-none focus:border-indigo-500 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Toast
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
export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    securityAlerts: true,
    activityDigest: false,
    twoFactorAuth: false,
    sessionTimeout: true,
  });

  const [toast, setToast] = useState({ show: false, message: "" });

  const toggle = (key: ToggleKey) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleSave = () => {
    // TODO: call your API → saveSettings({ settings, timezone, language })
    showToast("Settings saved");
  };

  return (
    <div className="max-w-2xl space-y-6 text-white">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Settings</h2>
        <p className="text-gray-500 text-sm mt-0.5">
          Manage notifications, security, and preferences
        </p>
      </div>

      {/* Notifications */}
      <Section
        title="Notifications"
        description="Choose what emails and alerts you receive"
      >
        <ToggleRow
          label="Email Notifications"
          description="Receive updates and announcements via email"
          checked={settings.emailNotifications}
          onChange={() => toggle("emailNotifications")}
        />
        {/* <ToggleRow
          label="Security Alerts"
          description="Get notified of suspicious login attempts"
          checked={settings.securityAlerts}
          onChange={() => toggle("securityAlerts")}
        /> */}
        {/* <ToggleRow
          label="Weekly Activity Digest"
          description="Summary of platform activity every Monday"
          checked={settings.activityDigest}
          onChange={() => toggle("activityDigest")}
        /> */}
      </Section>

      {/* Danger zone */}
      <Section title="Danger Zone">
        <ToggleRow
          label="Delete My Account"
          description="Permanently remove your account and all data. This cannot be undone."
          checked={false}
          onChange={() => {}}
          danger
        />
      </Section>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
        >
          Save Settings
        </button>
      </div>

      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}
