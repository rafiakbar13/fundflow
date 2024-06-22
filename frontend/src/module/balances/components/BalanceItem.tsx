import Header from "@/components/Header";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./columns";
import AccountDetails from "./AccountDetails";
import { authContext } from "@/context/AuthContext";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/services/api";
import { HashLoader } from "react-spinners";

type Props = {};

const BalanceItem = (props: Props) => {
  const { id } = useParams();
  const accountId = id ?? "";
  const {
    data: balances,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["balancesDetail"],
    queryFn: async () => {
      const data = await getAccount(accountId);
      return data;
    },
  });

  if (isLoading) {
    return <HashLoader />;
  }

  return (
    <div className="p-4">
      <Header title="Account Details" />
      <div className="flex gap-x-3">
        <AccountDetails balances={balances} />
      </div>
      <div className="mt-4">
        <Header title="Transaction History" />
        <div className="mt-2">
          <DataTable columns={columns} data={balances.transactions} />
        </div>
      </div>
    </div>
  );
};

export default BalanceItem;
