import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPageLayout from "./layout/LandingPageLayout";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/protected/ProtectedRoutes";
import Loading from "./components/Loading";

const AuthRoot = lazy(() => import("auth/AuthRoot"));
// const UserRoot = lazy(() => import("user/UserRoot"));
const AdminRoot = lazy(() => import("admin/AdminRoot"));

const UserRoot = React.lazy(() =>
  import("user/UserRoot").catch(() => ({
    default: () => <div>⚠️ User module failed to load</div>,
  })),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },

  {
    path: "/auth/*",
    element: <ProtectedRoute />,
    children: [
      {
        path: "*",
        element: <AuthRoot />,
      },
    ],
  },
  {
    path: "/user/*",
    element: <UserRoot />,
  },
  {
    path: "/admin/*",
    element: (
      <Suspense fallback={<Loading variant="dots" />}>
        <AdminRoot />
      </Suspense>
    ),
  },

  { path: "*", element: <h2>Not found</h2> },
]);

export default router;
