"use client";
import { useState } from "react";
import { AddExpenseDialog } from "@/components/client";
import { Button } from "@/components/presentation";

export const AddExpenseButton = () => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <Button className="w-full" onClick={() => setIsAdding(true)}>
        Add
      </Button>
      {isAdding && <AddExpenseDialog onClose={() => setIsAdding(false)} />}
    </>
  );
};
