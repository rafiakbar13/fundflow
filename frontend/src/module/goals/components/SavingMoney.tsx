import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { authContext } from "@/context/AuthContext";
import Chart from "react-apexcharts";

import SubHeader from "@/components/SubHeader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { PiMedalMilitaryLight as Achieved } from "react-icons/pi";
import { TbArcheryArrow as Target } from "react-icons/tb";
import { LuPencilLine as Pen } from "react-icons/lu";
import { DatePicker } from "./date-picker";
import { getGoals } from "@/api/api";

type Props = {};

const SavingMoney = (props: Props) => {
  const { user } = useContext(authContext);

  const ChartConfig = {
    options: {
      chart: {
        id: "basic-bar",
      },
    },
    series: [68],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#333",
          startAngle: -90,
          endAngle: 90,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "butt",
    },
    labels: ["Progress"],
  };

  const goals = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const goals = await getGoals(user?.id);
      return goals;
    },
  });

  const goal = goals.data?.goals;
  console.log(goal);

  return (
    <Card className="w-7/12 mt-2 bg-white border-none shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
          <SubHeader title="Saving Summary" className="mr-2 text-nowrap" />
          <DatePicker />
        </div>
        <CardContent>
          <div className="flex items-center justify-between pt-2">
            {goal?.map((goal: any) => (
              <div className="space-y-8">
                {/* Target Achieved */}
                <div className="flex items-center space-x-3">
                  <Achieved size={32} />
                  <div>
                    <h5 className="text-sm text-gray-400">Target Achieved</h5>
                    <span className="text-lg font-semibold">
                      ${goal.presentAmount}
                    </span>
                  </div>
                </div>
                {/* This Mont Target */}
                <div className="flex items-center space-x-3">
                  <Target size={32} />
                  <div>
                    <h5 className="text-sm text-gray-400">This Month Target</h5>
                    <span className="text-lg font-semibold">
                      ${goal.targetAmount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* Chart */}
            <div className="w-40">
              <Chart {...ChartConfig} type="radialBar" height={200} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <div className="mx-auto">
                <Button
                  variant={"outline"}
                  className="border-primary text-primary"
                >
                  Adjust Goal
                  <Pen className="ml-3" />
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="w-1/3">
              <div className="">
                <form action="" className="flex flex-col gap-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount</Label>
                    <Input
                      type="number"
                      id="targetAmount"
                      name="targetAmount"
                      className="w-full"
                      placeholder="$200,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="presentAmount">Present Amount</Label>
                    <Input
                      type="number"
                      id="presentAmount"
                      name="presentAmount"
                      className="w-full"
                      placeholder="$100,000"
                    />
                  </div>
                </form>
              </div>
              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default SavingMoney;
