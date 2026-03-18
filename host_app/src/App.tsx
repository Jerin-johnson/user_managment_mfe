import React, { Suspense } from "react";
import { Link } from "react-router-dom";

// const AuthApp = React.lazy(() => import("auth/App"));
// const ProductApp = React.lazy(() => import("product/App"));

const App = () => {
  return (
    <div>
      <h1>Shell App</h1>
      <Link to="/auth/user/login" style={{ marginRight: "10px" }}>
        Go to Auth
      </Link>
    </div>
  );
};

export default App;
