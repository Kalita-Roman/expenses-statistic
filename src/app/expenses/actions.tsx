"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Expense = {
  id: string;
  date: string;
  amount: number;
  currency: string;
  note: string | null;
  category: string | null;
};

export async function createExpense(prevState: unknown, formData: FormData) {
  try {
    const amount = formData.get("amount");

    if (amount === null) {
      throw new Error("Amount is required");
    }

    const expense = await prisma.expenses.create({
      data: {
        date: new Date(),
        amount: amount as unknown as number,
        currency: "PLN",
      },
    });

    return {
      data: {
        ...(expense as unknown as Expense),
        amount: expense.amount.toNumber(),
      },
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}
