export type Expense = {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  note?: string;
  category?: string;
};

export type ExpenseServiceResponse = {
  data: Expense[];
  meta: { isLast: boolean; page: number };
  error?: object;
};
