import { getMonthlyExpenses } from "@/services/expensesService";
import { getCategories } from "@/services/categoryService";
import { MonthExpensesChart, AddExpenseButton } from "@/components/client";
import CategoryProvider from "@/components/client/Category/CategoryProvider";

export default async function Page() {
  const monthlyExpenses = await getMonthlyExpenses();
  const categories = await getCategories();

  return (
    <CategoryProvider categories={categories}>
      <div className="flex-grow h-full p-4 flex flex-col justify-between">
        <section className="flex-grow flex flex-col items-center justify-center h-full py-2">
          <h1>{monthlyExpenses.monthName}</h1>
          <div>
            <MonthExpensesChart
              data={monthlyExpenses.groups.map((group) => ({
                amount: group.sum.amount,
                label: group.category!.name,
              }))}
            />
          </div>
        </section>
        <AddExpenseButton />
      </div>
    </CategoryProvider>
  );
}
