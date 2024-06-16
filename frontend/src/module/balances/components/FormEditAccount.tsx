import React, { useContext, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AccountSchema, AccountSchemaType } from "@/lib/validationForm";
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
import { BankAccountInput, AmountInput } from "./CustomAccountInput";
import { updateAccount } from "@/services/api";
import { authContext } from "@/context/AuthContext";

const FormEditAccounts = ({ accountData }: any) => {
  const { user } = useContext(authContext);
  const userId = user?.id;
  const queryClient = useQueryClient();

  const form = useForm<AccountSchemaType>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      accountNumber: accountData?.accountNumber || "",
      balance: accountData?.balance.toString() || "",
      bankName: accountData?.bankName || "",
      type: accountData?.type || "",
    },
  });

  const balancesMutation = useMutation({
    mutationFn: async (data: AccountSchemaType) => {
      return updateAccount({ ...data, accountId: accountData.id });
    },
    onSuccess: (data: any) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["balancesDetail"] });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const onSubmit = async (values: AccountSchemaType) => {
    const { accountNumber, balance, bankName, type } = values;
    balancesMutation.mutate({
      accountNumber,
      balance,
      bankName,
      type,
    });
  };

  return (
    <section className="flex items-center justify-center w-1/3 h-full mx-auto">
      <article className="flex flex-col items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full mt-4 space-y-3"
          >
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank</FormLabel>
                  <FormControl>
                    <Input placeholder="Bank Name" {...field} />
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
                    <Input placeholder="Master Card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <AmountInput
                      control={form.control}
                      name="balance"
                      placeholder="1.000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <BankAccountInput
                      control={form.control}
                      name="accountNumber"
                      placeholder="3333 4324 5454 4***"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {balancesMutation.isPending ? (
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

export default FormEditAccounts;
