import { Key, ReactNode } from "react";

export interface VirtualListProps<T> {
  queryKey?: string[];
  queryFn: (params: {
    pageParam?: number;
  }) => Promise<{ data: T[]; meta: { isLast: boolean; page: number } }>;
  pickId?: (item: T) => Key | null | undefined;
  renderItem: (item: T) => ReactNode;
}
