import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <>
      <div className="flex w-full max-h-screen min-h-screen">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
