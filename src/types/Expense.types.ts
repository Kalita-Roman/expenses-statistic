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
  meta: object;
  error?: object;
};
