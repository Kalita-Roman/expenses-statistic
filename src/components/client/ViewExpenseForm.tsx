"use client";
import Form from "next/form";
import React, { useActionState, useEffect } from "react";
import { useCategory } from "@/components/client/Category/CategoryProvider";
import { Button, ButtonType } from "@/components/presentation";
import { PriceInput, Select, DatePicker } from "@/components/client";
import { Expense } from "@/types/Expense.types";
import { editExpense } from "@/app/expenses/actions";
import { dateToText } from "@/utils";

interface ViewExpenseFormProps {
  expense: Expense;
  isEditing: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onDone: () => void;
}

export const ViewExpenseForm = ({ expense, isEditing, onDelete, onEdit, onDone, onCancel }: ViewExpenseFormProps) => {
  const { getCategoryById, categories } = useCategory();

  const [state, editExpenseFormAction, isPending] = useActionState(
    editExpense,
    { data: undefined, error: undefined }
  );

  useEffect(() => {
    if (!isPending && state.data) {
      onDone();
    }
  }, [isPending, state]);

  return (
    <Form action={editExpenseFormAction} onKeyDown={(e) => {
      if (e.key === "Enter" && Boolean((e.target as HTMLInputElement).name)) {
        e.preventDefault();
      }
    }}>
      <input type="hidden" name="id" value={expense.id} />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <DatePicker name="date" defaultValue={dateToText(expense?.date)} readOnly={!isEditing} />
          <Select name="category" options={categories} defaultValue={getCategoryById(expense?.category || undefined)} disabled={!isEditing} pickName={x => x!.name} pickValue={x => x!.id} />
          <PriceInput amount={expense?.amount} currency={expense?.currency} isEdit={isEditing} />
        </div>
        {!isEditing && (
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
        {isEditing && (
          <div className="grid grid-cols-[1fr,2fr] gap-4">
            <Button
              formAction={editExpenseFormAction}
              buttonType={ButtonType.Outlined}
            >
              Save
            </Button>
            <Button onClick={onCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </Form>
  );
};
