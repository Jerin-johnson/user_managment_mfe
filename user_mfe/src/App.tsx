import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import DashboardHeader from "./components/DashboardHeader";
// import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="shell-app min-h-screen bg-[#080a12] flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
