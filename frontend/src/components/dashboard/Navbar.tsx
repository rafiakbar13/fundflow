import React from "react";
import { MdKeyboardDoubleArrowRight as DoubleArrow } from "react-icons/md";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
      <header className="flex items-center p-4 bg-white rounded-md shadow-lg gap-x-4">
        <h1 className="text-2xl font-semibold">Hello Rafi</h1>
        <div className="flex items-center gap-x-2">
          <DoubleArrow size={24} />
          <span>April, 24 2024</span>
        </div>
      </header>
    </>
  );
};

export default Navbar;
