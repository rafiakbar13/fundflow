import Header from "@/components/Header";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getBills } from "@/services/api";
import { authContext } from "@/context/AuthContext";

type Props = {};

const Bills = (props: Props) => {
  const { user } = React.useContext(authContext);
  const {
    data: bills,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["balances"],
    queryFn: async () => {
      const data = await getBills(user?.id);
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <Header title="Upcoming Bills" />
      <DataTable columns={columns} data={bills} />
    </div>
  );
};

export default Bills;
