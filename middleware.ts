import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const jwt = req.cookies.get("session");
    const url = req.nextUrl.clone();

    // หน้า login ต้องไม่ถูก redirect กลับตัวเอง
    if (url.pathname === "/login") {
        return NextResponse.next();
    }

    const protectedPaths = ["/", "/home", "/confirm_pc", "/history", "/info", "/payment", "/point", "/randomID", "/redeempoint", "/select_time", "/upload_slip", "/admin/confirm_pc", "/admin/customer", "/admin/home", "/admin/pcmonitor", "/admin/pcwalkin", "admin/randomID"];
    const isProtected = protectedPaths.some((path) => url.pathname === path || url.pathname.startsWith(path + "/"));

    if (isProtected && !jwt) {
        url.pathname = "/login";
        url.searchParams.set("from", req.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/home", "/confirm_pc", "/history", "/info", "/payment", "/point", "/randomID", "/redeempoint", "/select_time", "/upload_slip","/admin/:path*"],
};
