"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "./auth";

export interface CertResult {
    success: boolean;
    error?: string;
    message?: string;
}

/**
 * Helper to upload certificate logo to Supabase portfolio-assets bucket and return public URL.
 */
async function uploadCertLogo(file: File): Promise<string> {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileExtension = file.name.split(".").pop();
    const fileName = `certifications/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;

    const { error } = await supabaseAdmin.storage
        .from("portfolio-assets")
        .upload(fileName, fileBuffer, {
            contentType: file.type,
            upsert: true,
        });

    if (error) {
        console.error("Storage logo upload failed:", error);
        throw new Error("Failed to upload certificate logo: " + error.message);
    }

    const { data: publicUrlData } = supabaseAdmin.storage
        .from("portfolio-assets")
        .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
}

/**
 * Server action to create a new certification.
 */
export async function createCertificationAction(formData: FormData): Promise<CertResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    const title = formData.get("title") as string;
    const org = formData.get("org") as string;
    const date = formData.get("date") as string;
    const credentialID = formData.get("credentialID") as string;
    const link = formData.get("link") as string;
    const logoFile = formData.get("logoFile") as File;
    const color = formData.get("color") as string || "bg-white";

    if (!title || !org || !date) {
        return { success: false, error: "Title, Organization, and Date are required." };
    }

    try {
        let logoUrl = "";

        // Handle certificate logo upload
        if (logoFile && logoFile.size > 0) {
            logoUrl = await uploadCertLogo(logoFile);
        } else {
            return { success: false, error: "Certificate logo image is required." };
        }

        // Determine border hover color dynamically or defaults
        const borderColor = color === "bg-white" ? "group-hover:border-white/50" : "group-hover:border-gray-500/50";

        const { error } = await supabaseAdmin.from("certifications").insert([
            {
                title: title.trim(),
                org: org.trim(),
                date: date.trim(),
                logo: logoUrl,
                credential_id: credentialID ? credentialID.trim() : null,
                link: link ? link.trim() : null,
                color,
                border_color: borderColor,
            },
        ]);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard");

        return { success: true, message: "Certification added successfully!" };
    } catch (err: any) {
        console.error("Error creating certification:", err);
        return { success: false, error: err.message || "Failed to create certification." };
    }
}

/**
 * Server action to update an existing certification.
 */
export async function updateCertificationAction(id: string, formData: FormData): Promise<CertResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    const title = formData.get("title") as string;
    const org = formData.get("org") as string;
    const date = formData.get("date") as string;
    const credentialID = formData.get("credentialID") as string;
    const link = formData.get("link") as string;
    const logoFile = formData.get("logoFile") as File;
    const color = formData.get("color") as string || "bg-white";
    let existingLogoUrl = formData.get("existingLogoUrl") as string;

    if (!id || !title || !org || !date) {
        return { success: false, error: "Required fields are missing." };
    }

    try {
        let logoUrl = existingLogoUrl;

        // If a new logo file is provided, upload it and overwrite
        if (logoFile && logoFile.size > 0) {
            logoUrl = await uploadCertLogo(logoFile);
        }

        const borderColor = color === "bg-white" ? "group-hover:border-white/50" : "group-hover:border-gray-500/50";

        const { error } = await supabaseAdmin
            .from("certifications")
            .update({
                title: title.trim(),
                org: org.trim(),
                date: date.trim(),
                logo: logoUrl,
                credential_id: credentialID ? credentialID.trim() : null,
                link: link ? link.trim() : null,
                color,
                border_color: borderColor,
            })
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard");

        return { success: true, message: "Certification updated successfully!" };
    } catch (err: any) {
        console.error("Error updating certification:", err);
        return { success: false, error: err.message || "Failed to update certification." };
    }
}

/**
 * Server action to delete a certification.
 */
export async function deleteCertificationAction(id: string): Promise<CertResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    if (!id) return { success: false, error: "Certification ID is required." };

    try {
        const { error } = await supabaseAdmin
            .from("certifications")
            .delete()
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard");

        return { success: true, message: "Certification deleted successfully!" };
    } catch (err: any) {
        console.error("Error deleting certification:", err);
        return { success: false, error: err.message || "Failed to delete certification." };
    }
}
