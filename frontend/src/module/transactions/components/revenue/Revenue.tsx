import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "../columns";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsByType } from "@/services/api";
import { authContext } from "@/context/AuthContext";

type Props = {};

const Revenue = (props: Props) => {
  const { user } = React.useContext(authContext);
  const userId = user?.id;
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type") ?? "";

  const {
    data: revenue,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["revenue"],
    queryFn: async () => {
      const data = await getTransactionsByType(userId, type);
      return data.data;
    },
  });

  console.log(revenue);

  return (
    <section>
      <DataTable columns={columns} data={[]} />
    </section>
  );
};

export default Revenue;
