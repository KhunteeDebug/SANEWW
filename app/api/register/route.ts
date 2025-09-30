import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ส่งไป backend จริง
    const res = await fetch("http://103.230.121.18:8080/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include" // backend จะส่ง JWT cookie กลับ
    });

    const data = await res.json();

    if (res.status === 201 && data.success) {
      // ถ้า backend ส่ง JWT cookie อยู่แล้ว, browser จะเก็บอัตโนมัติ
      return NextResponse.json({ message: "Register success" });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
