import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { updateExpenses } from "@/services/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AmountInput } from "@/module/balances/components/CustomAccountInput";

const FormAdjustGoal = ({ expense }: any) => {
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      budget: expense.budget.toString(),
    },
  });
  const updateExpense: any = useMutation({
    mutationFn: async (data: any) => {
      return updateExpenses({ ...data, expensesId: expense?.id });
    },
    onSuccess: () => {
      toast.success("Expenses updated successfully");
      queryClient.invalidateQueries({ queryKey: ["expensesCategory"] });
    },
    onError: () => {
      toast.error("Failed to update expenses");
    },
  });

  function onSubmit(values: any) {
    // console.log(values);

    updateExpense.mutate(values);
  }

  return (
    <div>
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Budget</FormLabel>
                <FormControl>
                  <AmountInput
                    control={form.control}
                    name="budget"
                    placeholder="1.000"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default FormAdjustGoal;
