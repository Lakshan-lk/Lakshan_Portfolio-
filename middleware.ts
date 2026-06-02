import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Route checks
    const isDashboardRoute = path.startsWith("/admin/dashboard");
    const isLoginRoute = path === "/admin";

    // Fast check for session cookie existence
    const sessionCookie = request.cookies.get("admin_session");
    const hasSession = !!sessionCookie;

    // 1. If trying to access dashboard without a session, redirect to login
    if (isDashboardRoute && !hasSession) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    // 2. If trying to access login page with an active session, redirect to dashboard
    if (isLoginRoute && hasSession) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
}

// Intercept all routes starting with /admin
export const config = {
    matcher: ["/admin/:path*"],
};
