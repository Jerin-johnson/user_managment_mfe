import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import "./index.css";
import AdminLayoutStandAlone from "../layout/AdminLayoutStandAlone";
import UsersPage from "../pages/UsersPage";
import CreateUserPage from "../pages/CreateUserPage";
import EditUserPage from "../pages/EditUserPage";

// Router config - replaces <Routes>
const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayoutStandAlone />, // Layout wraps children
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
      {
        path: "/admin/users",
        element: <UsersPage />,
      },
      {
        path: "/admin/users/create",
        element: <CreateUserPage />,
      },
      {
        path: "/admin/users/edit",
        element: <EditUserPage />,
      },
      {
        path: "*",
        element: <div>Admin 404</div>,
      },
    ],
  },
]);

export default router;
