"use client";
import { Input } from "@/components/presentation";

interface DatePickerProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const DatePicker = ({ ...props }: DatePickerProps) => {
  const today = new Date().toISOString().slice(0, 10);
  return <Input type="date" {...props} max={today} />;
};
