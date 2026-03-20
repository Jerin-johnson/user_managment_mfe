import { LayoutRouteProps, Outlet } from "react-router-dom";
// import Footer from "../components/Footer";
import React from "react";
import Navbar from "../components/Navbar";
import HostFooter from "../components/Footer";
// import Footer from "shared/Footer";

const LandingPageLayout: React.FC<LayoutRouteProps> = () => {
  return (
    <div className="shell-app">
      <Navbar />
      <Outlet />
      <HostFooter />
    </div>
  );
};

export default LandingPageLayout;
