import React from "react";
import Header from "@/components/Header";
import { DataTable } from "@/components/data-table/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getBills } from "@/services/api";
import { authContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import FormAddBills from "./FormAddBills";

type Props = {};

const Bills = (props: Props) => {
  const { user } = React.useContext(authContext);
  const {
    data: bills,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bills"],
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
      <div className="flex items-center justify-between pb-3">
        <Header title="Upcoming Bills" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="">Add Bills</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-fit">
            <DialogHeader>
              <DialogTitle>Add Bills</DialogTitle>
            </DialogHeader>
            <FormAddBills />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={bills} />
    </div>
  );
};

export default Bills;
