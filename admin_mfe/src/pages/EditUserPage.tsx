// admin-mfe/src/pages/EditUserPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { UserFormData } from "../types/user";
// import { getUser, updateUser } from "../service/api/user";
import { MOCK_USERS, User } from "../mocks/Mock.User.data";
import { useUserDetailData } from "../hooks/useUsersData";
import { editUserAPi } from "../service/user.api";
import { notify } from "../notification/toast";

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // const [user, setUser] = useState<User | null>(MOCK_USERS[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: user } = useUserDetailData(Number(id));

  const handleSubmit = async (data: UserFormData) => {
    console.log("the data is before updating", data);
    setLoading(true);
    setError("");
    const status = data.status;
    try {
      // strip empty password on edit so it's not overwritten
      if (!data.password) {
        delete data.password;
        delete data?.address;
        delete data?.phone;
        delete data?.status;
      }

      const result = await editUserAPi(Number(id), {
        ...data,
        isActive: status == "active" ? true : false,
      });

      console.log("the result is ", result);
      notify.success(`${data.name} updated successfully`);

      navigate(`/admin/users/${id}`);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to update user. Please try again.",
      );
      setLoading(false);
    }
  };

  // if (fetching) return <div className="text-gray-400 p-6">Loading user...</div>;
  if (!user) return <div className="text-red-400 p-6">User not found.</div>;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/admin/users/${id}`)}
          className="text-gray-400 hover:text-white text-sm"
        >
          ← Back to {user.name}
        </button>
        <div>
          <h2 className="text-white text-2xl font-bold">Edit User</h2>
          <p className="text-gray-400 text-sm">
            Update details for {user.name}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-[#0f1221] border border-white/10 rounded-2xl p-6">
        <UserForm
          mode="edit"
          loading={loading}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
            phone: "2323232323",
            role: user.role as "USER" | "ADMIN" | undefined,
            status: user.isActive ? "active" : "inactive",
            address: "",
          }}
        />
      </div>
    </div>
  );
}
