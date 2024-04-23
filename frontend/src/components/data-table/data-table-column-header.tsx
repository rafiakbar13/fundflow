import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  title: string;
  className: string;
}

export const DataTableColumnHeader = <TData, TValue>({
  title,
  className,
}: DataTableProps<TData, TValue>) => {
  return (
    <section>
      <div className={cn("flex items-center space-x-2", className)}>
        <span>{title}</span>
      </div>
    </section>
  );
};
