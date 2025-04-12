"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps<T> {
  name?: string;
  options: T[];
  value?: T;
  onChange?: (value: T) => void;
  pickName?: (option: T) => string;
  pickValue?: (option: T) => string;
  disabled?: boolean;
  className?: string;
}

export const Select = <T,>({
  name,
  options,
  // value,
  // onChange,
  pickName = (option) => String(option),
  pickValue = (option) => String(option),
  disabled = false,
  className,
}: SelectProps<T>) => {
  return (
    <select
      name={name}
      // value={value !== undefined ? options.indexOf(value) : -1}
      // onChange={(e) => {
      //   const selectedIndex = parseInt(e.target.value, 10);
      //   if (onChange) onChange(options[selectedIndex]);
      // }}
      disabled={disabled}
      className={twMerge(
        "border border-gray-300 rounded px-2 py-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 h-8",
        className
      )}
    >
      {options.map((option, index) => (
        <option key={index} value={pickValue(option)}>
          {pickName(option)}
        </option>
      ))}
    </select>
  );
};
