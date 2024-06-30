import React from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransactions, getTransactionsByType } from "@/services/api";
import { authContext } from "@/context/AuthContext";
import TransactionTabs from "./TransactionTabs";
import { HashLoader } from "react-spinners";

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

const RecentTransactions = () => {
  const { user } = React.useContext(authContext);
  const userId = user?.id;
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type") ?? "all";

  const handleTabChange = (value: string) => {
    navigate(`/dashboard?type=${value}`);
  };

  const fetchTransactions = async () => {
    if (type === "all") {
      const { data } = await getTransactions(userId);
      return data;
    } else {
      const { data } = await getTransactionsByType(userId, type);
      return data;
    }
  };

  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions", type],
    queryFn: fetchTransactions,
  });

  const allTransactions = transactions || [];
  const revenueTransactions = allTransactions.filter(
    (transaction: Transaction) => transaction.type === "revenue"
  );
  const expensesTransactions = allTransactions.filter(
    (transaction: Transaction) => transaction.type === "expenses"
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <HashLoader />
      </div>
    );
  }

  return (
    <div className="p-5">
      <Header title="Recent Transactions" />
      <div className="pt-3">
        <Card>
          <article className="p-3">
            <TransactionTabs
              allTransactions={allTransactions}
              revenueTransactions={revenueTransactions}
              expensesTransactions={expensesTransactions}
              handleTabChange={handleTabChange}
              type={type}
            />
          </article>
        </Card>
      </div>
    </div>
  );
};

export default RecentTransactions;
