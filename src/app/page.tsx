// import { sql } from "@vercel/postgres";
import { auth, signIn, signOut } from "../../auth.config"
// import { Button } from "@/app/ui/components/button"

export default async function Home() {

  // const { rows } = await sql`SELECT * FROM users`;

  const session = await auth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">Hello, World!</h1>
        <form
          action={async () => {
            "use server"
            // await signIn(provider)
            await signIn()
          }}
        >
          {/* <Button {...props}>Sign In</Button> */}
          <button>Sign In</button>
        </form>
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
          className="w-full"
        >
          {/* <Button variant="ghost" className="w-full p-0" {...props}> */}
          <button className="w-full p-0">
            Sign Out
          </button>
        </form>
        <p className="text-lg text-center">
          {/* {JSON.stringify(rows)} */}
        </p>
        <p className="text-lg text-center">
          {JSON.stringify(session)}
        </p>
        <p className="text-lg text-center">
          {JSON.stringify(session?.user)}
        </p>
      </main>
    </div>
  );
}
