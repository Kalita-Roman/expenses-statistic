import { ReactNode } from "react";

type Session = {
  user?: {
    image: string;
  };
};

export const ShellBar = ({
  session,
  signIn,
  signOut,
}: {
  session: Session;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}) => {
  return (
    <div className="shell-bar bg-gray-800 text-white p-4 flex justify-end items-center ml-auto">
      {!session?.user && (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <Button>Sign In</Button>
        </form>
      )}
      {session?.user?.image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={session.user.image} alt="avatar" className="w-8 h-8" />
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
