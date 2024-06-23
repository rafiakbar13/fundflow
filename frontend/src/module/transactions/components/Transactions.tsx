import React from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import AllTransaction from "./AllTtransaction/AllTransaction";
import Revenue from "./revenue/Revenue";
import Expenses from "./expenses/Expenses";
import { Button } from "@/components/ui/button";
import FormAddTransactions from "./FormAddTransactions";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const Transactions = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type") ?? "all";

  const handleTabChange = (value: string) => {
    navigate(`/dashboard/transactions?type=${value}`);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between pb-3">
        <Header title="Recent Transactions" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="">Add Transaction</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-fit">
            <DialogHeader>
              <DialogTitle>Add Transactions</DialogTitle>
            </DialogHeader>
            <FormAddTransactions />
          </DialogContent>
        </Dialog>
      </div>
      <div className="pt-3">
        <Tabs defaultValue="all" onValueChange={handleTabChange} value={type}>
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
