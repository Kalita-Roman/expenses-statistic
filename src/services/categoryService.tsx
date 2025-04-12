"use server";
import { CategoryServiceResponse } from "@/types";
import * as repository from "@/services/repository";

export const getCategories = async (): Promise<CategoryServiceResponse> => {
  const categories = await repository.getCategories();
  return categories as CategoryServiceResponse;
} 