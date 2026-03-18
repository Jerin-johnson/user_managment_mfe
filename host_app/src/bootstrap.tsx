import ReactDOM from "react-dom/client";
import { Router, RouterProvider } from "react-router-dom";
import router from "./route";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(<RouterProvider router={router} />);
