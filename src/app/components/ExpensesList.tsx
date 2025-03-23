import { getExpenses } from "@/services/expensesService";
import { ExpenseRecord } from "@/app/components";

export const ExpensesList = async () => {
  const expenses = await getExpenses();

  return (
    <div className="w-1/3">
      {expenses.map((expense) => (
        <div key={expense.id}>
          <ExpenseRecord expense={expense} />
        </div>
      ))}
    </div>
  );
};
