import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BillsSchema, BillsSchemaType } from "@/lib/validationForm";
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
import { createAccount, createBills } from "@/services/api";

import { authContext } from "@/context/AuthContext";
import { AmountInput } from "@/module/balances/components/CustomAccountInput";
import { DatePicker } from "@/module/bills/components/date-picker";
const FormAddBills = () => {
  const { user } = useContext(authContext);
  const userId = user?.id;
  const queryClient = useQueryClient();
  const form = useForm<BillsSchemaType>({
    resolver: zodResolver(BillsSchema),
    defaultValues: {
      name: "",
      amount: "",
      dueDate: new Date(),
    },
  });

  const billsMutation = useMutation({
    mutationFn: async (data: BillsSchemaType) => {
      return createBills({ ...data, userId });
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (values: BillsSchemaType) => {
    // const { name, amount, dueDate } = values;
    billsMutation.mutate(values);
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <AmountInput
                      control={form.control}
                      name="amount"
                      placeholder="1.000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {billsMutation.isPending ? (
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

export default FormAddBills;
