import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const supabase: any = createClient(
  `${process.env.SUPABASE_URL}`,
  `${process.env.SUPABASE_API_KEY}`,
  {
    auth: { persistSession: false },
  }
);

export async function GET(req: NextRequest, res: NextResponse) {
  const session: any = await getServerSession(authOptions);
  const user_id = session?.user?.user?.user?.id;

  try {
    const get_expenses = await axios.get(
      `http://127.0.0.1:8000/expenses/user-expenses?user_id=5457eaa45a3b459aa4565a1b729a4194`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify(get_expenses.data));
  } catch (error) {
    console.error("Error fetching expenses...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session: any = await getServerSession(authOptions);
  const user_id = session?.user?.user?.user?.id;

  const formData = await req.formData();
  const currentDate = new Date();

  const dataBody = formData.get("data") as any;
  const parsedBody = JSON.parse(dataBody);

  const file: File | null = formData.get("receipt") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  let fileName = "";

  if (buffer && file) {
    try {
      const result = await uploadFileToSupabase(buffer, file);
      fileName = `${process.env.BUCKET_PATH}${result}`;
    } catch (error) {
      console.error("Error uploading file to Supabase:", error);
      return NextResponse.json(
        { error: "Error uploading file to Supabase" },
        { status: 500 }
      );
    }
  }

  const response = await axios.post(
    "http://127.0.0.1:8000/expenses/",
    {
      user_id: user_id,
      merchant: parsedBody.merchant,
      date: currentDate.toString(),
      total: parsedBody.total,
      currency: parsedBody.currency,
      category: parsedBody.category,
      description: parsedBody.description,
      receipt: fileName,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json({ data: response.data }, { status: 200 });
}

const uploadFileToSupabase = async (buffer: any, file: any) => {
  try {
    const { data, error } = await supabase.storage
      .from(`${process.env.STORAGE_BUCKET_NAME}`)
      .upload(`expenses-receipt/${file.name}`, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      throw new Error("Error uploading receipt to Supabase");
    }

    return data.path;
  } catch (error: any) {
    console.error("Error uploading receipt:", error.message);
  }
};
