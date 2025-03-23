import { Expense } from "@/types";
import { Price } from "@/app/components/presentation/Price";

export const ExpenseRecord = ({ expense }: { expense: Expense }) => {
  return (
    <div className="flex justify-between px-4 py-2">
      <Price amount={expense.amount} currency={expense.currency} />
      <div>{expense.date.toISOString().slice(0, 10)}</div>
    </div>
  );
};
