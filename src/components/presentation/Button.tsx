import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export enum ButtonType {
  Primary = "Primary",
  Outlined = "Outlined",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
}

export const Button = ({
  children,
  className,
  buttonType = ButtonType.Primary,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "font-bold py-2 px-4 rounded",
        "disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed",
        getButtonStyle(buttonType),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const getButtonStyle = (buttonType: ButtonType) => {
  switch (buttonType) {
    case ButtonType.Primary:
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case ButtonType.Outlined:
      return "border border-blue-500 text-blue-500 hover:bg-blue-100";
  }
};
