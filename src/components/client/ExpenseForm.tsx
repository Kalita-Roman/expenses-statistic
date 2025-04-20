"use client";
import Form from "next/form";
import React, { useActionState, useEffect } from "react";
import { Button, ButtonType } from "@/components/presentation";
import { PriceInput, CategorySelect, DatePicker } from "@/components/client";
import { Expense } from "@/types/Expense.types";
import { dateToText } from "@/utils";

interface ExpenseFormProps {
  expense?: Expense;
  isEditing: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onDone: () => void;
  action: unknown;
}

export const ExpenseForm = ({ expense, isEditing = true, onDelete, onEdit, onDone, onCancel, action }: ExpenseFormProps) => {
  const [state, editExpenseFormAction, isPending] = useActionState(
    action as (state: { data: unknown; error: unknown; }, payload?: unknown) => { data: unknown; error: unknown; } | Promise<{ data: unknown; error: unknown; }>,
    { data: undefined, error: undefined }
  );

  useEffect(() => {
    if (!isPending && state.data) {
      onDone();
    }
  }, [isPending, state, onDone]);

  return (
    <Form action={editExpenseFormAction} onKeyDown={(e) => {
      if (e.key === "Enter" && Boolean((e.target as HTMLInputElement).name)) {
        e.preventDefault();
      }
    }}>
      {expense && <input type="hidden" name="id" value={expense.id} />}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <DatePicker name="date" defaultValue={expense ? dateToText(expense?.date) : undefined} isEdit={isEditing} disabled={isPending} />
          <CategorySelect categoryId={expense?.category || undefined} isEdit={isEditing} disabled={isPending} />
          <PriceInput amount={expense?.amount} currency={expense?.currency} isEdit={isEditing} disabled={isPending} />
        </div>
        {expense && !isEditing && (
          <div className="grid grid-cols-[1fr,2fr] gap-4">
            <Button
              buttonType={ButtonType.Outlined}
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              onClick={onEdit}>
              Edit
            </Button>
          </div>
        )}
        {expense && isEditing && (
          <div className="grid grid-cols-[1fr,2fr] gap-4">
            <Button
              type="submit"
              buttonType={ButtonType.Outlined}
            >
              Save
            </Button>
            <Button onClick={onCancel}>
              Cancel
            </Button>
          </div>
        )}
        {!expense && <Button type="submit" disabled={isPending}>
          Submit
        </Button>}
      </div>
    </Form>
  );
};
