"use client";
import { Input } from "@/components/presentation";

interface DatePickerProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  isEdit?: boolean;
}

export const DatePicker = ({ defaultValue, isEdit = true, ...props }: DatePickerProps) => {
  const today = new Date().toISOString().slice(0, 10);
  return <Input type="date" defaultValue={defaultValue || today} max={today} readOnly={!isEdit} {...props} />;
};
