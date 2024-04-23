import React from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllTransaction from "./AllTtransaction/AllTransaction";
import Revenue from "./revenue/Revenue";
import Expenses from "./expenses/Expenses";
type Props = {};

const Transactions = (props: Props) => {
  return (
    <div className="p-5">
      <Header title="Recent Transactions" />
      <div className="pt-3">
        <Tabs defaultValue="all" className="">
          <TabsList className="space-x-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="">
            <AllTransaction />
          </TabsContent>
          <TabsContent value="revenue">
            <Revenue />
          </TabsContent>
          <TabsContent value="expenses">
            <Expenses />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Transactions;
