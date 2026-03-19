import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
// import router from "./routes/routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <div className="shared-app">
    <RouterProvider router={router} />
    {/* <App /> */}
  </div>,
);
