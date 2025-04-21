import { prisma } from "@/services/prismaService";
import { UserId, Expense, Category } from "@/types";

const PAGE_SIZE = 20;

type re = ReturnType<typeof prisma.expenses.findMany>;
type re2 = re extends Promise<infer T> ? T : never;
type ExpenseDB = re2 extends Array<infer T> ? T : never;

const convertExpense = (expense: ExpenseDB): Expense => ({
  id: expense.id,
  date: expense.date,
  currency: expense.currency,
  category: expense.category,
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

export const getCategories = async (): Promise<Category[]> => {
  const categories = await prisma.category.findMany({
    orderBy: [{ order: "asc" }],
  });

  return categories.map((category) => ({ name: category.name, id: category.id }));
};

export const getMonthlyExpenses = async ({ userId }: { userId: UserId }) => {
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const expenses = await prisma.expenses.groupBy({
    by: ['category', 'currency'],
    where: {
      user_id: userId,
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return expenses.map(({ _sum, currency, category }) => ({
    categoryId: category,
    sum: {
      amount: _sum.amount!.toNumber(),
      currency
    }
  }));
};