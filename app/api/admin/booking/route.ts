import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const jwt = req.cookies.get("session")?.value;

        if (!jwt) {
            return NextResponse.json({ error: "Unauthorized: no token" }, { status: 401 });
        }

        const formData = await req.formData();

        // Debug: log ค่าที่ส่ง
        for (const [key, value] of formData.entries()) {
            console.log("FORM:", key, value);
        }

        const res = await fetch("http://103.230.121.18:8080/admin/booking", {
            method: "POST",
            body: formData,
            headers: {
                Cookie: req.headers.get("cookie") || "",
                // อย่าลืมถ้า backend ต้องการ content-type multipart/form-data 
                // fetch จะตั้งให้เองกับ FormData
            },
        });

        const contentType = res.headers.get("content-type") || "";
        console.log(res);

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
            { error: "Booking failed", detail: err.message },
            { status: 500 }
        );
    }
}

