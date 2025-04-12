"use client";
import React, { useState } from "react";
import { Dialog, ConfirmationDialog } from "@/components/client";
import { useCategory } from "@/components/client/Category/CategoryProvider";
import { Date, Button, ButtonType, Currency } from "@/components/presentation";
import { DecimalInput, PriceInput } from "@/components/client";
import { Expense } from "@/types/Expense.types";
import { deleteExpense } from "@/services/expensesService";
import { useConfirmationAction } from "@/hooks";

interface ViewExpenseDialogProps {
  expense: Expense;
  onClose: () => void;
}

export const ViewDialog = ({ expense, onClose }: ViewExpenseDialogProps) => {
  const { getCategoryById } = useCategory();
  const [isEditing, setIsEditing] = useState(false);
  const { isWaiting, handleConfirm, handleReject, withConfirmation } =
    useConfirmationAction();

  const handleDelete = async () => {
    await deleteExpense({ id: expense.id });
    onClose();
  };

  return (
    <>
      <Dialog title="Expense" onClose={onClose}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Date date={expense?.date} />
            {getCategoryById(expense?.category || undefined)?.name}
            <PriceInput amount={expense?.amount} currency={expense?.currency} isEdit={isEditing} />
          </div>
          {!isEditing && (
            <div className="grid grid-cols-3 gap-4">
              <Button
                buttonType={ButtonType.Outlined}
                className="col-span-1"
                onClick={withConfirmation(handleDelete)}
              >
                Delete
              </Button>
              <Button className="col-span-2" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </div>
          )}
          {isEditing && (
            <div className="grid grid-cols-3 gap-4">
              <Button
                buttonType={ButtonType.Outlined}
                className="col-span-1"
                onClick={withConfirmation(handleDelete)}
              >
                Save
              </Button>
              <Button className="col-span-2" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Dialog>
      {isWaiting && (
        <ConfirmationDialog onConfirm={handleConfirm} onReject={handleReject} />
      )}
    </>
  );
};
