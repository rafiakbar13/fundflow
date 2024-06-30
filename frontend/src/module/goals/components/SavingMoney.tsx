import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { getGoals, createGoals } from "@/services/api";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { AmountInput } from "@/module/balances/components/CustomAccountInput";

type Props = {};

const SavingMoney = (props: Props) => {
  const { user } = useContext(authContext);
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm();

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  // });

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

  const {
    data: goals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const data = await getGoals(user?.id);
      return data.data;
    },
  });

  console.log(goals);

  const createGoal: any = useMutation({
    mutationFn: async (data: any) => {
      return createGoals({ ...data, userId: user?.id });
    },
    onSuccess: () => {
      toast.success("Goal created successfully");
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
    onError: () => {
      toast.error("Failed to create goal");
    },
  });

  function onSubmit(values: any) {
    console.log(values);

    // const from = format(dateRange.from, "yyyy-MM-dd");

    // const to = format(dateRange.to, "yyyy-MM-dd");
    createGoal.mutate(values);
  }

  return (
    <Card className="w-7/12 mt-2 bg-white border-none shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between pb-4 border-b-[1px] border-slate-200">
          <SubHeader title="Saving Summary" className="mr-2 text-nowrap" />
          <DatePicker />
        </div>
        <CardContent>
          <div className="flex items-center justify-between pt-2">
            {goals?.map((goal: any) => (
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
                <form
                  action=""
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-y-2"
                >
                  <div className="space-y-2">
                    <Controller
                      name="dateRange"
                      control={control}
                      defaultValue={{
                        from: new Date(),
                        to: addDays(new Date(), 7),
                      }}
                      render={({ field }) => (
                        <div className="flex flex-col">
                          <Label htmlFor="date">Target Goals</Label>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount</Label>
                    <Controller
                      name="targetAmount"
                      control={control}
                      render={({ field }) => (
                        <AmountInput
                          control={control}
                          name="targetAmount"
                          placeholder="1.000"
                          className="w-full"
                        />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="presentAmount">Present Amount</Label>
                    <Controller
                      name="presentAmount"
                      control={control}
                      render={({ field }) => (
                        <AmountInput
                          control={control}
                          name="presentAmount"
                          placeholder="1.000"
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default SavingMoney;
