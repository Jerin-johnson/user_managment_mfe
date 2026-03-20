import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "shared/useAuthStore";

const roleRedirectMap = {
  USER: "/user/dash",
  ADMIN: "/admin/dash",
};

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Outlet />;
  }

  if (!user?.role) {
    return <Navigate to="/" replace />;
  }

  const redirectPath = roleRedirectMap[user.role];

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Navigate to="/" replace />;
}
