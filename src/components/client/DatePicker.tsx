"use client";
import { twMerge } from "tailwind-merge";

interface DatePickerProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const DatePicker = ({ className, readOnly, ...props }: DatePickerProps) => {
  const shapeClasses = "border rounded px-2 py-1 h-8";
  const readOnlyClasses = "border-gray-600 bg-inherit cursor-not-allowed text-white";
  const editableClasses = "border-gray-300 text-black";
  return <input
    type="date"
    className={twMerge(
      shapeClasses,
      readOnly ? readOnlyClasses : editableClasses,
      "focus:outline-none focus:ring-2 focus:ring-blue-500",
      className
    )} {...props} />;
};
