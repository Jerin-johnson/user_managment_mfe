import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div style={{ border: "2px solid blue", padding: "10px" }}>
      <h2>Shared Micro Frontend</h2>
      <button>Example</button>
      {/* <Outlet /> */}
    </div>
  );
};

export default App;
