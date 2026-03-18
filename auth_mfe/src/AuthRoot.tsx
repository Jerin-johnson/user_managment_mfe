// import { StrictMode } from "react";
// import { createMemoryRouter, RouterProvider } from "react-router-dom";
// import UserLogin from "./pages/user/Login";
// import UserRegister from "./pages/user/Register";
// import AdminLogin from "./pages/admin/Login";
// import AdminRegister from "./pages/admin/Register";

// const router = createMemoryRouter(
//   [
//     { path: "/user/login", element: <UserLogin /> },
//     { path: "/user/register", element: <UserRegister /> },
//     { path: "/admin/login", element: <AdminLogin /> },
//     { path: "/admin/register", element: <AdminRegister /> },
//     { path: "*", element: <div>404 Not Found</div> },
//   ],
//   //   {
//   //     initialEntries: [window.location.pathname], // sync with browser URL
//   //   },
// );

// export default function AuthRoot() {
//   return (
//     <StrictMode>
//       <RouterProvider router={router} />
//     </StrictMode>
//   );
// }

import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/user/Login";
import UserRegister from "./pages/user/Register";
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import "./index.css";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

export default function AuthRoot() {
  return (
    <StrictMode>
      <div className="auth-app">
        <Routes>
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          {/* Fixed comma */}
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen text-xl text-gray-500">
                404 Not Found
              </div>
            }
          />
        </Routes>
      </div>
    </StrictMode>
  );
}
