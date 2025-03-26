"use client";
import React, { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ExpenseRecord } from "@/components/client";
import { Expense } from "@/types";

export const VirtualList: React.FC<{
  expenses: Expense[];
  onLoadMore?: () => void;
  isFetchingMore?: boolean;
}> = ({ expenses, onLoadMore = () => {}, isFetchingMore = false }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: expenses.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItemIndex = virtualItems.at(-1)?.index;
    if (
      lastItemIndex &&
      lastItemIndex + 1 === expenses.length &&
      !isFetchingMore
    ) {
      onLoadMore();
    }
  }, [virtualItems, expenses, isFetchingMore, onLoadMore]);

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
