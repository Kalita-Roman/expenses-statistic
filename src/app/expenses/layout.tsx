import { ExpensesList } from "@/components/client";
import { ButtonLikeLink } from "@/components/presentation";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <ExpensesList />
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
