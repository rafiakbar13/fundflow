import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "../columns";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/services/api";
import { authContext } from "@/context/AuthContext";
import { HashLoader } from "react-spinners";
type Props = {};

const AllTransaction = (props: Props) => {
  const { user } = React.useContext(authContext);
  const userId = user?.id;
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const data = await getTransactions(userId);
      return data.data;
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
    <section>
      <DataTable columns={columns} data={transactions} />
    </section>
  );
};

export default AllTransaction;
