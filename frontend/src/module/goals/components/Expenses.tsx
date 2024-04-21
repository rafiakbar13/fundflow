import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authContext } from "@/context/AuthContext";

import { Card } from "@/components/ui/card";
import { PiMedalMilitaryLight as Achieved } from "react-icons/pi";
import { LuPencilLine as Pen } from "react-icons/lu";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { getExpenses, updateExpenses } from "@/api/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {};

const Expenses = (props: Props) => {
  const { user } = useContext(authContext);
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      targetAmount: 0,
    },
  });

  const { data } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => getExpenses(user.id),
  });

  const expenses = data?.expenses;

  const updateExpense: any = useMutation({
    mutationFn: async (data: any) => {
      return updateExpenses({ ...data, expensesId: expenses[0]?.id });
    },
    onSuccess: () => {
      toast.success("Expenses updated successfully");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: () => {
      toast.error("Failed to update expenses");
    },
  });

  function onSubmit(values: any) {
    updateExpense.mutate(values);
  }

  return (
    <Card className="px-4 py-8 mt-2 bg-white border-none shadow-md w-fit">
      <div className="flex items-center justify-between gap-x-8 ">
        <div className="space-y-8">
          {/* Target Achieved */}
          {expenses?.map((expense: any) => (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-md">
                <Achieved size={24} className="" />
              </div>
              <div>
                <h5 className="text-sm text-gray-400">Housing</h5>
                <span className="text-lg font-semibold">
                  ${expense.targetAmount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/*  */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="border-primary text-primary">
              Adjust Goal
              <Pen className="ml-3" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-1/3">
            <Form {...form}>
              <form
                className="space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="targetAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="targetAmount"
                          {...field}
                          className="border-none"
                          type="number"
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
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default Expenses;
