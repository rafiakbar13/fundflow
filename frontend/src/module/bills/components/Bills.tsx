import Header from "@/components/Header";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./columns";

type Props = {};

const Bills = (props: Props) => {
  return (
    <div className="p-5">
      <Header title="Upcoming Bills" />
      <DataTable columns={columns} data={[]} />
    </div>
  );
};

export default Bills;
