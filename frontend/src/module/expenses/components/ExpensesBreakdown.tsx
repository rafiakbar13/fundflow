import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { IoRestaurantOutline as Food } from "react-icons/io5";
import { FaArrowDown as Down } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { authContext } from "@/context/AuthContext";
import { getExpenses } from "@/services/api";
import HashLoader from "react-spinners/HashLoader";
import { convertToIndonesianTime, toRupiah } from "@/lib/utils";
type Props = {};

const ExpensesBreakdown = () => {
  const { user } = React.useContext(authContext);
  const {
    data: expenses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const data = await getExpenses(user?.id);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <HashLoader />
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3 gap-x-2">
      {expenses?.map((expense: any) => (
        <Card key={expense.id} className="">
          <CardHeader className="bg-gray-300">
            <article className="flex items-center justify-between ">
              <div className="flex items-center gap-x-5">
                <div className="w-4 h-4 ">
                  <Food size={24} className="" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-500">
                    {expense.name}
                  </p>
                  <span className="text-xl font-bold">
                    {toRupiah(expense.budget)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <p>0.8%</p>
                <Down size={18} className="text-green-500" />
              </div>
            </article>
          </CardHeader>
          <CardContent>
            <div className="p-3 space-y-4 divide-y-[1px]">
              {expense?.transactions?.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between pt-1 text-right"
                >
                  <p>{transaction.items}</p>
                  <div>
                    <span>{toRupiah(transaction.amount)}</span>
                    <p>{convertToIndonesianTime(transaction.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default ExpensesBreakdown;
