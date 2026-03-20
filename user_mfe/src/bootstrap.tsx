import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
// import router from "./routes/routes";
import UserRoot from "./UserRoot";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <div className="user-mfe">
    <BrowserRouter>
      <UserRoot />
    </BrowserRouter>
  </div>,
);
