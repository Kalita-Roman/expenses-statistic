import { ExpensesList, AddExpenseButton } from "@/components/client";
import CategoryProvider from "@/components/client/Category/CategoryProvider";
import { getCategories } from "@/services/categoryService";

export default async () => {
  const categories = await getCategories();
  return (
    <div className="flex flex-col h-full">
      <CategoryProvider categories={categories}>
        <div className="flex-grow">
          <ExpensesList />
        </div>
        <div className="p-2">
          <AddExpenseButton categories={categories} />
        </div>
      </CategoryProvider>
    </div>
  );
};
