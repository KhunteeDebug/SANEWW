import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const jwt = req.cookies.get("session")?.value;

    if (!jwt) {
      return NextResponse.json(
        { error: "Unauthorized: no token" },
        { status: 401 }
      );
    }

    const body = await req.json(); // รับ JSON { PC_ID, enable }
    console.log("REQUEST BODY:", body);

    const res = await fetch("http://103.230.121.18:8080/update_promotion", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } else {
      const text = await res.text();
      return NextResponse.json(
        { error: "Invalid response from API", detail: text },
        { status: res.status }
      );
    }
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Update failed", detail: err.message },
      { status: 500 }
    );
  }
}
