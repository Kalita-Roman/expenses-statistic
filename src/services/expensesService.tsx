// import { validate as validateUUID } from "uuid";
import { prisma } from "@/services/prismaService";
import { getUserId } from "@/services/authService";
import { Expense, ExpenseServiceResponse } from "@/types";

type re = ReturnType<typeof prisma.expenses.findMany>;
type re2 = re extends Promise<infer T> ? T : never;
type ExpenseDB = re2 extends Array<infer T> ? T : never;

const convertExpense = (expense: ExpenseDB): Expense => ({
  id: expense.id,
  date: expense.date,
  currency: expense.currency,
  amount: expense.amount.toNumber(),
});

const PAGE_SIZE = 20;

export const getExpenses = async ({
  page = 0,
}: { page?: number } = {}): Promise<ExpenseServiceResponse> => {
  const user = await getUserId();

  const expenses = await prisma.expenses.findMany({
    where: { user_id: user },
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { date: "desc" },
  });

  const total = await prisma.expenses.count({
    where: { user_id: user },
  });

  return {
    data: expenses.map(convertExpense),
    meta: {
      page,
      isLast: (page + 1) * PAGE_SIZE >= total,
    },
  };
};

export const getExpense = async ({
  id,
}: {
  id: string;
}): Promise<Expense | null> => {
  const user = await getUserId();

  let expense: ExpenseDB | null = null;
  try {
    expense = await prisma.expenses.findFirst({
      where: { id, user_id: user },
    });
  } catch (e) {
    console.error("Error fetching expense:", e);
    return null;
  }

  if (!expense) {
    return null;
  }

  return convertExpense(expense);
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
