"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { verifyAdminSession } from "./auth";

export interface ProjectResult {
    success: boolean;
    error?: string;
    message?: string;
}

/**
 * Helper to upload image file to Supabase portfolio-assets bucket and return public URL.
 */
async function uploadProjectImage(file: File): Promise<string> {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    // Safe filename
    const fileExtension = file.name.split(".").pop();
    const fileName = `projects/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;

    const { error } = await supabaseAdmin.storage
        .from("portfolio-assets")
        .upload(fileName, fileBuffer, {
            contentType: file.type,
            upsert: true,
        });

    if (error) {
        console.error("Storage upload failed:", error);
        throw new Error("Failed to upload screenshot to storage: " + error.message);
    }

    const { data: publicUrlData } = supabaseAdmin.storage
        .from("portfolio-assets")
        .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
}

/**
 * Server action to create a new project.
 */
export async function createProjectAction(formData: FormData): Promise<ProjectResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const github = formData.get("github") as string;
    const demo = formData.get("demo") as string;
    const techStackJson = formData.get("tech_stack") as string;
    const imageFile = formData.get("imageFile") as File;

    if (!title || !category || !description) {
        return { success: false, error: "Title, Category, and Description are required." };
    }

    try {
        let imageUrl = "";

        // Handle screenshot upload
        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadProjectImage(imageFile);
        } else {
            return { success: false, error: "Project screenshot image is required." };
        }

        const techStack = techStackJson ? JSON.parse(techStackJson) : [];

        const { error } = await supabaseAdmin.from("projects").insert([
            {
                title: title.trim(),
                category: category.trim(),
                description: description.trim(),
                image: imageUrl,
                github: github ? github.trim() : null,
                demo: demo ? demo.trim() : null,
                tech_stack: techStack,
            },
        ]);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard/projects");

        return { success: true, message: "Project created successfully!" };
    } catch (err: any) {
        console.error("Error creating project:", err);
        return { success: false, error: err.message || "Failed to create project." };
    }
}

/**
 * Server action to update an existing project.
 */
export async function updateProjectAction(id: string, formData: FormData): Promise<ProjectResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const github = formData.get("github") as string;
    const demo = formData.get("demo") as string;
    const techStackJson = formData.get("tech_stack") as string;
    const imageFile = formData.get("imageFile") as File;
    let existingImageUrl = formData.get("existingImageUrl") as string;

    if (!id || !title || !category || !description) {
        return { success: false, error: "Required fields are missing." };
    }

    try {
        let imageUrl = existingImageUrl;

        // If a new image file is provided, upload it and overwrite
        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadProjectImage(imageFile);
        }

        const techStack = techStackJson ? JSON.parse(techStackJson) : [];

        const { error } = await supabaseAdmin
            .from("projects")
            .update({
                title: title.trim(),
                category: category.trim(),
                description: description.trim(),
                image: imageUrl,
                github: github ? github.trim() : null,
                demo: demo ? demo.trim() : null,
                tech_stack: techStack,
            })
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard/projects");

        return { success: true, message: "Project updated successfully!" };
    } catch (err: any) {
        console.error("Error updating project:", err);
        return { success: false, error: err.message || "Failed to update project." };
    }
}

/**
 * Server action to delete a project.
 */
export async function deleteProjectAction(id: string): Promise<ProjectResult> {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) return { success: false, error: "Unauthorized." };

    if (!id) return { success: false, error: "Project ID is required." };

    try {
        const { error } = await supabaseAdmin
            .from("projects")
            .delete()
            .eq("id", id);

        if (error) throw error;

        revalidatePath("/");
        revalidatePath("/admin/dashboard/projects");

        return { success: true, message: "Project deleted successfully!" };
    } catch (err: any) {
        console.error("Error deleting project:", err);
        return { success: false, error: err.message || "Failed to delete project." };
    }
}
