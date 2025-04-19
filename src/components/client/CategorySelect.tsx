"use client";
import React from "react";
import { useCategory } from "@/components/client/Category/CategoryProvider";
import { Select } from "@/components/client";
import { CategoryId } from "@/types/Expense.types";

interface CategorySelectProps {
  categoryId?: CategoryId | null;
  disabled?: boolean;
}

export const CategorySelect = ({ categoryId, disabled }: CategorySelectProps) => {
  const { getCategoryById, categories } = useCategory();

  return (
    <Select name="category" options={categories} defaultValue={getCategoryById(categoryId || undefined)} disabled={disabled} pickName={x => x!.name} pickValue={x => x!.id} />
  );
};
