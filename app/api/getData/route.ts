// app/api/getUserData/route.ts (หรือชื่อ route ที่ใช้)
import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string) {
    try {
        const parts = token.split(".");
        const payload = parts[1];
        const decoded = atob(payload);
        return JSON.parse(decoded);
    } catch (err) {
        console.error("JWT decode error:", err);
        return null;
    }
}

export async function GET(req: NextRequest) {
    const jwt = req.cookies.get("session")?.value;
    // console.log("GET /api/getUserData — jwt cookie:", jwt);

    if (!jwt) {
        return NextResponse.json({ error: "Unauthorized: no token" }, { status: 401 });
    }

    const decoded = decodeJWT(jwt);
    // console.log("Decoded JWT payload:", decoded);

    const username = decoded?.username;
    // console.log("Username from JWT:", username);

    if (!username) {
        return NextResponse.json({ error: "Bad request: username missing in token" }, { status: 400 });
    }

    // เรียก backend
    const apiUrl = new URL("http://103.230.121.18:8080/user/getData");
    apiUrl.searchParams.set("username", username);

    // console.log("Calling backend getData with URL:", apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
        headers: {
            "Content-Type": "application/json",
            Cookie: req.headers.get("cookie") || "",
        },
    });

    // console.log("Backend response status:", response.status);
    const data = await response.json();
    // console.log("Backend response data:", data);

    return NextResponse.json(data, { status: response.status });
}
