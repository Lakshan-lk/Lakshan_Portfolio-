import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Safe fallback for Next.js build compilation phase
const safeUrl = supabaseUrl || "https://placeholder-project.supabase.co";
const safeAnonKey = supabaseAnonKey || "placeholder-anon-key";
const safeServiceKey = supabaseServiceRoleKey || safeAnonKey;

if (!supabaseUrl && typeof window === "undefined") {
    console.warn("NEXT_PUBLIC_SUPABASE_URL is missing. Using placeholder URL during build compilation.");
}
if (!supabaseAnonKey && typeof window === "undefined") {
    console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Using placeholder key during build compilation.");
}

// 1. Browser/Client-safe public client
export const supabase = createClient(safeUrl, safeAnonKey);

// 2. Server-side administrative client (bypasses RLS)
export const supabaseAdmin = createClient(safeUrl, safeServiceKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
});
