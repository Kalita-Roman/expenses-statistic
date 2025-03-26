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
        <div>
          <ButtonLikeLink href="/expenses/add">Add</ButtonLikeLink>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
