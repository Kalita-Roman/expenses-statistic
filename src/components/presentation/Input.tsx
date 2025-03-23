import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Input = ({
  children,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={twMerge(
        "border border-gray-300 rounded px-2 py-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    >
      {children}
    </input>
  );
};
