import Header from "@/components/Header";
import React from "react";
import SavingMoney from "./SavingMoney";
import SavingSummary from "./SavingSummary";
import Expenses from "./Expenses";

const Goals = () => {
  return (
    <div className="p-4">
      {/* Goals */}
      <Header title="Goals" />
      <div className="flex gap-x-3">
        <SavingMoney />
        <SavingSummary />
      </div>
      {/* Expenses Goals By Category */}
      <div className="mt-4">
        <Header title="Expenses Goals By Category" />
        <Expenses />
      </div>
    </div>
  );
};

export default Goals;
