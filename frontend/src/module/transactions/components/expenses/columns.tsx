import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import ActionColumn from "@/components/data-table/data-table-columns/ActionColumn";
import ImageColumn from "@/components/data-table/data-table-columns/ImageColumn";
import SortableColumn from "@/components/data-table/data-table-columns/SortableColumn";
import DateColumn from "@/components/data-table/data-table-columns/DateColumn";

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
    accessorKey: "items",
    header: () => (
      <DataTableColumnHeader
        title="Items"
        className="font-semibold text-zinc-950"
      />
    ),
    cell: ({ row }) => <ImageColumn row={row} accessorKey="image" />,
  },
  {
    accessorKey: "shopName",
    header: ({ column }) => (
      <SortableColumn column={column} title="Shop Name" />
    ),
    cell: ({ row }) => <span className="text-right">{row.original.name}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return <DateColumn row={row} accessorKey="createdAt" />;
    },
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <SortableColumn column={column} title="Payment Method" />
    ),
    cell: ({ row }) => <span className="text-right">{row.original.name}</span>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableColumn column={column} title="Amount" />,
    cell: ({ row }) => <span className="text-right">{row.original.name}</span>,
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
        <ActionColumn
          row={row}
          title="Menu"
          endpoint={`menu/${row.original.id}`}
        />
      );
    },
  },
];
