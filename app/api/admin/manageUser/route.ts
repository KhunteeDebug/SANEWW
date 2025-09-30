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

type UserPayload = {
    username: string;
    email: string;
};


export async function POST(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;
        // console.log("GET /api/getUserData — jwt cookie:", jwt);

        if (!jwt) {
            return NextResponse.json({ error: "Unauthorized: no token" }, { status: 401 });
        }
        const body: UserPayload = await req.json();

        // ✅ ตรวจสอบ input เบื้องต้น
        if (!body.username || !body.email) {
            return NextResponse.json(
                { error: "กรุณากรอก Username หรือ Email ให้ถูกต้อง" },
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // 🚀 สมมติว่าเราบันทึก user ลง database (ตรงนี้คุณเอาไปต่อ DB จริงได้)
        const newUser = {
            id: Date.now().toString(),
            ...body,
            createdAt: new Date().toISOString(),
        };

        return NextResponse.json(newUser, {
            status: 201,
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.get("cookie") || "",
            },
        });
    } catch (err) {
        return NextResponse.json(
            { error: "Invalid JSON" },
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
}
