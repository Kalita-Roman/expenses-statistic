import { prisma } from "@/db";

export default async function Page() {
  const users = await prisma.users.findMany();

  return (
    <div>
      <h1>App</h1>
      <div>{JSON.stringify(users)}</div>
    </div>
  )
}
