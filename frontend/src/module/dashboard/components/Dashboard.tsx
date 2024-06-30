import React, { useContext } from "react";
import TotalBalances from "./TotalBalances";
import UpcomingBills from "./UpcomingBills";
import RecentTransactions from "../components/RecentTransaction";
import ComparisonExpenses from "@/module/expenses/components/ComparisonExpenses";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { authContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/services/api";
import { toRupiah } from "@/lib/utils";

import { PiMedalMilitaryLight as Achieved } from "react-icons/pi";

type Props = {};

const Dashboard = (props: Props) => {
  const { user } = useContext(authContext);

  const { data: expenses } = useQuery({
    queryKey: ["expensesCategory"],
    queryFn: () => getExpenses(user?.id),
  });

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
      <article className="flex justify-between gap-x-5">
        {/* Sidebar left */}
        <div className="w-2/4 ">
          <RecentTransactions />
        </div>
        {/* Sidebar Right */}
        <div className="w-full space-y-3">
          <div className="pt-5">
            <Header title="Statistics" />
            <ComparisonExpenses />
          </div>
          <div className="">
            <Header title="Expenses" />
            <Card className="w-full bg-white border-none shadow-md">
              <CardContent>
                <div className="grid grid-cols-3 gap-4 divide-x-[1px] divide-y-[1px]">
                  {expenses?.map((expense: any) => (
                    <div
                      key={expense.id}
                      className="flex items-center p-4 space-x-3 "
                    >
                      <div className="p-2 bg-gray-200 rounded-md">
                        <Achieved size={24} className="" />
                      </div>
                      <div>
                        <h5 className="text-sm text-gray-400">
                          {expense.name}
                        </h5>
                        <span className="text-lg font-semibold">
                          {toRupiah(expense.budget)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
