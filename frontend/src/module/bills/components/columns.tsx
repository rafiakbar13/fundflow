import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionColumn from "@/components/data-table/data-table-columns/ActionColumn";
import ImageColumn from "@/components/data-table/data-table-columns/ImageColumn";
import SortableColumn from "@/components/data-table/data-table-columns/SortableColumn";
import DateColumn from "@/components/data-table/data-table-columns/DateColumn";
import { convertToIndonesianTime, toRupiah } from "@/lib/utils";
import { DeleteBtn } from "./DeleteBtn";
import { EditBtn } from "./EditBtn";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dueDate",
    header: () => (
      <div className="flex items-center justify-end">
        <DataTableColumnHeader
          title="Due Date"
          className="font-semibold text-zinc-950"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <span>{convertToIndonesianTime(row.original?.dueDate)}</span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <SortableColumn column={column} title="Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span className="font-semibold">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <SortableColumn column={column} title="Amount" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{toRupiah(row.original.amount)}</span>
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => (
      <DataTableColumnHeader
        title="Actions"
        className="font-semibold text-right text-zinc-950"
      />
    ),
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-3">
          <DeleteBtn billsId={row.original?.id} title="Bills" />
          <EditBtn data={row} />
        </div>
      );
    },
  },
];
