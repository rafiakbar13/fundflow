import Header from "@/components/Header";
import React, { useContext } from "react";
import SavingMoney from "./SavingMoney";
import SavingSummary from "./SavingSummary";
import Expenses from "./Expenses";
import { useQuery } from "@tanstack/react-query";
import { getGoals } from "@/services/api";
import { authContext } from "@/context/AuthContext";

const Goals = () => {
  const { user } = useContext(authContext);
  const {
    data: goals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const data = await getGoals(user?.id);
      return data;
    },
  });
  return (
    <div className="p-4">
      {/* Goals */}
      <Header title="Goals" />
      <div className="flex gap-x-3">
        <SavingMoney goals={goals} />
        <SavingSummary />
      </div>
      {/* Expenses Goals By Category */}
      <div className="mt-4">
        <Header title="Expenses Goals By Category" />
        <Expenses />
      </div>
    </div>
  );
};

export default Goals;
