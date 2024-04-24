import Header from "@/components/Header";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./columns";
import AccountDetails from "./AccountDetails";

type Props = {};

const BalanceItem = (props: Props) => {
  return (
    <div className="p-4">
      <Header title="Account Details" />
      <div className="flex gap-x-3">
        <AccountDetails />
      </div>
      <div className="mt-4">
        <Header title="Transaction History" />
        <div className="mt-2">
          <DataTable columns={columns} data={[]} />
        </div>
      </div>
    </div>
  );
};

export default BalanceItem;
