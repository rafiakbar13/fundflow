import React, { useState } from "react";
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Card, CardHeader, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/services/api";
import { authContext } from "@/context/AuthContext";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Expenses Comparison",
    },
  },
};

// Function to generate random colors
const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
};

// Function to get unique colors for each label
const getColorForLabel = (label: string, colorMap: Record<string, string>) => {
  if (!colorMap[label]) {
    colorMap[label] = generateRandomColor();
  }
  return colorMap[label];
};

const ComparisonExpenses = () => {
  const { user } = React.useContext(authContext);
  const [comparisonType, setComparisonType] = useState("monthly");

  const {
    data: expenses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const data = await getExpenses(user?.id);
      return data;
    },
  });

  const processMonthlyData = () => {
    const monthlyData: Record<string, number[]> = {};

    expenses.forEach((expense: any) => {
      expense.transactions.forEach((transaction: any) => {
        const month = new Date(transaction.date).getMonth();
        if (!monthlyData[expense.name]) {
          monthlyData[expense.name] = new Array(12).fill(0);
        }
        monthlyData[expense.name][month] += transaction.amount;
      });
    });

    return monthlyData;
  };

  const processYearlyData = () => {
    const yearlyData: Record<string, number[]> = {};

    expenses.forEach((expense: any) => {
      expense.transactions.forEach((transaction: any) => {
        const year = new Date(transaction.date).getFullYear();
        if (!yearlyData[expense.name]) {
          yearlyData[expense.name] = {};
        }
        if (!yearlyData[expense.name][year]) {
          yearlyData[expense.name][year] = 0;
        }
        yearlyData[expense.name][year] += transaction.amount;
      });
    });

    const years = Object.keys(yearlyData[expenses[0]?.name || ""] || {}).sort();
    const result: Record<string, number[]> = {};
    for (const [key, value] of Object.entries(yearlyData)) {
      result[key] = years.map((year) => value[year] || 0);
    }

    return { data: result, labels: years };
  };

  const monthlyData = processMonthlyData();
  const yearlyData = processYearlyData();
  const colorMap: Record<string, string> = {};

  const data =
    comparisonType === "monthly"
      ? {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: Object.keys(monthlyData).map((key) => ({
            label: key,
            data: monthlyData[key],
            backgroundColor: getColorForLabel(key, colorMap),
          })),
        }
      : {
          labels: yearlyData.labels,
          datasets: Object.keys(yearlyData.data).map((key) => ({
            label: key,
            data: yearlyData.data[key],
            backgroundColor: getColorForLabel(key, colorMap),
          })),
        };

  return (
    <Card className="">
      <CardHeader>
        <article className="flex items-center justify-between pb-2 border-b-[1px]">
          {/* Comparison */}
          <Select onValueChange={(value) => setComparisonType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select comparison" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="monthly">Monthly Comparison</SelectItem>
                <SelectItem value="yearly">Yearly Comparison</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Tag info */}
          {/* <div className="flex items-center gap-x-4">
            <div className="w-8 h-4 bg-primary"></div>
            <span>This Week</span>
            <div className="w-8 h-4 bg-gray-500"></div>
            <span>Last Week</span>
          </div> */}
        </article>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading expenses</p>
        ) : (
          <article className="">
            <Bar options={options} data={data} />
          </article>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonExpenses;
