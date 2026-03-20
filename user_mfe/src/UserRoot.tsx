import React, { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import DashBoard from "./pages/DashBoard";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
const Footer = React.lazy(() =>
  import("shared/Footer").catch(() => ({
    default: () => <div>⚠️ User module failed to load</div>,
  })),
);

export default function UserRoot() {
  return (
    <div className="user-mfe">
      <div className="shell-app min-h-screen bg-[#080a12] flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route element={<ProtectedRoute role="USER" />}>
              <Route path="/dash" element={<DashBoard />} />
            </Route>
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Not Found</h2>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
