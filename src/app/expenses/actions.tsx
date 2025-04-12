"use server";
import * as expensesService from "@/services/expensesService";
import { Expense } from "@/types";

export async function createExpense(prevState: unknown, formData: FormData) {
  try {
    const amount = formData.get("amount");
    const date = formData.get("date");
    const category = formData.get("category");

    if (amount === null) {
      throw new Error("Amount is required");
    }

    const expense = await expensesService.createExpense({
      amount: amount as unknown as number,
      date: date as string,
      category: category as string,
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

export async function editExpense(prevState: unknown, formData: FormData) {
  try {
    const id = formData.get("id");
    const amount = formData.get("amount");
    const date = formData.get("date");
    const category = formData.get("category");

    const expense = await expensesService.editExpense({
      id: id as string,
      amount: amount as unknown as number,
      date: date as string,
      category: category as string,
    });

    return {
      data: {
        ...(expense as unknown as Expense),
      },
    };
  } catch (error) {
    return { error };
  }
}
