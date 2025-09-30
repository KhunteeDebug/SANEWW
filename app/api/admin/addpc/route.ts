// app/api/pc/add/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;
        const body = await req.json();

        const res = await fetch("http://103.230.121.18:8080/pc/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.get("cookie") || "",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message || "Server error" },
            { status: 500 }
        );
    }
}
