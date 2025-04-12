"use client";

import React, { createContext, useContext, useMemo } from "react";
import { Category } from "@/types/Expense.types";

interface CategoryProviderProps {
  categories?: Category[];
  children: React.ReactNode;
}

type CategoryContextType = {
  categories: Category[];
  getCategoryById: (id?: string) => Category | null;
};

const CategoryContext = createContext<CategoryContextType>({ categories: [], getCategoryById: () => null });

const CategoryProvider: React.FC<CategoryProviderProps> = ({ categories = [], children }) => {

  const value = useMemo(() => ({
    categories,
    getCategoryById: (id?: string) => {
      return categories.find((category) => category.id === id) || null;
    }
  }), [categories]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);

export default CategoryProvider;