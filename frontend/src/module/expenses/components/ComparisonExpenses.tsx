import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const ComparisonExpenses = () => {
  return (
    <Card className="">
      <CardHeader>
        <article className="flex items-center justify-between pb-2 border-b-[1px]">
          {/* Comparison */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select comparison" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="monthly">Monthly Comparison</SelectItem>
                <SelectItem value="daily">Daily Comparison</SelectItem>
                <SelectItem value="year">Year Comparison</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Tag info */}
          <div className="flex items-center gap-x-4">
            <div className="w-8 h-4 bg-primary"></div>
            <span>This Week</span>
            <div className="w-8 h-4 bg-gray-500"></div>
            <span>Last Week</span>
          </div>
        </article>
      </CardHeader>
      <CardContent>
        <article className="">
          <Bar options={options} data={data} />
        </article>
      </CardContent>
    </Card>
  );
};

export default ComparisonExpenses;
