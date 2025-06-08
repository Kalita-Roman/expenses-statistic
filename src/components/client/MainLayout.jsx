"use client";
import { useState } from "react";

export const MainLayout = ({ children, sideMenu }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
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
      <div className="flex w-full h-full">
        <aside
          className={`${
            open ? "block" : "hidden"
          } h-full bg-gray-900 text-white w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5`}
        >
          {sideMenu}
        </aside>
        <main className={`grow h-full ${open ? "hidden sm:block" : "block"}`}>
          {children}
        </main>
      </div>
    </div>
  );
};
