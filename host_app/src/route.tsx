import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPageLayout from "./layout/LandingPageLayout";
import HomePage from "./pages/HomePage";

const AuthRoot = lazy(() => import("auth/AuthRoot"));
const UserRoot = lazy(() => import("user/UserRoot"));
const AdminRoot = lazy(() => import("admin/AdminRoot"));

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
    element: (
      <Suspense fallback={<div>Loading Auth Module...</div>}>
        <AuthRoot />
      </Suspense>
    ),
  },
  {
    path: "/user/*",
    element: (
      <Suspense fallback={<div>Loading Auth Module...</div>}>
        <UserRoot />
      </Suspense>
    ),
  },
  {
    path: "/admin/*",
    element: (
      <Suspense fallback={<div>Loading Auth Module...</div>}>
        <AdminRoot />
      </Suspense>
    ),
  },

  { path: "*", element: <h2>Not found</h2> },
]);

export default router;
