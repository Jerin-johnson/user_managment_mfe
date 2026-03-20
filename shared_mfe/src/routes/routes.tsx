import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";
import Footer from "../components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "footer",
    element: <Footer />,
  },
]);

export default router;
