import { signOut } from "@/auth.config";
import { ReactNode } from "react";

export const SignOutButton = () => (
  <form
    action={async () => {
      "use server";
      await signOut();
    }}
    className="flex ml-2"
  >
    <Button>Sign Out</Button>
  </form>
);

const Button = ({ children }: { children: ReactNode }) => (
  <button className="bg-transparent hover:bg-gray-900 text-white-700 font-semibold hover:text-white py-1 px-4 border border-white-500 hover:border-transparent rounded-full">
    {children}
  </button>
);
