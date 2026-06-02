"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "./auth";

export interface FormState {
    success: boolean;
    message?: string;
    error?: string;
}

export async function submitContactForm(prevState: FormState | null, formData: FormData): Promise<FormState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Simple validation
    if (!name || !name.trim()) {
        return { success: false, error: "Name is required." };
    }
    if (!email || !email.trim() || !email.includes("@")) {
        return { success: false, error: "A valid email address is required." };
    }
    if (!subject || !subject.trim()) {
        return { success: false, error: "Subject is required." };
    }
    if (!message || !message.trim()) {
        return { success: false, error: "Message content is required." };
    }

    try {
        // Insert message using supabaseAdmin (bypasses RLS secure insertion check since public insert is allowed,
        // but keeps client code clean and direct)
        const { error } = await supabaseAdmin.from("messages").insert([
            {
                name: name.trim(),
                email: email.trim(),
                subject: subject.trim(),
                message: message.trim(),
                is_read: false,
            },
        ]);

        if (error) {
            console.error("Supabase insert error:", error);
            throw new Error(error.message);
        }

        return {
            success: true,
            message: "Your message has been sent successfully! I will get back to you shortly.",
        };
    } catch (err: any) {
        console.error("Error submitting contact form to Supabase:", err);
        return {
            success: false,
            error: "Something went wrong while sending your message. Please try again or email me directly.",
        };
    }
}

/**
 * Server action to toggle the read status of a message.
 */
export async function toggleMessageReadAction(id: string, isRead: boolean): Promise<{ success: boolean; error?: string }> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    try {
        const { error } = await supabaseAdmin
            .from("messages")
            .update({ is_read: isRead })
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (err: any) {
        console.error("Error toggling message read status:", err);
        return { success: false, error: err.message || "Failed to update read status." };
    }
}

/**
 * Server action to delete a message from inbox.
 */
export async function deleteMessageAction(id: string): Promise<{ success: boolean; error?: string }> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    try {
        const { error } = await supabaseAdmin
            .from("messages")
            .delete()
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (err: any) {
        console.error("Error deleting message:", err);
        return { success: false, error: err.message || "Failed to delete message." };
    }
}
