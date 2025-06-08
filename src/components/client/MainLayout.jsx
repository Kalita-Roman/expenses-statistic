"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const MainLayout = ({ children, sideMenu }) => {
  const [open, setOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full bg-gray-800 text-white p-4 flex items-center justify-between">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          {open ? "Close" : "Open"}
        </button>
      </div>
      <div className="flex flex-grow w-full ">
        <aside
          className={`${
            open ? "block" : "hidden"
          } bg-gray-900 text-white w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5`}
        >
          {sideMenu}
        </aside>
        <main className={`grow ${open ? "hidden sm:block" : "block"}`}>
          {children}
        </main>
      </div>
    </div>
  );
};
