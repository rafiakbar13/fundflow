import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

type Props = {};

const TotalBalances = (props: Props) => {
  return (
    <div>
      <Card className="w-full bg-white border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
            <p className="text-xl font-bold">$240,399</p>
            <p className="text-sm text-gray-600">All Account</p>
          </div>
        </CardHeader>
        <CardContent>
          <article className="px-4 space-y-4 ">
            <div className="space-y-1">
              <span className="text-lg font-semibold">3385 4324 5454 4***</span>
              <p className="text-sm text-gray-400">Account Number</p>
            </div>

            <div className="space-y-1">
              <span className="text-lg font-semibold">$25000</span>
              <p className="text-sm text-gray-400">Total Amount</p>
            </div>
          </article>
        </CardContent>
        <CardFooter className="flex justify-between gap-x-16">
          <Button variant={"link"} className="text-primary">
            Remove
          </Button>
          <Button></Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TotalBalances;
