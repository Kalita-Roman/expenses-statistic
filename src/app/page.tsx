// import { prisma } from "@/db";
import { redirect } from "next/navigation";
// import { auth } from "../../auth.config";

export default async function Page() {
  // const users = await prisma.users.findMany();


  redirect('/expenses');

  // return (
  //   <div>
  //     <h1>App</h1>
  //     <div>{JSON.stringify(users)}</div>
  //   </div>
  // )
}
