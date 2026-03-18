// admin-mfe/src/AdminRoot.tsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import UsersPage from "./pages/UsersPage";
import "./index.css";

export default function AdminRoot() {
  return (
    <div className="admin-app">
      <AdminLayout>
        <Routes>
          <Route path="users" element={<UsersPage />} />
          {/* <Route path="users/:id"    element={<UserDetailPage />} /> */}
          <Route index element={<UsersPage />} />
          <Route path="*" element={<div>Admin 404</div>} />
        </Routes>
      </AdminLayout>
    </div>
  );
}
