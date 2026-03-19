// admin-mfe/src/pages/CreateUserPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { UserFormData } from "../types/user";
import { createUser } from "../service/api/user";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: UserFormData) => {
    setLoading(true);
    setError("");
    try {
      const user = await createUser(data);
      navigate(`/admin/users/${user.id}`); // go to detail after create
    } catch {
      setError("Failed to create user. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/users")}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back
        </button>
        <div>
          <h2 className="text-white text-2xl font-bold">Create User</h2>
          <p className="text-gray-400 text-sm">Add a new user to the system</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#0f1221] border border-white/10 rounded-2xl p-6">
        <UserForm mode="create" loading={loading} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
