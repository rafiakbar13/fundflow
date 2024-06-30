import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionList from "../components/TransactionLists";

interface Transaction {
  id: string;
  items: string;
  amount: number;
  type: string;
  status: string;
  paymentMethod: string;
  date: string;
  expensesId: string;
  accountId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface TransactionTabsProps {
  allTransactions: Transaction[];
  revenueTransactions: Transaction[];
  expensesTransactions: Transaction[];
  handleTabChange: (value: string) => void;
  type: string;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({
  allTransactions,
  revenueTransactions,
  expensesTransactions,
  handleTabChange,
  type,
}) => {
  return (
    <Tabs defaultValue="all" onValueChange={handleTabChange} value={type}>
      <TabsList className="space-x-4 bg-transparent">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <TransactionList transactions={allTransactions} />
      </TabsContent>
      <TabsContent value="revenue">
        <TransactionList transactions={revenueTransactions} />
      </TabsContent>
      <TabsContent value="expenses">
        <TransactionList transactions={expensesTransactions} />
      </TabsContent>
    </Tabs>
  );
};

export default TransactionTabs;
