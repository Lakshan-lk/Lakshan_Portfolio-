"use server";

import { cookies } from "next/headers";
import { signJWT, verifyJWT } from "@/lib/jwt";

export interface AuthState {
    success: boolean;
    error?: string;
    redirectTo?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback_default_jwt_secret_please_change_in_env";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

/**
 * Server action to log in the admin.
 * Verifies credentials, generates a JWT, and stores it in an HTTP-only cookie.
 */
export async function loginAdmin(prevState: AuthState | null, formData: FormData): Promise<AuthState> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
        return { success: false, error: "Please enter both username and password." };
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return { success: false, error: "Invalid username or password." };
    }

    try {
        // Sign the JWT token
        const token = signJWT({ username }, JWT_SECRET, 86400); // 1 day expiry

        // Save token in secure HTTP-only cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400, // 1 day in seconds
            path: "/",
        });

        return {
            success: true,
            redirectTo: "/admin/dashboard",
        };
    } catch (err) {
        console.error("Login session creation error:", err);
        return { success: false, error: "An unexpected error occurred during login." };
    }
}

/**
 * Server action to log out the admin.
 * Clears the HTTP-only cookie.
 */
export async function logoutAdmin(): Promise<void> {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("admin_session");
    } catch (err) {
        console.error("Logout error:", err);
    }
}

/**
 * Helper function to verify admin session on the server side.
 * Can be called inside server components, middleware, or other server actions.
 */
export async function verifyAdminSession(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("admin_session");
        
        if (!sessionCookie || !sessionCookie.value) {
            return false;
        }

        const decoded = verifyJWT(sessionCookie.value, JWT_SECRET);
        return decoded !== null && decoded.username === ADMIN_USERNAME;
    } catch (err) {
        console.error("Session verification error:", err);
        return false;
    }
}
