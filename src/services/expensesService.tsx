import { Prisma, PrismaClient } from "@prisma/client";

type ExpenseWithAmount<T> = T & { amount: number };

const convertExpense = <T extends { amount: Prisma.Decimal }>(
  expense: T
): ExpenseWithAmount<T> => ({
  ...expense,
  amount: expense.amount.toNumber(),
});

export const getExpenses = async () => {
  const prisma = new PrismaClient();

  const expenses = await prisma.expenses.findMany();

  return expenses.map(convertExpense);
};
