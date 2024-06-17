import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteBills } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { toast } from "sonner";

export function DeleteBtn({ billsId, title }: any) {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-6 h-6" size={"icon"}>
          <X />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            bills and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(billsId)}>
            Delete {title}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
