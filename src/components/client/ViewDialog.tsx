"use client";
import Form from "next/form";
import React, { useState, useActionState, useEffect } from "react";
import { Dialog, ConfirmationDialog } from "@/components/client";
import { useCategory } from "@/components/client/Category/CategoryProvider";
import { Button, ButtonType } from "@/components/presentation";
import { PriceInput, Select, DatePicker } from "@/components/client";
import { Expense } from "@/types/Expense.types";
import { deleteExpense } from "@/services/expensesService";
import { editExpense } from "@/app/expenses/actions";
import { useConfirmationAction } from "@/hooks";
import { dateToText } from "@/utils";

interface ViewExpenseDialogProps {
  expense: Expense;
  onClose: () => void;
}

export const ViewDialog = ({ expense, onClose }: ViewExpenseDialogProps) => {
  const { getCategoryById, categories } = useCategory();
  const [isEditing, setIsEditing] = useState(false);
  const { isWaiting, handleConfirm, handleReject, withConfirmation } =
    useConfirmationAction();

  const handleDelete = async () => {
    await deleteExpense({ id: expense.id });
    onClose();
  };

  const [state, editExpenseFormAction, isPending] = useActionState(
    editExpense,
    { data: undefined, error: undefined }
  );

  useEffect(() => {
    if (!isPending && state.data) {
      onClose();
    }
  }, [isPending, state]);

  return (
    <>
      <Dialog title="Expense" onClose={onClose}>
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
                  onClick={withConfirmation(handleDelete)}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}>
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
                <Button onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Form>
      </Dialog >
      {isWaiting && (
        <ConfirmationDialog onConfirm={handleConfirm} onReject={handleReject} />
      )
      }
    </>
  );
};
