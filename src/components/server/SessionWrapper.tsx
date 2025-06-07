import { ReactNode } from "react";
import { auth } from "@/auth.config";
import { SingInButton } from "./SingInButton";

export const SessionWrapper = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const session = await auth();
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SingInButton />
      </div>
    );
  }

  return <>{children}</>;
};
