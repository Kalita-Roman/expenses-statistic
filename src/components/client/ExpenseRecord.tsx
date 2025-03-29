import { Expense } from "@/types";
import { Price, Date } from "@/components/presentation";

export const ExpenseRecord = ({
  expense,
  onView,
}: {
  expense: Expense;
  onView: () => void;
}) => {
  return (
    <div className="flex justify-between px-4 py-2" onClick={onView}>
      <Price amount={expense.amount} currency={expense.currency} />
      <Date date={expense.date} />
    </div>
  );
};
