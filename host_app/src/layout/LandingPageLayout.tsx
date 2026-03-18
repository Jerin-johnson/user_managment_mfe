import { LayoutRouteProps, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LandingPageLayout: React.FC<LayoutRouteProps> = () => {
  return (
    <div className="shell-app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
