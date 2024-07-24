import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "@/constant/menu";
import { Button } from "./ui/button";

import { IoLogOutOutline as Logout } from "react-icons/io5";
import { authContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/api";

const Sidebar = () => {
  const location = useLocation();
  const { dispatch, user } = useContext(authContext);

  const navigate = useNavigate();

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await getProfile(user?.id);
      return data;
    },
  });

  const userData = profile.data;

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <aside className="w-48 text-white bg-slate-900">
      {/* Logo */}
      <article className="flex flex-col items-center justify-center">
        <h1 className="pt-5 text-3xl font-bold text-center">
          Fund<span className="text-red">Flow</span>
        </h1>
        <div className="px-4 pt-4">
          {Menu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? `bg-primary rounded-lg text-white w-full`
                  : ``
              } flex items-center my-5 gap-x-2  py-2 px-8 whitespace-nowrap`}
            >
              <span>{item.icon}</span>
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </article>
      <div className="px-4 text-center">
        <Button
          variant={"ghost"}
          className="w-full my-4 space-x-2 text-white transition-colors duration-300 cursor-pointer bg-slate-700 hover:bg-slate-800 hover:text-white"
          onClick={handleLogout}
        >
          <span>
            <Logout />
          </span>
          <p>Logout</p>
        </Button>

        {/* Info user */}
        <div className="flex items-center px-4 pt-4 space-x-6  border-t-[1px] border-gray-600">
          {/* Image and name */}
          <img
            src={
              userData?.photo ||
              "https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
            }
            alt=""
            className="object-cover w-10 h-10 rounded-full"
          />
          <div>
            <p>{userData?.name}</p>
            <Link to={"/dashboard/settings"}>
              <p className="text-xs text-gray-400">View Profile</p>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
