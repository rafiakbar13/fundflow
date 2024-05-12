import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <section className="p-4 space-y-3">
      {/* Header */}
      <article className="grid grid-cols-3 gap-x-3">
        <div className="bg-primary">
          <p>Total Balance</p>
        </div>
        <div className="bg-primary">
          <p>Goals</p>
        </div>
        <div className="bg-primary">
          <p>Upcoming Bills</p>
        </div>
      </article>
      <article className="flex items-center justify-between gap-x-5">
        {/* Sidebar left */}
        <div className="w-2/4 bg-tertiary">Recent transaction</div>
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
