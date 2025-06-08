import { Dialog } from "@/components/client";
import { ExpenseForm } from "@/components/client";
import { createExpense } from "@/app/expenses/actions";

interface AddExpenseDialogProps {
  onClose: () => void;
}

export const AddExpenseDialog = ({ onClose }: AddExpenseDialogProps) => {
  return (
    <Dialog title={"Add expense"} onClose={onClose}>
      <ExpenseForm
        action={createExpense}
        isEditing={true}
        onDone={onClose}
        onDelete={() => {}}
        onEdit={() => {}}
        onCancel={() => {}}
      />
    </Dialog>
  );
};
