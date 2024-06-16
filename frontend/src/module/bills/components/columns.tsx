import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionColumn from "@/components/data-table/data-table-columns/ActionColumn";
import ImageColumn from "@/components/data-table/data-table-columns/ImageColumn";
import SortableColumn from "@/components/data-table/data-table-columns/SortableColumn";
import DateColumn from "@/components/data-table/data-table-columns/DateColumn";
import { convertToIndonesianTime, toRupiah } from "@/lib/utils";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dueDate",
    header: () => (
      <DataTableColumnHeader
        title="Due Date"
        className="font-semibold text-zinc-950"
      />
    ),
    cell: ({ row }) => (
      <span className="text-right">
        {convertToIndonesianTime(row.original.dueDate)}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
    cell: ({ row }) => (
      <span className="text-base font-semibold text-right">
        {row.original.name}
      </span>
    ),
  },
  // {
  //   accessorKey: "description",
  //   header: "Item Description",
  //   cell: ({ row }) => {
  //     return <DateColumn row={row} accessorKey="createdAt" />;
  //   },
  // },
  // {
  //   accessorKey: "charger",
  //   header: ({ column }) => (
  //     <SortableColumn column={column} title="Last Charge" />
  //   ),
  //   cell: ({ row }) => <span className="text-right">{row.original.name}</span>,
  // },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableColumn column={column} title="Amount" />,
    cell: ({ row }) => (
      <span className="text-right">{toRupiah(row.original.amount)}</span>
    ),
  },
];
