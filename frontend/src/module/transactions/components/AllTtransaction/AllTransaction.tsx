import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./columns";

type Props = {};

const AllTransaction = (props: Props) => {
  return (
    <section>
      <DataTable columns={columns} data={[]} />
    </section>
  );
};

export default AllTransaction;
