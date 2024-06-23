import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TransactionsSchema,
  TransactionsSchemaType,
} from "@/lib/validationForm";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createTransactions, getAccounts, getExpenses } from "@/services/api";

import { authContext } from "@/context/AuthContext";
import { AmountInput } from "@/module/balances/components/CustomAccountInput";
import { DatePicker } from "@/module/bills/components/date-picker";
const FormAddTransactions = () => {
  const { user } = useContext(authContext);
  const userId = user?.id;
  const queryClient = useQueryClient();
  const form = useForm<TransactionsSchemaType>({
    resolver: zodResolver(TransactionsSchema),
  });

  const [selectedType, setSelectedType] = useState("");

  const queries = useQueries({
    queries: [
      {
        queryKey: ["balances"],
        queryFn: async () => {
          const data = await getAccounts(user?.id);
          return data;
        },
      },
      {
        queryKey: ["expenses"],
        queryFn: async () => {
          const data = await getExpenses(user?.id);
          return data;
        },
      },
    ],
  });

  const [balancesResult, expensesResult] = queries;

  const {
    data: accounts,
    isLoading: isLoadingBalances,
    error: balancesError,
  } = balancesResult;
  const {
    data: expenses,
    isLoading: isLoadingBills,
    error: billsError,
  } = expensesResult;

  const transactionMutation = useMutation({
    mutationFn: async (data: TransactionsSchemaType) => {
      return createTransactions({ ...data, userId });
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (values: TransactionsSchemaType) => {
    console.log(values);

    transactionMutation.mutate(values);
  };

  return (
    <section className="flex items-center justify-center w-full h-full p-4 mx-auto">
      <article className="flex flex-col items-center justify-center w-full max-w-4xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} className="w-fit" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedType(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value="revenue"
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            Revenue
                          </SelectItem>
                          <SelectItem
                            value="expenses"
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            Expenses
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value="pending"
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            Pending
                          </SelectItem>
                          <SelectItem
                            value="completed"
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            Completed
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value="Credit Card"
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            Credit Card
                          </SelectItem>
                          <SelectItem
                            value="Cash"
                            className="cursor-pointer hover:bg-gray-100"
                          >
                            Cash
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Bank</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {accounts?.map((account: any) => (
                            <SelectItem
                              key={account?.id}
                              value={account?.id}
                              className="cursor-pointer hover:bg-gray-100"
                            >
                              {account?.bankName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expensesId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expenses</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      disabled={selectedType === "revenue"}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Expenses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {expenses?.map((account: any) => (
                            <SelectItem
                              key={account?.id}
                              value={account?.id}
                              className="cursor-pointer hover:bg-gray-100"
                            >
                              {account?.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                      className="w-fit"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
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
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <Button type="submit" className="w-full">
                {transactionMutation.isPending ? (
                  <HashLoader size={25} className="text-center" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </article>
    </section>
  );
};

export default FormAddTransactions;
