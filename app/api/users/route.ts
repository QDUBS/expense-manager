import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const {
      email,
      password,
      firstName,
      lastName,
      mobileNumber,
      department,
      role,
      staffID,
      type,
    } = body;

    const userResponse = await axios.post(
      "http://127.0.0.1:8000/users/",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const profileResponse = await axios.post(
      "http://127.0.0.1:8000/profiles/",
      {
        user_id: userResponse.data.id,
        first_name: firstName,
        last_name: lastName,
        mobile_number: mobileNumber,
        department: department,
        role: role,
        staff_id: staffID,
        photo: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Data:", userResponse.data, "Status:", 200);
    console.log("Data:", profileResponse.data, "Status:", 200);
    return NextResponse.json({ data: userResponse.data }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const get_users = await axios.get(`http://127.0.0.1:8000/users/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return new NextResponse(JSON.stringify(get_users.data));
  } catch (error) {
    console.error("Error fetching expenses...", error);

    return new NextResponse(JSON.stringify({ status: 404 }));
  }
}
