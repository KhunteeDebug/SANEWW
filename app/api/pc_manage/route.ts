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
    try {
        const jwt = req.cookies.get("session")?.value;
        const res = await fetch("http://103.230.121.18:8080/pc/getAllPc", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.get("cookie") || "",
                
            }
        });
        

        if (!jwt) {
            return NextResponse.json({ error: "Unauthorized: no token" }, { status: 401 });
        }


        if (!res.ok) {
            return NextResponse.json({ success: false, error: "Upstream error" }, { status: res.status });
        }


        const data = await res.json();
        // console.log(data)

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
