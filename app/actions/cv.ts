"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "./auth";

export interface CVUploadResult {
    success: boolean;
    error?: string;
    message?: string;
}

/**
 * Server action to upload and overwrite Lakshan Ekanayaka.pdf in the cv bucket.
 */
export async function uploadCVAction(formData: FormData): Promise<CVUploadResult> {
    // 1. Authorize session
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
        return { success: false, error: "Unauthorized access." };
    }

    const file = formData.get("cvFile") as File;

    if (!file) {
        return { success: false, error: "No file was provided." };
    }

    // MIME type validation
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
        return { success: false, error: "Invalid file type. Only PDF files (.pdf) are allowed." };
    }

    try {
        const fileBuffer = Buffer.from(await file.arrayBuffer());

        // Upload and overwrite the existing 'cv/cv.pdf' in the 'portfolio-assets' bucket
        const { error } = await supabaseAdmin.storage
            .from("portfolio-assets")
            .upload("cv/cv.pdf", fileBuffer, {
                contentType: "application/pdf",
                upsert: true, // Key: Overwrite if file already exists!
            });

        if (error) {
            console.error("Supabase storage upload error:", error);
            throw new Error(error.message);
        }

        // Revalidate the route to flush cached versions
        revalidatePath("/Lakshan Ekanayaka.pdf");

        return {
            success: true,
            message: "Your resume CV PDF was successfully uploaded and updated live!",
        };
    } catch (err: any) {
        console.error("Error uploading CV to Supabase:", err);
        return {
            success: false,
            error: "Failed to upload file to storage: " + (err.message || err),
        };
    }
}
