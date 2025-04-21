"use client";
import { Input } from "@/components/presentation";
import { twMerge } from "tailwind-merge";


interface DatePickerProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  isEdit?: boolean;
}

export const DatePicker = ({ defaultValue, isEdit = true, className, ...props }: DatePickerProps) => {
  const today = new Date().toISOString().slice(0, 10);
  return <Input
    type="date"
    className={twMerge('w-full', className)}
    defaultValue={defaultValue || today} max={today} readOnly={!isEdit} {...props} />;
};
