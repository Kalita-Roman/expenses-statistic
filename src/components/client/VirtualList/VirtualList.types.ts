import { Key, ReactNode } from "react";
import { InfiniteData, GetNextPageParamFunction } from "@tanstack/react-query";

export interface VirtualListProps<T, R> {
  queryKey?: string[];
  queryFn: (params: { pageParam?: number }) => Promise<R>;
  pickId?: (item: T) => Key | null | undefined;
  renderItem: (item: T) => ReactNode;
  flatData: (data: InfiniteData<R>) => T[];
  getNextPageParam: GetNextPageParamFunction<number, R>;
}
