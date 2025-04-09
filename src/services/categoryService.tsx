"use server";
// import { getUserId } from "@/services/authService";
import { /*Category,*/ CategoryServiceResponse } from "@/types";

export const getCategories = async (): Promise<CategoryServiceResponse> => {
  // const user = await getUserId();
  return [{ id: "6aeaa0ac-7c92-4acf-822e-1d31c690503d "}, { id: "427f74c5-d27d-4572-a0ad-07e4500ab7ea"}] as CategoryServiceResponse;
}