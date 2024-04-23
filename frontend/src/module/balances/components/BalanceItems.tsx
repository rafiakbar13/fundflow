import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { IoIosArrowForward as Detail } from "react-icons/io";

type Props = {};

const BalanceItems = (props: Props) => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="w-full bg-white border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
            <p>Credit Card</p>
            <p>Master Card</p>
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
          <Button>
            Details
            <Detail />
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-full bg-white border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
            <p>Credit Card</p>
            <p>Master Card</p>
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
          <Button variant={"link"}>Remove</Button>
          <Button>
            Details
            <Detail />
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full bg-white border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
            <p>Credit Card</p>
            <p>Master Card</p>
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
          <Button variant={"link"}>Remove</Button>
          <Button>
            Details
            <Detail />
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full bg-white border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
            <p>Credit Card</p>
            <p>Master Card</p>
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
          <Button variant={"link"}>Remove</Button>
          <Button>
            Details
            <Detail />
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full bg-white border-none shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
            <p>Credit Card</p>
            <p>Master Card</p>
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
          <Button variant={"link"}>Remove</Button>
          <Button>
            Details
            <Detail />
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default BalanceItems;
