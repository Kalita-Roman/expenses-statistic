"use client";
import Form from "next/form";
import { useEffect, useActionState } from "react";
import DecimalInput from "@/components/client/DecimalInput";
import { createExpense } from "@/app/expenses/actions";
import { Button } from "@/components/presentation/Button";

export const ExpenseForm = ({ onDone = () => {}, isView } = {}) => {
  const [state, createExpenseFormAction, isPending] = useActionState(
    createExpense,
    ""
  );
  useEffect(() => {
    if (!isPending && state) {
      onDone();
    }
  }, [isPending, state]);

  return (
    <Form action={createExpenseFormAction} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <DecimalInput name="amount" disabled={isPending} />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </div>
    </Form>
  );
};
