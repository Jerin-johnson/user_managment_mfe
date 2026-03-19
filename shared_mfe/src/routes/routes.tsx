import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

export default router;
