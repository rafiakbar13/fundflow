import React from "react";
import { IMaskInput } from "react-imask";
import { useController } from "react-hook-form";

export const BankAccountInput = ({
  control,
  name,
  className,
  ...props
}: any) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  const maskPattern = "0000 0000 0000 0***";

  return (
    <IMaskInput
      mask={maskPattern}
      value={field.value}
      unmask={false}
      onAccept={(value) => field.onChange(value)}
      {...props}
      className={`flex h-10 px-3 py-2 text-sm bg-white border rounded-md w-96 border-slate-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 ${className}`}
    />
  );
};

export const AmountInput = ({ control, name, className, ...props }: any) => {
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <IMaskInput
      mask={Number}
      scale={0}
      thousandsSeparator="."
      radix=","
      mapToRadix={["."]}
      value={field.value}
      unmask={false}
      onAccept={(value) => field.onChange(value)}
      {...props}
      className={`flex h-10 px-3 py-2 text-sm bg-white border rounded-md w-96 border-slate-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 ${className}`}
    />
  );
};
