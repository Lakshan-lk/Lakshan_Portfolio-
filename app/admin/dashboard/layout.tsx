import { verifyAdminSession } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Secure server-side check of the active JWT session cookie
    const isAuthenticated = await verifyAdminSession();
    
    if (!isAuthenticated) {
        redirect("/admin");
    }

    return <>{children}</>;
}
