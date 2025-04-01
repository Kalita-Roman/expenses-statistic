import { QueryClientProviderWrapper } from "./QueryClientProviderWrapper";
import { VirtualListConsumer } from "./VirtualListConsumer";
import { VirtualListProps } from "./VirtualList.types";

export const VirtualList = <T, R>(props: VirtualListProps<T, R>) => {
  return (
    <QueryClientProviderWrapper>
      <VirtualListConsumer {...props} />
    </QueryClientProviderWrapper>
  );
};
