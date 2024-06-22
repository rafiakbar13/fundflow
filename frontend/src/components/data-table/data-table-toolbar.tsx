// "use client";

// import { CrossIcon } from "lucide-react";
// import { Table } from "@tanstack/react-table";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "./data-table-view-options";
// import { FiSearch } from "react-icons/fi";

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>;
//   filterKeys?: string[];
// }

// export function DataTableToolbar<TData>({
//   table,
//   filterKeys,
// }: DataTableToolbarProps<TData>) {
//   const isFiltered = filterKeys?.some(
//     (key: string) => table.getState().columnFilters[key]?.length > 0
//   );
//   const handleInputChange = (key: any, value: any) => {
//     table.getColumn(key)?.setFilterValue(value);
//   };

//   const handleResetClick = () => {
//     filterKeys?.forEach((key: string) => {
//       table.getColumn(key)?.setFilterValue("");
//     });
//   };

//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex items-center flex-1 space-x-2">
//         {filterKeys?.map((key) => (
//           <div className="relative flex items-center w-2/5 " key={key}>
//             <Input
//               type="search"
//               className="pl-10 text-xs border-0 focus-visible:ring-1 focus-visible:ring-primary "
//               key={key}
//               placeholder={`Filter ${key}...`}
//               value={table.getColumn(key)?.getFilterValue()?.toString() ?? ""}
//               onChange={(event: any) =>
//                 handleInputChange(key, event.target.value)
//               }
//             />
//             <FiSearch
//               className="absolute transform -translate-y-1/2 text-primary left-3 top-1/2"
//               size={20}
//             />
//           </div>
//         ))}

//         {isFiltered && (
//           <Button
//             variant="ghost"
//             onClick={handleResetClick}
//             className="h-8 px-2 lg:px-3"
//           >
//             Reset
//             <CrossIcon className="w-4 h-4 ml-2" />
//           </Button>
//         )}
//       </div>
//       <DataTableViewOptions table={table} />
//     </div>
//   );
// }
