import { getExpenses } from "@/services/expensesService";
import { VirtualExpensesList } from "@/components/client/VirtualExpensesList";

export const ExpensesList = async () => {
  const expenses = await getExpenses();

  return (
      <VirtualExpensesList expenses={expenses} />
  );
};
