import { prisma } from "@/services/prismaService";
import { UserId, Expense } from "@/types";

const PAGE_SIZE = 20;

type re = ReturnType<typeof prisma.expenses.findMany>;
type re2 = re extends Promise<infer T> ? T : never;
type ExpenseDB = re2 extends Array<infer T> ? T : never;

const convertExpense = (expense: ExpenseDB): Expense => ({
  id: expense.id,
  date: expense.date,
  currency: expense.currency,
  amount: expense.amount.toNumber(),
});

export const getExpensesPage = async ({ user, page }: { user: UserId, page: number }): Promise<Expense[]> => {
  const expenses = await prisma.expenses.findMany({
    where: { user_id: user },
    skip: page * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: [{ date: "desc" }, { created_at: "desc" }],
  });

  return expenses.map(convertExpense);
}

export const getExpensesCount = async ({ user, }: { user: UserId }): Promise<number> => {
  return prisma.expenses.count({
    where: { user_id: user },
  });
}

export const getExpense = async ({ id, user }: { id: string; user: UserId }): Promise<Expense | null> => {
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
}