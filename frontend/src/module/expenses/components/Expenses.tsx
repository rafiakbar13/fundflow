import Header from "@/components/Header";
import React from "react";
import ComparisonExpenses from "./ComparisonExpenses";
import ExpensesBreakdown from "./ExpensesBreakdown";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormAddExpenses from "./FormAddExpenses";

const Expenses = () => {
  return (
    <div className="p-4">
      {/* Goals */}
      <Header title="Expenses Comparison" />
      <div className="">
        <ComparisonExpenses />
      </div>
      {/* Expenses Goals By Category */}
      <div className="mt-4">
        <div className="flex items-center justify-between px-2 pb-3">
          <Header title="Expenses Breakdown" />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="">Add Expenses</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-fit">
              <DialogHeader>
                <DialogTitle>Add Expenses</DialogTitle>
              </DialogHeader>
              <FormAddExpenses />
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <ExpensesBreakdown />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
