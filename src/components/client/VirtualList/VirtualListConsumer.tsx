"use client";
import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery } from "@tanstack/react-query";
import { VirtualListProps } from "./VirtualList.types";

export const VirtualListConsumer = <T, R>({
  queryFn,
  queryKey = [],
  pickId = (item) => JSON.stringify(item),
  renderItem = () => null,
  flatData,
  getNextPageParam,
}: VirtualListProps<T, R>) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn,
      initialPageParam: 0,
      getNextPageParam,
    });

  const items = useMemo(() => {
    return (data && flatData(data)) || [];
  }, [data, flatData]);

  const tryToFetchNextPage = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItemIndex = virtualItems.at(-1)?.index;
    if (
      lastItemIndex &&
      lastItemIndex + 1 === items.length &&
      !isFetchingNextPage
    ) {
      tryToFetchNextPage();
    }
  }, [virtualItems, items, isFetchingNextPage, tryToFetchNextPage]);

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
              const item = items[virtualRow.index];
              return (
                <div
                  key={pickId(item)}
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
                  {renderItem(item)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
