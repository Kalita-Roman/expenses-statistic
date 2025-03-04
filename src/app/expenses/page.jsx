// import Expense from "@/app/components/Expense";
import { Expense, ExpensesList } from "@/app/components";

export default async function Expenses() {
  return (
    <div>
      <ExpensesList />
      <Expense />
    </div>
  );
}
