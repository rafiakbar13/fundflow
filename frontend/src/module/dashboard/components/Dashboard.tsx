import React from "react";
import TotalBalances from "./TotalBalances";
import UpcomingBills from "./UpcomingBills";
import RecentTransactions from "./Transaction";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <section className="p-4 space-y-3">
      {/* Header */}
      <article className="grid grid-cols-3 gap-x-3">
        <div className="">
          <TotalBalances />
        </div>
        <div className="bg-primary">
          <p>Goals</p>
        </div>
        <div className="">
          <UpcomingBills />
        </div>
      </article>
      <article className="flex items-center justify-between gap-x-5">
        {/* Sidebar left */}
        <div className="w-2/4 ">
          <RecentTransactions />
        </div>
        {/* Sidebar Right */}
        <div className="w-full space-y-3">
          <div className="bg-tertiary">Statistics</div>
          <div className="bg-tertiary">Expenses Breakdown</div>
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
