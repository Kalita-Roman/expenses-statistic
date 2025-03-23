import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Button = ({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={twMerge(
        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
