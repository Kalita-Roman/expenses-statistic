import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfinityLoading = ({
  fetchExpenses,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchExpenses: (params: { pageParam: number }) => Promise<any>;
}) => {
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

  const tryToFetchNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return { expenses, tryToFetchNextPage, isFetchingNextPage };
};

export default useInfinityLoading;
