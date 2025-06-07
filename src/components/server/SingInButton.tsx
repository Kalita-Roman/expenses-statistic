import { signIn } from "@/auth.config";
import { ReactNode } from "react";

export const SingInButton = () => (
  <form
    action={async () => {
      "use server";
      await signIn();
    }}
  >
    <Button>Sign In</Button>
  </form>
);

const Button = ({ children }: { children: ReactNode }) => (
  <button className="bg-transparent hover:bg-gray-900 text-white-700 font-semibold hover:text-white py-3 px-8 text-lg border border-white-500 hover:border-transparent rounded-full">
    {children}
  </button>
);

export default SingInButton;
