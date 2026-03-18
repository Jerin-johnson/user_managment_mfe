import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div style={{ border: "2px solid blue", padding: "10px" }}>
      <h2>Auth Micro Frontend</h2>
      <button>Login</button>
      <Outlet />
    </div>
  );
};

export default App;
