import React from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
// import AllTransaction from "./AllTtransaction/AllTransaction";
// import Revenue from "./revenue/Revenue";
// import Expenses from "./expenses/Expenses";
import { AiOutlineShopping as ShoppingBag } from "react-icons/ai";
type Props = {};

const RecentTransactions = (props: Props) => {
  return (
    <div className="p-5">
      <Header title="Recent Transactions" />
      <div className="pt-3">
        <Card>
          <article className="p-3">
            <Tabs defaultValue="all" className="">
              <TabsList className="space-x-4 bg-transparent">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="">
                {/* <AllTransaction /> */}
                <div className="flex items-center gap-x-3">
                  <div className="p-2 rounded bg-slate-200 w-fit">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="w-2/3 ">
                    <p>Polo Shirt</p>
                    <p className="text-sm text-gray-400">Xl Fashions</p>
                  </div>
                  <div>
                    <p>$350</p>
                    <p className="text-sm text-gray-400 whitespace-nowrap">
                      17 May 2023
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="revenue">{/* <Revenue /> */}</TabsContent>
              <TabsContent value="expenses">{/* <Expenses /> */}</TabsContent>
            </Tabs>
          </article>
        </Card>
      </div>
    </div>
  );
};

export default RecentTransactions;
