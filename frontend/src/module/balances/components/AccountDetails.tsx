import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
type Props = {};

const AccountDetails = (props: Props) => {
  return (
    <Card className="w-full mt-2 border-none ">
      <div className="grid grid-cols-3">
        <CardHeader>
          <p className="text-sm text-gray-400">Bank Account</p>
          <span>Bank Central Asia</span>
        </CardHeader>
        <CardHeader>
          <p className="text-sm text-gray-400">Bank Account</p>
          <span>Bank Central Asia</span>
        </CardHeader>

        <CardHeader>
          <p className="text-sm text-gray-400">Bank Account</p>
          <span>Bank Central Asia</span>
        </CardHeader>

        <CardHeader>
          <p className="text-sm text-gray-400">Bank Account</p>
          <span>Bank Central Asia</span>
        </CardHeader>

        <CardHeader>
          <p className="text-sm text-gray-400">Bank Account</p>
          <span>Bank Central Asia</span>
        </CardHeader>
      </div>
      <CardFooter className="space-x-4">
        <Button className="">Edit Details</Button>
        <Button className="" variant={"link"}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountDetails;
