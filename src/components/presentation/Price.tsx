export const Price = ({
  amount,
  currency,
}: {
  amount?: number;
  currency?: string;
}) => {
  return (
    <div className="flex items-end gap-1 justify-end">
      {amount && <span>{amount}</span>}
      {currency && <span className="text-xs">{currency}</span>}
    </div>
  );
};
