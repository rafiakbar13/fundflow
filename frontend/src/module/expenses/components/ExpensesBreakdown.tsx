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
type Props = {};

const ExpensesBreakdown = () => {
  return (
    <section className="grid grid-cols-1 mt-3 sm:grid-cols-2 md:grid-cols-3">
      <Card className="">
        <CardHeader className="bg-gray-300">
          <article className="flex items-center justify-between ">
            <div className="flex items-center gap-x-5">
              <div className="w-4 h-4 ">
                <Food size={24} className="" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-500">Food</p>
                <span className="text-xl font-bold">$350.00</span>
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
            <div className="flex items-center justify-between text-right">
              <p>Grocery</p>
              <div>
                <span>$350.00</span>
                <p>17 May 2023</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 text-right">
              <p>Grocery</p>
              <div>
                <span>$350.00</span>
                <p>17 May 2023</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ExpensesBreakdown;
