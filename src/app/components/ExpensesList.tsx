import { getExpenses } from "@/services/expensesService";
import { Price } from "@/app/components/presentential/Price";

export const ExpensesList = async () => {
  const expenses = await getExpenses();

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id}>
          {JSON.stringify(expense)}
          <Price amount={expense.amount} currency={expense.currency} />
        </div>
      ))}
    </div>
  );
};
