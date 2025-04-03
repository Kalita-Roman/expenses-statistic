import { ExpensesList, AddExpenseButton } from "@/components/client";

export default async () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <ExpensesList />
      </div>
      <div className="p-2">
        <AddExpenseButton />
      </div>
    </div>
  );
};
