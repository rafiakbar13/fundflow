import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ExpensesSchema, ExpensesSchemaType } from "@/lib/validationForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createExpenses } from "@/services/api";

import { authContext } from "@/context/AuthContext";
import { AmountInput } from "@/module/balances/components/CustomAccountInput";
import { DatePicker } from "@/module/bills/components/date-picker";
const FormAddExpenses = () => {
  const { user } = useContext(authContext);
  const userId = user?.id;
  const queryClient = useQueryClient();
  const form = useForm<ExpensesSchemaType>({
    resolver: zodResolver(ExpensesSchema),
    defaultValues: {
      name: "",
      budget: "",
    },
  });

  const expensesMutation = useMutation({
    mutationFn: async (data: ExpensesSchemaType) => {
      return createExpenses({ ...data, userId });
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (values: ExpensesSchemaType) => {
    // const { name, amount, dueDate } = values;
    expensesMutation.mutate(values);
  };

  return (
    <section className="flex items-center justify-center w-1/3 h-full mx-auto ">
      <article className="flex flex-col items-center justify-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full mt-4 space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <AmountInput
                      control={form.control}
                      name="budget"
                      placeholder="1.000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {expensesMutation.isPending ? (
                <HashLoader size={25} className="text-center" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </article>
    </section>
  );
};

export default FormAddExpenses;
