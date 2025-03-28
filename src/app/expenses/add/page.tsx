import { redirect } from "next/navigation";
import { Dialog } from "@/components/client";
import { ExpenseForm } from "@/components/client";

export default async function Add() {
  const handleClose = async () => {
    "use server";
    redirect("/expenses");
  };

  return (
    <Dialog title={"Add expense"} onClose={handleClose}>
      <ExpenseForm onDone={handleClose} />
    </Dialog>
  );
}
