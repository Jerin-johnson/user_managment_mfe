// admin-mfe/src/AdminRoot.tsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import UsersPage from "./pages/UsersPage";
import "./index.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/AdminDashBoard";
import UserDetailPage from "./pages/UserDetailPage";
import ProfilePage from "./pages/Profilepage";
import SettingsPage from "./pages/Settings";
import CreateUserPage from "./pages/CreateUserPage";
import EditUserPage from "./pages/EditUserPage";

export default function AdminRoot() {
  return (
    <div className="admin-app">
      <AdminLayout>
        <Routes>
          <Route element={<ProtectedRoute role="ADMIN" />}>
            <Route index element={<DashboardPage />} />
            <Route path="dash" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/create" element={<CreateUserPage />} />
            <Route path="users/:id" element={<UserDetailPage />} />
            <Route path="users/edit/:id" element={<EditUserPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />

            <Route path="*" element={<div>Admin 404</div>} />
          </Route>
        </Routes>
      </AdminLayout>
    </div>
  );
}
