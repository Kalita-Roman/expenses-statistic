import { NextResponse } from "next/server";
import { ExpenseServiceResponse } from "@/types";
import { getExpenses } from "@/services/expensesService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "0");
  const expensesData = await getExpenses({ page });
  return NextResponse.json<ExpenseServiceResponse>(expensesData, {
    status: 200,
  });
}

export async function POST() {
  console.log(">>> POST");
  return NextResponse.json({ ok: "ok" }, { status: 200 });
}
