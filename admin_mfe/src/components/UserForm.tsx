// admin-mfe/src/components/UserForm.tsx
import { useState, useCallback } from "react";
import { UserFormData } from "../types/user";

interface Props {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  loading: boolean;
  mode: "create" | "edit";
}

const empty: UserFormData = {
  name: "",
  email: "",
  phone: "",
  role: "USER",
  status: "active",
  address: "",
  password: "",
};

// Move Field component OUTSIDE of UserForm
interface FieldProps {
  label: string;
  field: keyof UserFormData;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Field = ({
  label,
  field,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: FieldProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-[#0f1221] border rounded-lg px-4 py-2.5 text-white text-sm
        placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors
        ${error ? "border-red-500" : "border-white/10"}`}
    />
    {error && <span className="text-red-400 text-xs">{error}</span>}
  </div>
);

export default function UserForm({
  initialData,
  onSubmit,
  loading,
  mode,
}: Props) {
  const [form, setForm] = useState<UserFormData>({ ...empty, ...initialData });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  // Use useCallback to memoize the handler
  const handleFieldChange = useCallback(
    (field: keyof UserFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((p) => ({ ...p, [field]: e.target.value }));
      },
    [],
  );

  const validate = (): boolean => {
    const e: Partial<UserFormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (mode === "create" && !form.password)
      e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          field="name"
          placeholder="John Doe"
          value={form.name}
          onChange={handleFieldChange("name")}
          error={errors.name}
        />
        <Field
          label="Email"
          field="email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleFieldChange("email")}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">
            Role
          </label>
          <select
            value={form.role}
            onChange={handleFieldChange("role")}
            className="bg-[#0f1221] border border-white/10 rounded-lg px-4 py-2.5
              text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">
            Status
          </label>
          <select
            value={form.status}
            onChange={handleFieldChange("status")}
            className="bg-[#0f1221] border border-white/10 rounded-lg px-4 py-2.5
              text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Password only on create, optional on edit */}
      {mode === "create" && (
        <Field
          label={
            mode === "create"
              ? "Password"
              : "New Password (leave blank to keep)"
          }
          field="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleFieldChange("password")}
          error={errors.password}
        />
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50
          text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
      >
        {loading
          ? mode === "create"
            ? "Creating..."
            : "Saving..."
          : mode === "create"
            ? "Create User"
            : "Save Changes"}
      </button>
    </form>
  );
}
