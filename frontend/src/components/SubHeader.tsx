import React from "react";

type Props = {
  title: string;
  className?: string;
};

const SubHeader = ({ title, className }: Props) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-600 ${className}`}>
      {title}
    </h3>
  );
};

export default SubHeader;
