import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
const DashboardLayout = () => {
  return (
    <>
      <div className="flex w-full max-h-screen min-h-screen">
        <Sidebar />
        <main className="w-screen bg-gray-100">
          <Navbar />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
