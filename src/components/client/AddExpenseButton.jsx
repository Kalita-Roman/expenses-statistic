"use client";
import { useState } from "react";
import { AddExpenseDialog } from "@/components/client";
import { Button } from "@/components/presentation";

export const AddExpenseButton = ({categories}) => {
  const [isAdding, setIsAdding] = useState(false);

  console.log(">>> AddExpenseButton categories", isAdding);

  return (
    <>
      <Button className="w-full" onClick={() => setIsAdding(true)}>
        Add
      </Button>
      {isAdding && <AddExpenseDialog categories={categories} onClose={() => setIsAdding(false)} />}
    </>
  );
};
