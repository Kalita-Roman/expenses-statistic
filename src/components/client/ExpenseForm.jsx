"use client";
import Form from "next/form";
import { useEffect, useActionState } from "react";
import { DecimalInput, DatePicker } from "@/components/client";
import { createExpense } from "@/app/expenses/actions";
import { Button } from "@/components/presentation/Button";

export const ExpenseForm = ({ onDone = () => {} } = {}) => {
  const [state, createExpenseFormAction, isPending] = useActionState(
    createExpense,
    ""
  );
  useEffect(() => {
    if (!isPending && state) {
      onDone();
    }
  }, [isPending, state]);

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  return (
    <Form action={createExpenseFormAction} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <DecimalInput name="amount" disabled={isPending} />
        <DatePicker name="date" defaultValue={currentDate} />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </div>
    </Form>
  );
};
