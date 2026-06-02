import { verifyAdminSession } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    // 1. Secure Server-Side JWT Validation
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
        redirect("/admin");
    }

    // 2. High-performance Parallel Data Fetching
    const [projectsRes, journeyRes, messagesRes, certsRes] = await Promise.all([
        supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false }),
        supabaseAdmin.from("journey").select("*").order("order", { ascending: true }),
        supabaseAdmin.from("messages").select("*").order("created_at", { ascending: false }),
        supabaseAdmin.from("certifications").select("*").order("created_at", { ascending: false }),
    ]);

    const initialProjects = projectsRes.data || [];
    const initialJourney = journeyRes.data || [];
    const initialMessages = messagesRes.data || [];
    const initialCertifications = certsRes.data || [];

    // 3. Hydrate the premium client dashboard
    return (
        <DashboardClient
            initialProjects={initialProjects}
            initialJourney={initialJourney}
            initialMessages={initialMessages}
            initialCertifications={initialCertifications}
        />
    );
}
