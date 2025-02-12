import { ReactNode } from "react";
import { auth } from "../../../auth.config";

export const SessionWrapper = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
    const session = await auth();
    if (!session) {
        return <h1>Please, log in!</h1>;
    }
    
    return <>{children}</>;
}