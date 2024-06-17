import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteBills } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TbEdit } from "react-icons/tb";
import { toast } from "sonner";
import FormAEditBills from "./FormEditBills";

export function EditBtn({ data }: any) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (billsId: string) => {
      await deleteBills(billsId);
    },
    onSuccess: () => {
      // Invalidate and refetch accounts after deleting
      toast.success("Bills deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleDelete = (billsId: string) => {
    console.log(billsId);
    mutation.mutate(billsId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-6 h-6 text-white bg-blue-400"
          size={"icon"}
        >
          <TbEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bill</DialogTitle>
        </DialogHeader>
        <FormAEditBills data={data} />
      </DialogContent>
    </Dialog>
  );
}
