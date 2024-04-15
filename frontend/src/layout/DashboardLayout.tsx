import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <>
      <div className="flex w-full max-h-screen min-h-screen">
        <Sidebar />
        <main className="w-screen p-4">
          <header>navbar</header>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
