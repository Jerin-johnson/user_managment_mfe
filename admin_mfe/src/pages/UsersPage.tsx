import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersData } from "../hooks/useUsersData";
import { notify } from "../notification/toast";
import { blockOrUnblockApi } from "../service/user.api";

interface User {
  _id: string | number;
  name: string;
  email: string;
  role: string;
  status?: "active" | "inactive";
  createdAt?: string;
}

export default function UsersPage() {
  // const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: users, isPending, refetch } = useUsersData();

  console.log("the data is ", users);

  if (isPending) return <div>Loading</div>;
  if (!users) return <div>Something went wrong</div>;

  let filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );
  async function handleToggleBlockUnBlock(id: number) {
    console.log("the toggle is invoked", id);
    const result = await confirm("are you sure");

    if (!result) return;

    try {
      const result = await blockOrUnblockApi(id);
      await refetch();
      notify.success("success");
    } catch (error: any) {
      notify.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong",
      );
    }
    console.log("the result is ", result);
  }

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
                  key={user._id}
                  className="bg-[#0f1221] hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/users/${user.authUserId}`)}
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
                        user.isActive
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {user.isActive ? "active" : "inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {/* {new Date(user?.createdAt).toLocaleDateString()} */}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="text-indigo-400 hover:text-indigo-300 text-xs mr-3"
                      onClick={() =>
                        navigate(`/admin/users/${user.authUserId}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className={`text-xs px-2 py-1 rounded ${
                        user.isActive
                          ? "text-red-500 hover:text-red-400"
                          : "text-green-500 hover:text-green-400"
                      }`}
                      onClick={() =>
                        handleToggleBlockUnBlock(Number(user.authUserId))
                      }
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
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
