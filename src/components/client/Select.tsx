"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps<T> {
  name?: string;
  options: T[];
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  pickName?: (option: T) => string;
  pickValue?: (option: T) => string;
  disabled?: boolean;
  className?: string;
  isEdit?: boolean;
}

export const Select = <T,>({
  name,
  options = [],
  defaultValue,
  // value,
  // onChange,
  pickName = (option) => String(option),
  pickValue = (option) => String(option),
  disabled = false,
  className,
}: SelectProps<T>) => {
  const shapeClasses = "border rounded px-2 py-1 h-8";
  const readOnlyClasses = "border-gray-600 bg-inherit cursor-not-allowed text-white";
  const editableClasses = "border-gray-300 text-black";
  return (
    <select
      name={name}
      // value={value !== undefined ? options.indexOf(value) : -1}
      // onChange={(e) => {
      //   const selectedIndex = parseInt(e.target.value, 10);
      //   if (onChange) onChange(options[selectedIndex]);
      // }}
      defaultValue={defaultValue && pickValue(defaultValue)}
      disabled={disabled}
      className={twMerge(
        shapeClasses,
        disabled ? readOnlyClasses : editableClasses,
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
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
