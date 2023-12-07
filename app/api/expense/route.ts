import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const get_expense = await axios.get(
      `http://127.0.0.1:8000/expenses/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify(get_expense.data));
  } catch (error) {
    console.error("Error fetching expense...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const session: any = await getServerSession(authOptions);
  const user_id = session?.user?.user?.user?.id;

  const formData = await req.formData();
  const currentDate = new Date();

  const dataBody = formData.get("data") as any;
  const parsedBody = JSON.parse(dataBody);
  const id = parsedBody.id;

  try {
    const update_expense = await axios.put(
      `http://127.0.0.1:8000/expenses/${id}`,
      {
        user_id: user_id,
        merchant: parsedBody.merchant,
        date: currentDate.toString(),
        total: parsedBody.total,
        currency: parsedBody.currency,
        category: parsedBody.category,
        description: parsedBody.description,
        receipt: parsedBody.receipt,
        expense_stage: parsedBody.expense_stage,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify("Updated..."));
  } catch (error) {
    console.error("Error fetching expense...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
