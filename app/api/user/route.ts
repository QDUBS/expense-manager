import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const supabase: any = createClient(
  `${process.env.SUPABASE_URL}`,
  `${process.env.SUPABASE_API_KEY}`,
  {
    auth: { persistSession: false },
  }
);

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const get_user = await axios.get(
      `http://127.0.0.1:8000/users/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new NextResponse(JSON.stringify(get_user.data));
  } catch (error) {
    console.error("Error fetching user...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const session: any = await getServerSession(authOptions);
    const user_id = session?.user?.user?.user?.id;

    const formData = await req.formData();
    const dataBody = formData.get("data") as any;
    const parsedBody = JSON.parse(dataBody);

    const file: File | null = formData.get("photo") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let fileName = parsedBody.photo;

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

    const profileResponse = await axios.put(
      `http://127.0.0.1:8000/profiles/${parsedBody.id}`,
      {
        user_id: user_id,
        first_name: parsedBody.firstName,
        last_name: parsedBody.lastName,
        mobile_number: parsedBody.mobileNumber,
        department: parsedBody.department,
        role: parsedBody.role,
        staff_id: parsedBody.staffID,
        photo: fileName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ data: profileResponse.data }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
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
