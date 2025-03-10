import { ExpenseForm, ExpensesList } from "@/app/components";

export default async function Expenses() {
  return (
    <div>
      <ExpensesList />
      <ExpenseForm />
    </div>
  );
}
