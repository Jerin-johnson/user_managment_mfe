import ReactDOM from "react-dom/client";
import { Router, RouterProvider } from "react-router-dom";
import router from "./route";
import Loading from "./components/Loading";
import { Suspense } from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <Suspense fallback={<Loading variant="dots" />}>
    <RouterProvider router={router} />
  </Suspense>,
);
