import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authContext } from "@/context/AuthContext";
import { convertToIndonesianTime, toRupiah } from "@/lib/utils";
import { getBills } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Bill {
  id: string;
  amount: number;
  dueDate: string;
  description: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const UpcomingBills = () => {
  const { user } = React.useContext(authContext);
  const {
    data: bills,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const data = await getBills(user?.id);
      return data;
    },
  });

  // Sorting bills by dueDate
  const sortedBills = React.useMemo(() => {
    if (bills) {
      return [...bills].sort(
        (a: Bill, b: Bill) =>
          new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    }
    return [];
  }, [bills]);

  return (
    <div className="">
      <Card className="w-full bg-white border-none shadow-md">
        <CardContent>
          {sortedBills?.map((bill: any) => (
            <article className="p-3 space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <div className="p-3 text-center bg-gray-400 rounded-md max-w-16">
                  {convertToIndonesianTime(bill.dueDate)}
                </div>
                <div className="w-2/3 ">
                  <span className="font-bold text-gray-500">{bill?.name}</span>
                </div>
                <div className="border rounded-md border-slate-200 max-w-fit text-wrap">
                  <span className="p-2">{toRupiah(bill?.amount)}</span>
                </div>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingBills;
