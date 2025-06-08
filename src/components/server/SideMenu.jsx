import { twMerge } from "tailwind-merge";
import Link from "next/link";
import UserSection from "./UserSection";

export const SideMenu = () => {
  return (
    <div className="h-full bg-gray-900 flex flex-col justify-between">
      <menu className="w-full flex flex-col p-2 gap-4">
        <Link href="/">Home</Link>
        <Link href="/expenses">Expenses</Link>
      </menu>
      <UserSection />
    </div>
  );
};
