import Header from "@/components/Header";
import React from "react";

type Props = {};

const Expenses = (props: Props) => {
  return (
    <div className="p-4">
      {/* Goals */}
      <Header title="Expenses Comparison" />
      <div className="flex gap-x-3">Chart</div>
      {/* Expenses Goals By Category */}
      <div className="mt-4">
        <Header title="Expenses Breakdown" />
        <p>Expenses BreakDown</p>
      </div>
    </div>
  );
};

export default Expenses;
