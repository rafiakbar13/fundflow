import React from "react";
import { Button } from "@/components/ui/button";
const CallToAction = () => {
  return (
    <div className="w-5/6 mx-auto mt-12 text-center">
      {/* Message */}
      <div className="flex flex-col items-center justify-center w-2/3 mx-auto space-y-3">
        <h1 className="text-6xl text-tertiary">
          {" "}
          Welcome to{" "}
          <span className="text-white">
            Fund<span className="text-red">Flow.</span>
          </span>{" "}
          your Personal Finance Dashboard
        </h1>
        <p>
          FundFlow is your financial command center. Gain insights, track
          expenses, and plan for success, all in one place. Take control of your
          financial journey with Fint.
        </p>
      </div>
      {/* CTA */}
      <div className="flex items-center justify-center mt-6 space-x-3">
        <Button>Get Started</Button>
        <Button variant={"outline"}>Learn More</Button>
      </div>
    </div>
  );
};

export default CallToAction;
