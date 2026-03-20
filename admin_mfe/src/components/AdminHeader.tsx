import useAuthStore from "shared/useAuthStore";

export default function AdminHeader() {
  const { user } = useAuthStore();
  return (
    <header className="bg-[#0f1221] border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <h1 className="text-white font-bold text-lg">{user?.name}</h1>
      <span className="text-gray-400 text-sm">{user?.email}</span>
    </header>
  );
}
