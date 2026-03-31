import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/user/Login";
import UserRegister from "./pages/user/Register";
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import "./index.css";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Toaster } from "react-hot-toast";

export default function AuthRoot() {
  return (
    <StrictMode>
      <>
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
      </>
    </StrictMode>
  );
}
