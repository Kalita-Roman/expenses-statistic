import { ExpensesList, AddExpenseButton } from "@/components/client";
import { getCategories } from "@/services/categoryService";

export default async () => {
  const categories = await getCategories();
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ExpensesList />
      </div>
      <div className="p-2">
        <AddExpenseButton categories={categories} />
      </div>
    </div>
  );
};
