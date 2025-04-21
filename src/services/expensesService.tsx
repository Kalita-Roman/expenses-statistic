"use server";
import { prisma } from "@/services/prismaService";
import { getUserId } from "@/services/authService";
import { Expense, ExpenseServiceResponse } from "@/types";
import * as repository from "@/services/repository";

const PAGE_SIZE = 20;

export const getExpenses = async ({
  page = 0,
}: { page?: number } = {}): Promise<ExpenseServiceResponse> => {
  const user = await getUserId();

  const expenses = await repository.getExpensesPage({ user, page });
  const total = await repository.getExpensesCount({ user });

  return {
    data: expenses,
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
  return repository.getExpense({ user, id });
};

export const createExpense = async ({
  amount,
  date,
  category,
}: {
  amount: number;
  date: string;
  category: string;
}) => {
  const userId = await getUserId();

  return prisma.expenses.create({
    data: {
      date: new Date(date),
      amount: amount as unknown as number,
      category,
      currency: "PLN",
      user_id: userId,
    },
  });
};

export const editExpense = async ({
  id,
  amount,
  date,
  category,
}: {
  id: string;
  amount: number;
  date: string;
  category: string;
}) => {
  const userId = await getUserId();

  return prisma.expenses.updateMany({
    where: {
      id,
      user_id: userId,
    },
    data: {
      date: new Date(date),
      amount: amount as unknown as number,
      category,
      currency: "PLN",
    },
  });
}

export const deleteExpense = async ({ id }: { id: string }) => {
  const userId = await getUserId();

  return prisma.expenses.deleteMany({
    where: {
      id,
      user_id: userId,
    },
  });
};

export const getMonthlyExpenses = async () => {
  const userId = await getUserId();
  const categories = await repository.getCategories();
  const groups = await repository.getMonthlyExpenses({ userId });
  return ({
    monthName: new Date().toLocaleString('en', { month: "long" }),
    groups: groups.map(({ categoryId, ...group }) => ({ category: categories.find(({ id }) => categoryId === id), ...group })),
  })
}
