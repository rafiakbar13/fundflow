import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}

export function secureAccountNumber(accountNumber: string) {
  const start = accountNumber.substring(0, accountNumber.length - 3);
  const masked = accountNumber
    .substring(accountNumber.length - 3)
    .replace(/\d/g, "*");

  return `${start}${masked}`;
}

export function convertToIndonesianTime(utcDateString: string) {
  const date = new Date(utcDateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  // Format options for Indonesian time, explicitly typed
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Using Intl.DateTimeFormat to format the date
  const formatter = new Intl.DateTimeFormat("id-ID", options);
  return formatter.format(date);
}
