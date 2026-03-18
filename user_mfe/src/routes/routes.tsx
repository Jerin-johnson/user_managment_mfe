import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DashboardPage from "../pages/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/settings",
        element: (
          <div className="text-white">
            <h2>Settings</h2>
          </div>
        ),
      },
    ],
  },
]);

export default router;
