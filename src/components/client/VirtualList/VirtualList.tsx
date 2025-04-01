import { QueryClientProviderWrapper } from "./QueryClientProviderWrapper";
import { VirtualListConsumer } from "./VirtualListConsumer";
import { VirtualListProps } from "./VirtualList.types";

export const VirtualList = <T,>(props: VirtualListProps<T>) => {
  return (
    <QueryClientProviderWrapper>
      <VirtualListConsumer {...props} />
    </QueryClientProviderWrapper>
  );
};
