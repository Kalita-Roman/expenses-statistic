"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface SelectProps<T> {
  name?: string;
  options?: T[];
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  pickName?: (option: T) => string;
  pickValue?: (option: T) => string;
  disabled?: boolean;
  className?: string;
  isEdit?: boolean;
  readOnly?: boolean;
}

export const Select = <T,>({
  name,
  options = [],
  defaultValue,
  pickName = (option) => String(option),
  pickValue = (option) => String(option),
  disabled = false,
  className,
  readOnly = false,
}: SelectProps<T>) => {
  const shapeClasses = "border rounded px-2 py-1 h-8";
  const readOnlyClasses = "border-gray-600 bg-inherit text-white";
  const editableClasses = "border-gray-300 text-black";
  return (
    <select
      name={name}
      defaultValue={defaultValue && pickValue(defaultValue)}
      disabled={disabled}
      className={twMerge(
        shapeClasses,
        readOnly ? readOnlyClasses : editableClasses,
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none opacity-100",
        className
      )}
    >
      {readOnly && defaultValue && (
        <option value={pickValue(defaultValue)}>
          {pickName(defaultValue)}
        </option>
      )}
      {!readOnly && options.map((option, index) => (
        <option key={index} value={pickValue(option)}>
          {pickName(option)}
        </option>
      ))}
    </select>
  );
};
