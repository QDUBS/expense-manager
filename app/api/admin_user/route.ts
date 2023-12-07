import { saveUser } from "../../db/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const userData = body;

    const user = await saveUser(userData);
    NextResponse.json({ status: 200, message: "User created..." });
  } catch (error) {
    NextResponse.json({ status: 400, message: error });
  }
}
