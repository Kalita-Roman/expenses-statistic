"use server";
import * as expensesService from "@/services/expensesService";
import { Expense } from "@/types";
import { console } from "inspector";

export async function createExpense(prevState: unknown, formData: FormData) {
  try {
    const amount = formData.get("amount");
    const date = formData.get("date");
    console.log(">>> date", date);

    if (amount === null) {
      throw new Error("Amount is required");
    }

    const expense = await expensesService.createExpense({
      amount: amount as unknown as number,
      date: date as string,
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

export async function editExpense(
  prevState: unknown,
  formData: FormData,
  id: string
) {
  try {
    const amount = formData.get("amount");

    if (amount === null) {
      throw new Error("Amount is required");
    }

    const expense = await expensesService.updateExpense({
      id,
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
