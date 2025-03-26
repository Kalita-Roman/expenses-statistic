"use client";
import React from "react";
import { VirtualList } from "./VirtualList";
import { QueryClientProviderWrapper } from "./QueryClientProviderWrapper";
import useInfinityLoading from "./hooks/useInfinityLoading";

const fetchExpenses = async ({
  pageParam = 0,
}: { pageParam?: number } | undefined = {}) => {
  const response = await fetch(`/api/expenses?page=${pageParam}`).then((res) =>
    res.json()
  );
  return response;
};

export const VirtualExpensesListA: React.FC = () => {
  const { expenses, tryToFetchNextPage, isFetchingNextPage } =
    useInfinityLoading({ fetchExpenses });

  return (
    <VirtualList
      expenses={expenses}
      onLoadMore={tryToFetchNextPage}
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
