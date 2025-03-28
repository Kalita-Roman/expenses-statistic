import { Expense } from "@/types";
import { Price } from "@/components/presentation/Price";
import { dateToText } from "@/utils";

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
      <div>{dateToText(expense.date)}</div>
    </div>
  );
};
