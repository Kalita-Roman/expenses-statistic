import Link from "next/link";
import { twMerge } from "tailwind-merge";

type LinkType = React.ComponentProps<typeof Link>;

export const ButtonLikeLink = ({ children, className, ...props }: LinkType) => {
  return (
    <Link
      className={twMerge(
        "inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
