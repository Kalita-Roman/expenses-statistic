import React from "react";

interface CurrencyProps {
  currency?: string;
}

export const Currency: React.FC<CurrencyProps> = ({ currency }) => {
  return <span>{currency}</span>;
};