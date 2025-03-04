"use client";
import Form from "next/form";
import { useActionState } from "react";
import DecimalInput from "@/app/components/client/DecimalInput";
import { createExpense } from "@/app/expenses/actions";

export default function Expense() {
  const [state, createExpenseFormAction, isPending] = useActionState(
    createExpense,
    ""
  );
  console.log(state, isPending);
  return (
    <Form action={createExpenseFormAction}>
      <div>{JSON.stringify(state)}</div>
      <div>{`isPending: ${isPending}`}</div>
      <DecimalInput
        name="amount"
        className="border border-gray-300 rounded px-2 py-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </Form>
  );
}
