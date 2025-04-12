import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Input = ({
  children,
  className,
  readOnly,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const shapeClasses = "border rounded px-2 py-1 h-8";
  const readOnlyClasses = "border-gray-600 bg-inherit cursor-not-allowed text-white";
  const editableClasses = "border-gray-300 text-black";
  return (
    <input
      className={twMerge(
        shapeClasses,
        readOnly ? readOnlyClasses : editableClasses,
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      readOnly={readOnly}
      {...props}
    >
      {children}
    </input>
  );
};
