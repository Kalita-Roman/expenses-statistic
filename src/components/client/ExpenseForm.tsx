"use client";
import Form from "next/form";
import { useEffect, useActionState } from "react";
import { DecimalInput, DatePicker } from "@/components/client";
import { Select } from "@/components/client/Select";
import { createExpense } from "@/app/expenses/actions";
import { Button } from "@/components/presentation/Button";
import { Category } from "@/types";

interface ExpenseFormProps {
  onDone?: () => void;
  categories?: Category[];
}

export const ExpenseForm = ({ onDone = () => { }, categories = [] }: ExpenseFormProps = {}) => {
  const [state, createExpenseFormAction, isPending] = useActionState(
    createExpense,
    { data: undefined, error: undefined }
  );
  useEffect(() => {
    if (!isPending && state.data) {
      onDone();
    }
  }, [isPending, state]);

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  return (
    <Form action={createExpenseFormAction} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        {JSON.stringify(categories)}
        <DecimalInput name="amount" disabled={isPending} />
        <DatePicker name="date" defaultValue={currentDate} />
        <Select
          name="category"
          options={categories}
          value={categories[0]}
          onChange={(selectedCategory) => console.log(selectedCategory)}
          pickName={(category) => category?.name}
          pickValue={(category) => category?.id}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </div>
    </Form>
  );
};
