import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // replace with your actual API call
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold">Users</h2>
          <p className="text-gray-400 text-sm mt-1">
            {users.length} total users
          </p>
        </div>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          onClick={() => navigate("/admin/users/create")}
        >
          + Add User
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#0f1221] border border-white/10 rounded-lg px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
      />

      {/* Table */}
      {loading ? (
        <div className="text-gray-400 text-sm">Loading users...</div>
      ) : (
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="bg-[#0f1221] hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/users/${user.id}`)}
                >
                  <td className="px-6 py-4 text-white font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-gray-400 capitalize">
                    {user.role}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs mr-3">
                      Edit
                    </button>
                    <button className="text-red-400 hover:text-red-300 text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No users found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
