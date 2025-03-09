import { Prisma } from "@prisma/client";
import { prisma } from "@/services/prismaService";
import { getUserId } from "@/services/authService";

type ExpenseWithAmount<T> = T & { amount: number };

const convertExpense = <T extends { amount: Prisma.Decimal }>(
  expense: T
): ExpenseWithAmount<T> => ({
  ...expense,
  amount: expense.amount.toNumber(),
});

export const getExpenses = async () => {
  const user = await getUserId();

  const expenses = await prisma.expenses.findMany({ where: { user_id: user } });

  return expenses.map(convertExpense);
};

export const createExpense = async ({ amount }: { amount: number }) => {
  const userId = await getUserId();

  return prisma.expenses.create({
    data: {
      date: new Date(),
      amount: amount as unknown as number,
      currency: "PLN",
      user_id: userId,
    },
  });
};
