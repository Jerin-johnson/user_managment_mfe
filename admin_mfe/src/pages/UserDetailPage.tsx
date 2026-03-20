import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getUser, deleteUser } from "../service/api/user";
import { MOCK_USERS, User } from "../mocks/Mock.User.data";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(MOCK_USERS[0]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // useEffect(() => {
  //   getUser(id!).then((u) => {
  //     setUser(u);
  //     setLoading(false);
  //   });
  // }, [id]);

  const handleDelete = async () => {
    if (!confirm(`Delete ${user?.name}? This cannot be undone.`)) return;
    setDeleting(true);
    await deleteUser(id!);
    navigate("/admin/users");
  };

  // if (loading) return <div className="text-gray-400 p-6">Loading user...</div>;
  if (!user) return <div className="text-red-400 p-6">User not found.</div>;

  console.log("the user is", user);

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1">
      <span className="text-gray-500 text-xs uppercase tracking-wide">
        {label}
      </span>
      <span className="text-white text-sm">{value || "—"}</span>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back + Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/users")}
          className="text-gray-400 hover:text-white text-sm flex items-center gap-2"
        >
          ← Back to Users
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/admin/users/edit/${id || 1}`)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Edit User
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-[#0f1221] border border-white/10 rounded-2xl p-6 space-y-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600/30 flex items-center justify-center text-2xl font-bold text-indigo-400">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-400 text-sm capitalize">
                {user.role}
              </span>
              <span className="text-gray-600">•</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.status === "active"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <InfoRow label="Email" value={user.email} />
          {/* <InfoRow label="Phone" value={user.phone} />
          <InfoRow label="Address" value={user.address ?? ""} /> */}
          {/* <InfoRow
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          /> */}
        </div>
      </div>
    </div>
  );
}
