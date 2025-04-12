"use client";
import { twMerge } from "tailwind-merge";

interface DatePickerProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
}

export const DatePicker = ({ className, ...props }: DatePickerProps) => {
  return <input className={twMerge(
    "border border-gray-300 rounded px-2 py-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 h-8",
    className
  )} type="date" {...props} />;
};
