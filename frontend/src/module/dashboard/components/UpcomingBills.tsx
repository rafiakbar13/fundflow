import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

type Props = {};

const UpcomingBills = (props: Props) => {
  return (
    <div>
      <Card className="w-full bg-white border-none shadow-md">
        <CardContent>
          <article className="p-3 space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 text-center bg-gray-400 rounded-md">
                <p>May</p>
                <span className="text-xl font-bold">15</span>
              </div>
              <div className="w-2/3 ">
                <p>Figma</p>
                <span className="font-bold text-gray-500">Figma - Monthly</span>
                <p className="text-sm text-gray-400">
                  Last Charge - 14 May 2024
                </p>
              </div>
              <div className="border rounded-md border-slate-200">
                <span className="p-2">$150</span>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center justify-center space-x-3">
                <div className="p-3 text-center bg-gray-400 rounded-md">
                  <p>May</p>
                  <span className="text-xl font-bold">15</span>
                </div>
                <div className="w-2/3 ">
                  <p>Figma</p>
                  <span className="font-bold text-gray-500">
                    Figma - Monthly
                  </span>
                  <p className="text-sm text-gray-400">
                    Last Charge - 14 May 2024
                  </p>
                </div>
                <div className="border rounded-md border-slate-200">
                  <span className="p-2">$150</span>
                </div>
              </div>
            </div>
          </article>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingBills;
