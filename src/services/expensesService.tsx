import { prisma } from "@/services/prismaService";
import { getUserId } from "@/services/authService";
import { Expense } from "@/types";

type re = ReturnType<typeof prisma.expenses.findMany>;
type re2 = re extends Promise<infer T> ? T : never;
type ExpenseDB = re2 extends Array<infer T> ? T : never;

const convertExpense = (expense: ExpenseDB): Expense => ({
  id: expense.id,
  date: expense.date,
  currency: expense.currency,
  amount: expense.amount.toNumber(),
});

export const getExpenses = async (): Promise<Expense[]> => {
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
