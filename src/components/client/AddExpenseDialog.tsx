import { Dialog } from "@/components/client";
import { ExpenseForm } from "@/components/client";

interface AddExpenseDialogProps {
  onClose: () => void;
}

export const AddExpenseDialog = ({ onClose }: AddExpenseDialogProps) => {
  return (
    <Dialog title={"Add expense"} onClose={onClose}>
      <ExpenseForm onDone={onClose} />
    </Dialog>
  );
};
