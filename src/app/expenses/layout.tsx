import { ExpensesList } from "@/components/server";
import { ButtonLikeLink } from "@/components/presentation";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ButtonLikeLink href="/expenses/add">Add</ButtonLikeLink>
      <ExpensesList />
      <div>{children}</div>
    </>
  );
}
