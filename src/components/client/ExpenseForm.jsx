"use client";
import Form from "next/form";
import { useEffect, useActionState } from "react";
import DecimalInput from "@/components/client/DecimalInput";
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

  return (
    <Form action={createExpenseFormAction}>
      <div>{JSON.stringify(state)}</div>
      <div>{`isPending: ${isPending}`}</div>
      <DecimalInput name="amount" />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
