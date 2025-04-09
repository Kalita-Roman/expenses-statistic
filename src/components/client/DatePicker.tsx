"use client";

interface DatePickerProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  disabled?: boolean;
}

export const DatePicker = ({ ...props }: DatePickerProps) => {
  return <input type="date" { ...props }/>;
};
