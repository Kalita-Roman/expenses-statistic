'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

const StateContext = createContext();

export const SideMenu = ({ children }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname]);

  return (
    <>
      <button onClick={() => setOpen(!open)}>{'Switch ' + open}</button>
      <div
        className={twMerge(
          `fixed top-[66px] bottom-0 left-0 h-full bg-gray-900 flex flex-col overflow-hidden transition-width duration-300 ease-in-out z-[1000] gap-8`,
          open ? 'w-1/3' : 'w-0',
        )}
      >
        <menu className='w-full h-full flex flex-col p-2 gap-4'>
          {children}
        </menu>
      </div>
    </>
  );
};

export const useStateContext = () => useContext(StateContext);