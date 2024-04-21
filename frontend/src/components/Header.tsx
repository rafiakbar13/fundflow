import React from "react";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return <h1 className="text-3xl text-gray-400">{title}</h1>;
};

export default Header;
