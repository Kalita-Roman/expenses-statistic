import { redirect } from "next/navigation";
import { Dialog } from "@/components/client";
import { Price, Button } from "@/components/presentation";
import { getExpense } from "@/services/expensesService";

interface ViewExpenseProps {
  params: Promise<{
    expenseId: string;
  }>;
}

export default async function ViewExpense({ params }: ViewExpenseProps) {
  const handleClose = async () => {
    "use server";
    redirect("/expenses");
  };

  const { expenseId } = await params;

  const expense = await getExpense({ id: expenseId });

  return (
    <Dialog title={"Expense: " + expenseId} onClose={handleClose}>
      {JSON.stringify(expense)}
      <Price amount={expense?.amount} currency={expense?.currency} />
      <Button onClick={handleClose}>Edit</Button>
    </Dialog>
  );
}
