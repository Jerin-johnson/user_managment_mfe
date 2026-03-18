import { Outlet } from "react-router-dom"; // NEW IMPORT
import { NavLink } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSideBar";

export default function AdminLayoutStandAlone() {
  // No children prop needed
  return (
    <div className="min-h-screen bg-[#080a12] flex flex-col">
      <AdminHeader />

      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
