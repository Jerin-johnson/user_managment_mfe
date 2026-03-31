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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function AdminRoot() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          padding: "16px",
          top: "80px", // Offset for fixed navbars
        }}
        toastOptions={{
          duration: 4000,
          style: {
            padding: "12px 16px",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "8px",
            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
          },
          success: {
            style: {
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "#059669",
            },
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
            },
            iconTheme: {
              primary: "white",
              secondary: "#dc2626",
            },
          },
        }}
      />
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
    </QueryClientProvider>
  );
}
