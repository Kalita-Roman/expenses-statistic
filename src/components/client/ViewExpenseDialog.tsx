"use client";
import React, { useState } from "react";
import { Dialog, ConfirmationDialog, ViewExpenseForm } from "@/components/client";
import { Expense } from "@/types/Expense.types";
import { deleteExpense } from "@/services/expensesService";
import { useConfirmationAction } from "@/hooks";

interface ViewExpenseDialogProps {
  expense: Expense;
  onClose: () => void;
}

export const ViewExpenseDialog = ({ expense, onClose }: ViewExpenseDialogProps) => {
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
        <ViewExpenseForm
          expense={expense}
          isEditing={isEditing}
          onDone={onClose}
          onEdit={() => setIsEditing(true)}
          onCancel={() => setIsEditing(false)}
          onDelete={withConfirmation(handleDelete)}
        />
      </Dialog >
      {isWaiting && (
        <ConfirmationDialog onConfirm={handleConfirm} onReject={handleReject} />
      )}
    </>
  );
};
