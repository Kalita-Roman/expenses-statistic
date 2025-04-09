export type Expense = {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  note?: string;
  category?: string;
};

export type PagedResponseMeta = { isLast: boolean; page: number };

export type ServicePagedResponse<T> = {
  data: T[];
  meta: PagedResponseMeta;
  error?: object;
};

export type ExpenseServiceResponse = ServicePagedResponse<Expense>;

export type Category = {
  id: string;
};

export type CategoryServiceResponse = Category[];
