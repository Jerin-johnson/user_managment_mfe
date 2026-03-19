// admin-mfe/src/components/UserForm.tsx
import { useState } from "react";
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
  role: "user",
  status: "active",
  address: "",
  password: "",
};

export default function UserForm({
  initialData,
  onSubmit,
  loading,
  mode,
}: Props) {
  const [form, setForm] = useState<UserFormData>({ ...empty, ...initialData });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const set =
    (field: keyof UserFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const validate = (): boolean => {
    const e: Partial<UserFormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (mode === "create" && !form.password)
      e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSubmit(form);
  };

  const Field = ({
    label,
    field,
    type = "text",
    placeholder,
  }: {
    label: string;
    field: keyof UserFormData;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="flex flex-col gap-1">
      <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={(form[field] as string) ?? ""}
        onChange={set(field)}
        placeholder={placeholder}
        className={`bg-[#0f1221] border rounded-lg px-4 py-2.5 text-white text-sm
          placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors
          ${errors[field] ? "border-red-500" : "border-white/10"}`}
      />
      {errors[field] && (
        <span className="text-red-400 text-xs">{errors[field]}</span>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name" field="name" placeholder="John Doe" />
        <Field
          label="Email"
          field="email"
          type="email"
          placeholder="john@example.com"
        />
        <Field label="Phone" field="phone" placeholder="+91 9876543210" />
        <Field label="Address" field="address" placeholder="City, Country" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">
            Role
          </label>
          <select
            value={form.role}
            onChange={set("role")}
            className="bg-[#0f1221] border border-white/10 rounded-lg px-4 py-2.5
              text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-400 text-xs font-medium uppercase tracking-wide">
            Status
          </label>
          <select
            value={form.status}
            onChange={set("status")}
            className="bg-[#0f1221] border border-white/10 rounded-lg px-4 py-2.5
              text-white text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Password only on create, optional on edit */}
      <Field
        label={
          mode === "create" ? "Password" : "New Password (leave blank to keep)"
        }
        field="password"
        type="password"
        placeholder="••••••••"
      />

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
