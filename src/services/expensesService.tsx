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
}: {
  amount: number;
  date: string;
}) => {
  const userId = await getUserId();

  return prisma.expenses.create({
    data: {
      date: new Date(date),
      amount: amount as unknown as number,
      currency: "PLN",
      user_id: userId,
    },
  });
};

export const deleteExpense = async ({ id }: { id: string }) => {
  const userId = await getUserId();

  return prisma.expenses.deleteMany({
    where: {
      id,
      user_id: userId,
    },
  });
};
