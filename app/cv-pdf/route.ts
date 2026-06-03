import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import fs from "fs";
import path from "path";

// Tell Next.js not to cache this statically so it always checks Supabase for the newest file
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const debug = searchParams.get("debug") === "true";

    // Secure diagnostic information (lengths and checks only, no secret leaks)
    const diagnostics: any = {
        timestamp: new Date().toISOString(),
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "not-set",
        supabaseAnonKeyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
        supabaseServiceRoleKeyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    // Enforce strict no-cache headers so the browser and intermediate proxies never cache the PDF
    const noCacheHeaders = {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"Lakshan Ekanayaka.pdf\"",
        "Cache-Control": "no-store, no-cache, must-revalidate, force-revalidate, max-age=0",
        "Pragma": "no-cache",
        "Expires": "0",
    };

    let storageError: any = null;

    try {
        // 1. Fetch directly from Supabase Storage using the administrative client
        // This avoids HTTP fetch overhead, DNS lookup issues, and public RLS policy restrictions.
        console.log("Proxying CV directly from Supabase Storage via /cv-pdf...");
        const { data, error } = await supabaseAdmin.storage
            .from("portfolio-assets")
            .download("cv/cv.pdf");

        if (error) {
            console.warn("Supabase storage CV download error:", error.message || error);
            storageError = error.message || error;
            throw error;
        }

        if (data) {
            const arrayBuffer = await data.arrayBuffer();
            console.log("Serving fresh CV PDF from Supabase storage, size:", arrayBuffer.byteLength);
            
            if (debug) {
                diagnostics.status = "SUCCESS_FROM_STORAGE";
                diagnostics.pdfSize = arrayBuffer.byteLength;
                return NextResponse.json(diagnostics);
            }

            return new NextResponse(arrayBuffer, {
                headers: noCacheHeaders,
            });
        }
    } catch (err: any) {
        console.warn("Could not retrieve CV from Supabase storage, using local file fallback:", err);
        storageError = err.message || err;
    }

    if (debug) {
        diagnostics.status = "FALLBACK_TRIGGERED";
        diagnostics.storageError = storageError;
        
        const localPath = path.join(process.cwd(), "public", "fallback-cv.pdf");
        diagnostics.localFileExists = fs.existsSync(localPath);
        if (diagnostics.localFileExists) {
            diagnostics.localFileSize = fs.statSync(localPath).size;
        }
        return NextResponse.json(diagnostics);
    }

    // 2. Resilient fallback to the original static public PDF
    try {
        const localPath = path.join(process.cwd(), "public", "fallback-cv.pdf");
        if (fs.existsSync(localPath)) {
            const fileBuffer = fs.readFileSync(localPath);
            console.log("Serving local fallback CV PDF, size:", fileBuffer.length);
            return new NextResponse(fileBuffer, {
                headers: noCacheHeaders, // Enforce no-cache here too so the browser doesn't get stuck on the fallback
            });
        }
    } catch (fallbackErr) {
        console.error("Local CV fallback file read failed:", fallbackErr);
    }

    return new NextResponse("CV file not found.", { status: 404 });
}

