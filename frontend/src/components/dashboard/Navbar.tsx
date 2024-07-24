import { authContext } from "@/context/AuthContext";
import { convertToIndonesianTime } from "@/lib/utils";
import React, { useContext } from "react";
import { MdKeyboardDoubleArrowRight as DoubleArrow } from "react-icons/md";
type Props = {};

const Navbar = (props: Props) => {
  const { user, loginDate } = useContext(authContext);

  return (
    <>
      <header className="flex items-center p-4 bg-white rounded-md shadow-lg gap-x-4">
        <h1 className="text-2xl font-semibold">Hello {user?.name}</h1>
        <div className="flex items-center gap-x-2">
          <DoubleArrow size={24} />
          <span>{convertToIndonesianTime(loginDate ?? "")}</span>
        </div>
      </header>
    </>
  );
};

export default Navbar;
