export const Price = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  return (
    <div>
      <span>{amount}</span>
      <span>{currency}</span>
    </div>
  );
};
