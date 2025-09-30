import { NextRequest, NextResponse } from "next/server";

function decodeJWT(token: string) {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const payload = parts[1];
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
        // JWT จาก cookie
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

        // query param start → date
        const { searchParams } = new URL(req.url);
        const start = searchParams.get("start");
        if (!start) {
            return NextResponse.json(
                { error: "Missing required query parameter: start" },
                { status: 400 }
            );
        }

        const apiUrl = `http://103.230.121.18:8080/admin/getBookingDetaill?date=${encodeURIComponent(start)}`;
        console.log("Calling backend:", apiUrl);

        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.get("cookie") || "",
            },
        });

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (err) {
        console.error("Error in getUserData route:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
