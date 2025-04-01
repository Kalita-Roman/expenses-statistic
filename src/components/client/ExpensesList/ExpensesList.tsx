"use client";
import React, { useState } from "react";
import { ViewDialog, ExpenseRecord, VirtualList } from "@/components/client";
import { Expense, ExpenseServiceResponse } from "@/types";
import { InfiniteData } from "@tanstack/react-query";

const fetchExpenses = async ({
  pageParam = 0,
}: { pageParam?: number } | undefined = {}) => {
  const response = (await fetch(`/api/expenses?page=${pageParam}`).then((res) =>
    res.json()
  )) as Promise<ExpenseServiceResponse>;
  return response;
};

export const ExpensesList = () => {
  const [expenseToView, setExpenseToView] = useState<Expense | null>(null);

  const handleView = (expense: Expense) => {
    setExpenseToView(expense);
  };

  const handleCloseView = () => {
    setExpenseToView(null);
  };

  return (
    <>
      <VirtualList
        queryKey={["expenses"]}
        queryFn={({ pageParam = 0 }) => fetchExpenses({ pageParam })}
        renderItem={(item) => (
          <ExpenseRecord expense={item} onView={() => handleView(item)} />
        )}
        flatData={(data: InfiniteData<ExpenseServiceResponse>) => {
          return data.pages.flatMap((page) => page.data);
        }}
        getNextPageParam={(lastPage) => {
          const { isLast, page } = lastPage.meta;
          return isLast ? undefined : page + 1;
        }}
      />
      {expenseToView && (
        <ViewDialog expense={expenseToView} onClose={handleCloseView} />
      )}
    </>
  );
};
