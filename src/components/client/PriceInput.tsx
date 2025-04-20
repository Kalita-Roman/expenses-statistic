import { Currency } from "@/components/presentation";
import { DecimalInput } from "@/components/client";

interface PriceInputProps {
  amount?: number;
  currency?: string;
  isEdit: boolean;
  disabled?: boolean;
}

export const PriceInput = ({ amount, currency, isEdit, disabled }: PriceInputProps) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <Currency currency={currency || 'PLN'} />
      <DecimalInput name="amount" defaultValue={amount} readOnly={!isEdit} disabled={disabled} className="flex-grow" />
    </div>
  );
}