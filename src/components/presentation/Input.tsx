import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Input = ({
  children,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const shapeClasses = "border rounded px-2 py-1 h-8";
  const readOnlyClasses = "border-gray-600 bg-inherit text-white";
  const editableClasses = "border-gray-300 text-black";
  return (
    <input
      className={twMerge(
        shapeClasses,
        props.readOnly ? readOnlyClasses : editableClasses,
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </input>
  );
};
