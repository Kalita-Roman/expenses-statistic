import { twMerge } from "tailwind-merge";
import Link from "next/link";

export const SideMenu = () => {
  return (
    <div
      className={twMerge(
        `h-full bg-gray-900 flex flex-col overflow-hidden transition-width duration-300 ease-in-out z-[1000] gap-8`
      )}
    >
      <menu className="w-full h-full flex flex-col p-2 gap-4">
        <Link href="/">Home</Link>
        <Link href="/expenses">Expenses</Link>
      </menu>
    </div>
  );
};
