import { ExpensesList } from "@/components/client";
import { ButtonLikeLink } from "@/components/presentation";
import { redirect } from "next/navigation";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleView = async (expenseId: string) => {
    "use server";
    redirect(`/expenses/view/${expenseId}`);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <ExpensesList onView={handleView} />
        </div>
        <div className="p-2 w-full">
          <ButtonLikeLink className="w-full" href="/expenses/add">
            Add
          </ButtonLikeLink>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
