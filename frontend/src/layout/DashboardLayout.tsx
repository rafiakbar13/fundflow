import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
const DashboardLayout = () => {
  const navigation = useNavigation();
  const isLooading = navigation.state === "loading";
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
