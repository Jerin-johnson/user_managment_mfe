import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "shared/useAuthStore";

export default function ProtectedRoute({ role }: { role?: string }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/admin/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/auth/admin/login" replace />;
  }

  return <Outlet />;
}
