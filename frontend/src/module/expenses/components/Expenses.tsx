import Header from "@/components/Header";
import React from "react";
import ComparisonExpenses from "./ComparisonExpenses";
import ExpensesBreakdown from "./ExpensesBreakdown";

type Props = {};

const Expenses = (props: Props) => {
  return (
    <div className="p-4">
      {/* Goals */}
      <Header title="Expenses Comparison" />
      <div className="">
        <ComparisonExpenses />
      </div>
      {/* Expenses Goals By Category */}
      <div className="mt-4">
        <Header title="Expenses Breakdown" />
        <div>
          <ExpensesBreakdown />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
