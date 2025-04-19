export type Expense = {
  id: string;
  date: Date;
  amount: number;
  currency: string;
  note?: string;
  category: CategoryId | null;
};

export type PagedResponseMeta = { isLast: boolean; page: number };

export type ServicePagedResponse<T> = {
  data: T[];
  meta: PagedResponseMeta;
  error?: object;
};

export type ExpenseServiceResponse = ServicePagedResponse<Expense>;

export type CategoryId = string;
export type Category = {
  id: CategoryId;
  name: string;
};

export type CategoryServiceResponse = Category[];
