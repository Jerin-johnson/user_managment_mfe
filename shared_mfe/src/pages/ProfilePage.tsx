// shared-mfe/src/pages/ProfilePage.tsx
import { useProfile } from "../hooks/useProfile";
// import Avatar from "../components/Avatar";

export default function ProfilePage() {
  const { user, loading } = useProfile();

  //   if (loading) return <div className="text-gray-400">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      <h2 className="text-white text-2xl font-bold">Profile</h2>

      <div className="bg-[#0f1221] border border-white/10 rounded-2xl p-6 flex items-center gap-4">
        {/* <Avatar name={user?.name ?? "?"} size="lg" /> */}
        <div>
          <p className="text-white font-semibold text-lg">{user?.name}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <span className="text-xs text-indigo-400 capitalize">
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
}
