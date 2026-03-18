import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UserLogin from "../pages/user/Login";
import UserRegister from "../pages/user/Register";
import AdminLogin from "../pages/admin/Login";
import AdminRegister from "../pages/admin/Register";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/user/login",
    element: <UserLogin />,
  },
  {
    path: "/user/register",
    element: <UserRegister />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/register",
    element: <AdminRegister />,
  },
  {
    path: "/reset",
    element: <ResetPasswordPage />,
  },
  {
    path: "/forgot",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);

export default router;
