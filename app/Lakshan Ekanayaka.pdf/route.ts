import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

// Tell Next.js not to cache this statically so it always checks Supabase for the newest file
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // 1. Try to fetch the CV from Supabase Storage
        const { data } = supabase.storage
            .from("portfolio-assets")
            .getPublicUrl("cv/cv.pdf");

        if (data && data.publicUrl) {
            // Test if the file exists and is accessible
            const fileResponse = await fetch(data.publicUrl, { method: "GET" });
            if (fileResponse.ok) {
                const arrayBuffer = await fileResponse.arrayBuffer();
                return new NextResponse(arrayBuffer, {
                    headers: {
                        "Content-Type": "application/pdf",
                        "Content-Disposition": "inline; filename=\"Lakshan Ekanayaka.pdf\"",
                        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    },
                });
            }
        }
    } catch (err) {
        console.warn("Could not proxy CV from Supabase storage, using local file fallback:", err);
    }

    // 2. Resilient fallback to the original static public PDF
    try {
        const localPath = path.join(process.cwd(), "public", "Lakshan Ekanayaka.pdf");
        if (fs.existsSync(localPath)) {
            const fileBuffer = fs.readFileSync(localPath);
            return new NextResponse(fileBuffer, {
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": "inline; filename=\"Lakshan Ekanayaka.pdf\"",
                    "Cache-Control": "public, max-age=3600",
                },
            });
        }
    } catch (fallbackErr) {
        console.error("Local CV fallback file read failed:", fallbackErr);
    }

    return new NextResponse("CV file not found.", { status: 404 });
}
