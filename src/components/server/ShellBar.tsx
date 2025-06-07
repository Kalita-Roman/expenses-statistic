import { ReactNode } from "react";
import { auth, signOut } from "@/auth.config";

export const ShellBar = async () => {
  const session = await auth();

  return (
    <div className="shell-bar w-full bg-gray-800 text-white p-4 flex justify-end items-center ml-auto">
      {session?.user?.email && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {session.user.image && (
            <img src={session.user.image} alt="avatar" className="w-8 h-8" />
          )}
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="flex ml-2"
          >
            <Button>Sign Out</Button>
          </form>
        </>
      )}
    </div>
  );
};

const Button = ({ children }: { children: ReactNode }) => (
  <button className="bg-transparent hover:bg-gray-900 text-white-700 font-semibold hover:text-white py-1 px-4 border border-white-500 hover:border-transparent rounded-full">
    {children}
  </button>
);

export default ShellBar;
