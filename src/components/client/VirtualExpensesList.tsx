"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ExpenseRecord } from "@/components/client";

const fetchExpenses = async ({
  pageParam = 0,
}: { pageParam?: number } | undefined = {}) => {
  const response = await fetch(`/api/expenses?page=${pageParam}`).then((res) =>
    res.json()
  );
  return response;
};

const queryClient = new QueryClient();

export const VirtualExpensesListA: React.FC = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["expenses"],
      queryFn: ({ pageParam = 0 }) => fetchExpenses({ pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { isLast, page } = lastPage.meta;
        return isLast ? undefined : page + 1;
      },
    });

  const expenses = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const rowVirtualizer = useVirtualizer({
    count: expenses.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastIndex = virtualItems.at(-1)?.index;
    if (
      lastIndex &&
      lastIndex + 1 === expenses.length &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualItems, expenses, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div ref={parentRef} className="h-full w-full overflow-auto">
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              position: "relative",
              width: "100%",
            }}
          >
            {virtualItems.map((virtualRow) => {
              console.log(virtualRow);
              const expense = expenses[virtualRow.index];
              return (
                <div
                  key={expense.id}
                  data-index={virtualRow.index}
                  className="w-full"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <ExpenseRecord expense={expense} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const VirtualExpensesList = () => (
  <QueryClientProvider client={queryClient}>
    <VirtualExpensesListA />
  </QueryClientProvider>
);
