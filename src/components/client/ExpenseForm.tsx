"use client";
import Form from "next/form";
import { useEffect, useActionState } from "react";
import { DatePicker, PriceInput, Select } from "@/components/client";
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

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Form action={createExpenseFormAction} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4">
        <Select
          name="category"
          options={categories}
          value={categories[0]}
          onChange={(selectedCategory) => console.log(selectedCategory)}
          pickName={(category) => category?.name}
          pickValue={(category) => category?.id}
        />
        <PriceInput disabled={isPending} currency="PLN" isEdit />
        <DatePicker name="date" defaultValue={currentDate} />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </div>
    </Form>
  );
};
