import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
const Navbar = () => {
  return (
    <header className="w-5/6 pt-6 mx-auto">
      <nav className="flex items-center justify-between p-5 font-semibold text-white rounded-md bg-white/20">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Fund<span className="text-red">Flow.</span>
        </h1>
        {/* Links Auth */}
        <div>
          <Link to="/login" className="">
            <Button className="text-base">Login</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
