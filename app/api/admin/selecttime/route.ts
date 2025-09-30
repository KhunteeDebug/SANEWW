import { NextRequest, NextResponse } from "next/server";
function decodeJWT(token: string) {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const payload = parts[1];
        // แก้ base64url เป็น base64
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decodedStr = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(decodedStr);
    } catch (err) {
        console.error("JWT decode error:", err);
        return null;
    }
}

export async function GET(req: NextRequest) {
    try {
        // ดึง JWT จาก cookie
        const jwt = req.cookies.get("session")?.value;
        if (!jwt) {
            return NextResponse.json({ error: "Unauthorized: no token" }, { status: 401 });
        }

        const decoded = decodeJWT(jwt);
        const username = decoded?.username;
        if (!username) {
            return NextResponse.json(
                { error: "Bad request: username missing in token" },
                { status: 400 }
            );
        }

        // ดึง query param start / end
        const { searchParams } = new URL(req.url);
        const start = searchParams.get("start");
        const end = searchParams.get("end");

        if (!start || !end) {
            return NextResponse.json(
                { error: "Missing required query parameters: start or end" },
                { status: 400 }
            );
        }
        const encodeStrict = (val: string) => encodeURIComponent(val).replace(/%3A/g, "%3A");
        // เรียก backend API
        const apiUrl = `http://103.230.121.18:8080/pc/available?start=${encodeStrict(start)
            }&end=${encodeStrict(end)}`;

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.get("cookie") || "",
            },
        });
        console.log(apiUrl);

        const data = await response.json();
        // console.log("Backend response:", data);

        return NextResponse.json(data, { status: response.status });
    } catch (err) {
        console.error("Error in getUserData route:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}