import { Dialog } from "@/components/client";
import { ExpenseForm } from "@/components/client";
import { Category } from "@/types";

interface AddExpenseDialogProps {
  onClose: () => void;
  categories: Category[];
}

export const AddExpenseDialog = ({ categories, onClose }: AddExpenseDialogProps) => {
  return (
    <Dialog title={"Add expense"} onClose={onClose}>
      <ExpenseForm categories={categories} onDone={onClose} />
    </Dialog>
  );
};
