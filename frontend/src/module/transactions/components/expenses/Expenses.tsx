import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "../columns";
import { authContext } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsByType } from "@/services/api";
import { HashLoader } from "react-spinners";

type Props = {};

const Expenses = (props: Props) => {
  const { user } = React.useContext(authContext);
  const userId = user?.id;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type") ?? "";

  const {
    data: expenses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const data = await getTransactionsByType(userId, type);
      return data.data;
    },
  });

  console.log(expenses);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <HashLoader />
      </div>
    );
  }

  return (
    <section>
      <DataTable columns={columns} data={expenses} />
    </section>
  );
};

export default Expenses;
