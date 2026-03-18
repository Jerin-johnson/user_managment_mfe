import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LandingPageLayout from "./layout/LandingPageLayout";
import HomePage from "./pages/HomePage";

const AuthRoot = React.lazy(() => import("auth/AuthRoot"));

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

  { path: "*", element: <h2>Not found</h2> },
]);

export default router;
