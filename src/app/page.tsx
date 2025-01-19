// import { sql } from "@vercel/postgres";

export default async function Home() {

  // const { rows } = await sql`SELECT * FROM users`;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">Hello, World!</h1>
        <p className="text-lg text-center">
          {/* {JSON.stringify(rows)} */}
        </p>
      </main>
    </div>
  );
}
