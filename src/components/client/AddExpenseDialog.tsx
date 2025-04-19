import { Dialog } from "@/components/client";
import { ViewExpenseForm } from "@/components/client";
import { createExpense } from "@/app/expenses/actions";
import { Category } from "@/types";

interface AddExpenseDialogProps {
  onClose: () => void;
  categories: Category[];
}

export const AddExpenseDialog = ({ onClose }: AddExpenseDialogProps) => {
  return (
    <Dialog title={"Add expense"} onClose={onClose}>
      <ViewExpenseForm action={createExpense} isEditing={true} onDone={onClose} onDelete={() => { }} onEdit={() => { }} onCancel={() => { }} />
    </Dialog>
  );
};
