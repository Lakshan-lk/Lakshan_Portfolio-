"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "./auth";

export interface JourneyResult {
    success: boolean;
    error?: string;
    message?: string;
}

/**
 * Server action to create a new journey timeline milestone.
 */
export async function createJourneyAction(formData: FormData): Promise<JourneyResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    const year = formData.get("year") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string; // 'experience' or 'education'
    const iconName = formData.get("iconName") as string || "Briefcase";
    const orderStr = formData.get("order") as string || "0";
    const tagsCsv = formData.get("tags") as string || ""; // Comma separated tags

    if (!year || !title || !subtitle || !description || !type) {
        return { success: false, error: "Required fields are missing." };
    }

    if (type !== "experience" && type !== "education") {
        return { success: false, error: "Type must be either experience or education." };
    }

    try {
        const order = parseInt(orderStr, 10) || 0;
        const tags = tagsCsv
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "");

        const { error } = await supabaseAdmin.from("journey").insert([
            {
                year: year.trim(),
                title: title.trim(),
                subtitle: subtitle.trim(),
                description: description.trim(),
                type,
                icon_name: iconName,
                order,
                tags,
            },
        ]);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard/journey");

        return { success: true, message: "Milestone added to timeline successfully!" };
    } catch (err: any) {
        console.error("Error creating journey milestone:", err);
        return { success: false, error: err.message || "Failed to create milestone." };
    }
}

/**
 * Server action to update an existing journey timeline milestone.
 */
export async function updateJourneyAction(id: string, formData: FormData): Promise<JourneyResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    const year = formData.get("year") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const iconName = formData.get("iconName") as string || "Briefcase";
    const orderStr = formData.get("order") as string || "0";
    const tagsCsv = formData.get("tags") as string || "";

    if (!id || !year || !title || !subtitle || !description || !type) {
        return { success: false, error: "Required fields are missing." };
    }

    try {
        const order = parseInt(orderStr, 10) || 0;
        const tags = tagsCsv
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "");

        const { error } = await supabaseAdmin
            .from("journey")
            .update({
                year: year.trim(),
                title: title.trim(),
                subtitle: subtitle.trim(),
                description: description.trim(),
                type,
                icon_name: iconName,
                order,
                tags,
            })
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard/journey");

        return { success: true, message: "Milestone updated successfully!" };
    } catch (err: any) {
        console.error("Error updating journey milestone:", err);
        return { success: false, error: err.message || "Failed to update milestone." };
    }
}

/**
 * Server action to delete a timeline milestone.
 */
export async function deleteJourneyAction(id: string): Promise<JourneyResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    if (!id) return { success: false, error: "ID is required." };

    try {
        const { error } = await supabaseAdmin
            .from("journey")
            .delete()
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard/journey");

        return { success: true, message: "Milestone deleted from timeline successfully!" };
    } catch (err: any) {
        console.error("Error deleting journey milestone:", err);
        return { success: false, error: err.message || "Failed to delete milestone." };
    }
}
