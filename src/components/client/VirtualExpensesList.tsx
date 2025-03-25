"use client";
import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ExpenseRecord } from "@/components/client";

interface VirtualExpensesListProps {
  expenses: unknown[]; // adjust type as needed
}

export const VirtualExpensesList: React.FC<VirtualExpensesListProps> = ({
  expenses,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: expenses.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

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
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
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
