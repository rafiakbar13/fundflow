import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@/constant/menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="text-white w-60 bg-slate-900">
      {/* Logo */}
      <div className="p-4 space-y-3 text-center">
        <Link to="#" className="py-4">
          <h1 className="text-2xl font-bold">
            Fund<span className="text-red">Flow.</span>
          </h1>
        </Link>
        {/* Links */}
        <div className="px-1 pt-4 space-y-4">
          {Menu.map((item, index) => (
            <NavigationMenu className="" key={index}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? "text-white bg-primary w-full rounded-md "
                        : ""
                    } flex items-center space-x-2 text-lg transition-colors duration-250 py-2 px-10`}
                  >
                    {item.icon}
                    <NavigationMenuLink>{item.name}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
