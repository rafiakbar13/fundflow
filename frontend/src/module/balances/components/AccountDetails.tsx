import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/services/api";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormAddAccounts from "./FormNewAccounts";
import FormEditAccounts from "./FormEditAccount";
import { toRupiah } from "@/lib/utils";

interface BalancesAccount {
  id: string;
  bankName: string;
  type: string;
  balance: number;
  accountNumber: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface AccountDetailsProps {
  balances: BalancesAccount;
}

const AccountDetails = ({ balances }: AccountDetailsProps) => {
  return (
    <Card className="w-full mt-2 border-none ">
      <div className="grid grid-cols-3">
        <CardHeader>
          <p className="text-sm text-gray-400">Bank Account</p>
          <span>{balances?.bankName}</span>
        </CardHeader>
        <CardHeader>
          <p className="text-sm text-gray-400">Account Type</p>
          <span>{balances?.type}</span>
        </CardHeader>

        <CardHeader>
          <p className="text-sm text-gray-400">Balance</p>
          <span>{toRupiah(balances?.balance)}</span>
        </CardHeader>

        <CardHeader>
          <p className="text-sm text-gray-400">Account Number</p>
          <span>{balances?.accountNumber}</span>
        </CardHeader>
      </div>
      <CardFooter className="space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="">Edit Detail</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-fit">
            <DialogHeader>
              <DialogTitle>Edit Accounts</DialogTitle>
            </DialogHeader>
            <FormEditAccounts accountData={balances} />
          </DialogContent>
        </Dialog>
        <Button className="" variant={"link"}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountDetails;
