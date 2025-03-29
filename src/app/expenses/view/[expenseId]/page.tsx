import { redirect } from "next/navigation";
import { Dialog } from "@/components/client";
import { Price, Date, Button, ButtonType } from "@/components/presentation";
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
    <Dialog title={"Expense"} onClose={handleClose}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <Price amount={expense?.amount} currency={expense?.currency} />
          <Date date={expense?.date} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button
            buttonType={ButtonType.Outlined}
            className="col-span-1"
            onClick={handleClose}
          >
            Delete
          </Button>
          <Button className="col-span-2" onClick={handleClose}>
            Edit
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
