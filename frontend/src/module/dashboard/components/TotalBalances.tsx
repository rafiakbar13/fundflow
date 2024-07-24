import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import BalancesCarousel from "../components/carousel/BalancesCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useQuery } from "@tanstack/react-query";
import { getAccounts } from "@/services/api";
import { authContext } from "@/context/AuthContext";

type Props = {};

const TotalBalances = (props: Props) => {
  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const { user } = React.useContext(authContext);
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
  // console.log(balances.length);

  // const DATA = Array.from(Array(balances?.length).keys());

  return (
    <div>
      <BalancesCarousel data={balances} slides={SLIDES} options={OPTIONS} />

      {/* <Card className="w-full bg-white border-none shadow-md">
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
      </Card> */}
    </div>
  );
};

export default TotalBalances;
