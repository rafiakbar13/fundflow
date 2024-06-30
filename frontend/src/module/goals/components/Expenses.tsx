import React, { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authContext } from "@/context/AuthContext";

import { Card } from "@/components/ui/card";
import { PiMedalMilitaryLight as Achieved } from "react-icons/pi";
import { LuPencilLine as Pen } from "react-icons/lu";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { getExpenses } from "@/services/api";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormAdjustGoal from "./FormAdjustGoal";
import { toRupiah } from "@/lib/utils";

type Props = {};

const Expenses = (props: Props) => {
  const { user } = useContext(authContext);

  const { data: expenses } = useQuery({
    queryKey: ["expensesCategory"],
    queryFn: () => getExpenses(user?.id),
  });

  console.log(expenses);

  return (
    <div className="grid grid-cols-2">
      {expenses?.map((expense: any) => (
        <Card
          className="px-4 py-8 mt-2 bg-white border-none shadow-md w-[400px]"
          key={expense.id}
        >
          <div className="flex items-center justify-between gap-x-8 ">
            <div className="space-y-8">
              {/* Target Achieved */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-200 rounded-md">
                  <Achieved size={24} className="" />
                </div>
                <div>
                  <h5 className="text-sm text-gray-400">{expense.name}</h5>
                  <span className="text-lg font-semibold">
                    {toRupiah(expense.budget)}
                  </span>
                </div>
              </div>
            </div>

            {/*  */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="border-primary text-primary"
                >
                  Adjust Goal
                  <Pen className="ml-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-1/3">
                <FormAdjustGoal expense={expense} />
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Expenses;
