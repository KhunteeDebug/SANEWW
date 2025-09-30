// /app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Logged out" });

    response.cookies.set({
        name: "session",
        value: "",
        path: "/",
        expires: new Date(0), // expire ทันที
    });

    return response;
}
