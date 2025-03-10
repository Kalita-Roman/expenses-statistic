export type Expense = {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  note?: string;
  category?: string;
};
