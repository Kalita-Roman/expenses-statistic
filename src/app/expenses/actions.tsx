"use server";
import { getAuthUserId } from "@/services/authService";
import * as expensesService from "@/services/expensesService";

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

    const userId = await getAuthUserId();
    console.log("userId", userId);

    const expense = await expensesService.createExpense({
      amount: amount as unknown as number,
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
