import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoIosArrowForward as Detail } from "react-icons/io";
import FormAddAccounts from "./FormNewAccounts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAccount, getAccounts } from "@/services/api";
import { authContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { secureAccountNumber, toRupiah } from "@/lib/utils";
type Props = {};

const BalanceItems = (props: Props) => {
  const { user } = React.useContext(authContext);
  const queryClient = useQueryClient();
  const {
    data: balances,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["balances"],
    queryFn: async () => {
      const data = await getAccounts(user?.id);
      return data;
    },
  });

  // delete account using react query
  const mutation = useMutation({
    mutationFn: async (accountId: string) => {
      await deleteAccount(accountId);
    },
    onSuccess: () => {
      // Invalidate and refetch accounts after deleting
      queryClient.invalidateQueries({ queryKey: ["balances"] });
    },
    onError: (error: any) => {
      console.error("Error deleting account:", error);
    },
  });

  const handleDelete = (accountId: string) => {
    mutation.mutate(accountId);
  };

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {balances?.map((balance: any) => (
        <Card className="w-full bg-white border-none shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
              <p>{balance?.bankName}</p>
              <p>{balance?.type}</p>
            </div>
          </CardHeader>
          <CardContent>
            <article className="px-4 space-y-4 ">
              <div className="space-y-1">
                <span className="text-lg font-semibold">
                  {balance?.accountNumber}
                </span>
                <p className="text-sm text-gray-400">Account Number</p>
              </div>

              <div className="space-y-1">
                <span className="text-lg font-semibold">
                  {toRupiah(balance?.balance)}
                </span>
                <p className="text-sm text-gray-400">Total Amount</p>
              </div>
            </article>
          </CardContent>
          <CardFooter className="flex justify-between gap-x-16">
            <Button
              variant={"link"}
              className="text-primary"
              onClick={() => handleDelete(balance?.id)}
            >
              Remove
            </Button>
            <Link to={`/dashboard/balances/${balance.id}`}>
              <Button>
                Detail
                <Detail />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}

      <Card className="flex items-center justify-center w-full h-full bg-white border-none shadow-md">
        <article className="flex flex-col items-center justify-center h-auto px-4 space-y-4">
          <div className="">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="">Add Accounts</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-fit">
                <DialogHeader>
                  <DialogTitle>Add Accounts</DialogTitle>
                </DialogHeader>
                <FormAddAccounts />
              </DialogContent>
            </Dialog>
          </div>
        </article>
      </Card>
    </section>
  );
};

export default BalanceItems;
