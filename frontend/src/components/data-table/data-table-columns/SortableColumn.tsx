import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import React from "react";

type Props = {};

const SortableColumn = ({ column, title }: any) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="text-zinc-950"
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default SortableColumn;
