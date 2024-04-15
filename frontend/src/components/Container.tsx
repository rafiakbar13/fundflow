import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full max-h-screen min-h-screen mx-auto max-w-7xl bg-gradient font-poppins ">
      <div className="max-h-screen min-h-screen bg-hero-pattern">
        {children}
      </div>
    </div>
  );
};

export default Container;
