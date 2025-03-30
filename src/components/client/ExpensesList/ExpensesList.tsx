"use client";
import React from "react";
import { VirtualList } from "./VirtualList";
import { QueryClientProviderWrapper } from "./QueryClientProviderWrapper";
import useInfinityLoading from "./hooks/useInfinityLoading";
import { useRouter } from "next/navigation";

const fetchExpenses = async ({
  pageParam = 0,
}: { pageParam?: number } | undefined = {}) => {
  const response = await fetch(`/api/expenses?page=${pageParam}`).then((res) =>
    res.json()
  );
  return response;
};

export const VirtualExpensesListA = () => {
  const router = useRouter();
  const { expenses, tryToFetchNextPage, isFetchingNextPage } =
    useInfinityLoading({ fetchExpenses });

  const handleView = (expenseId: string) => {
    router.push(`/expenses/view/${expenseId}`);
  };

  return (
    <VirtualList
      expenses={expenses}
      onLoadMore={tryToFetchNextPage}
      onView={handleView}
      isFetchingMore={isFetchingNextPage}
    />
  );
};

export const ExpensesList = () => {
  return (
    <QueryClientProviderWrapper>
      <VirtualExpensesListA />
    </QueryClientProviderWrapper>
  );
};
