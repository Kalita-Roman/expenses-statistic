import { ExpensesList } from "@/app/components";
import { ExpenseForm } from "@/app/components/client";

export default async function Expenses() {
  return (
    <div>
      <ExpensesList />
      <ExpenseForm />
    </div>
  );
}
