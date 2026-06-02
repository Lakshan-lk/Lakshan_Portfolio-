const fs2 = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envPath = path.join(process.cwd(), ".env.local");
if (!fs2.existsSync(envPath)) {
    console.error("Error: .env.local file not found!");
    process.exit(1);
}

const envContent = fs2.readFileSync(envPath, "utf8");
const env = {};
envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const parts = trimmed.split("=");
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
        env[key] = value;
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Error: Missing Supabase credentials in .env.local.");
    process.exit(1);
}

console.log("Connecting to Supabase at:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const certsData = [
    {
        title: "Introduction to Web Development with ChatGPT",
        org: "Simplilearn",
        date: "Issued July 2025",
        logo: "/Simp.png",
        credential_id: "",
        link: "https://simpli-web.app.link/e/Saxeuam7K1b",
        color: "bg-gray-500/10",
        border_color: "group-hover:border-gray-500/50"
    },
    {
        title: "Introduction to Figma",
        org: "Simplilearn",
        date: "Issued July 2025",
        logo: "/Simp.png",
        credential_id: "",
        link: "https://simpli-web.app.link/e/hCfM94q7K1b",
        color: "bg-gray-500/10",
        border_color: "group-hover:border-gray-500/50"
    },
    {
        title: "Introduction to Graphic Design; Basics of UI/UX",
        org: "Simplilearn",
        date: "Issued January 2026",
        logo: "/Simp.png",
        credential_id: "",
        link: "https://simpli-web.app.link/e/nNUWyvbVJ1b",
        color: "bg-gray-500/10",
        border_color: "group-hover:border-gray-500/50"
    },
    {
        title: "Website UI/UX Designing using ChatGPT : Become a UI UX designer",
        org: "Simplilearn",
        date: "Issued January 2026",
        logo: "/Simp.png",
        credential_id: "",
        link: "https://simpli-web.app.link/e/94r8Q92UJ1b",
        color: "bg-gray-500/10",
        border_color: "group-hover:border-gray-500/50"
    },
    {
        title: "Design Thinking for Beginners",
        org: "Simplilearn",
        date: "Issued January 2026",
        logo: "/Simp.png",
        credential_id: "",
        link: "https://simpli-web.app.link/e/XwCYyK56K1b",
        color: "bg-gray-500/10",
        border_color: "group-hover:border-gray-500/50"
    },
    {
        title: "Python For Beginners",
        org: "University of Moratuwa",
        date: "Issued May 2025",
        logo: "/uom.png",
        credential_id: "7Wf2MWI1MH",
        link: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
        color: "bg-white",
        border_color: "group-hover:border-white/50"
    },
    {
        title: "Python Programming",
        org: "University of Moratuwa",
        date: "Issued June 2025",
        logo: "/uom.png",
        credential_id: "f2MgXBUXU2",
        link: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
        color: "bg-white",
        border_color: "group-hover:border-white/50"
    },
    {
        title: "Web Design for Beginners",
        org: "University of Moratuwa",
        date: "Issued July 2025",
        logo: "/uom.png",
        credential_id: "SoCcwlQPyo",
        link: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
        color: "bg-white",
        border_color: "group-hover:border-white/50"
    },
    {
        title: "AI/ML Engineer - Stage 1",
        org: "SLIIT",
        date: "Issued July 2025",
        logo: "/sliit.png",
        credential_id: "ueqkdtqtuk",
        link: "https://code.sliit.org/certificates/ueqkdtqtuk",
        color: "bg-white",
        border_color: "group-hover:border-white/50"
    },
    {
        title: "AI/ML Engineer - Stage 2",
        org: "SLIIT",
        date: "Issued August 2025",
        logo: "/sliit.png",
        credential_id: "8l9zqe20oo",
        link: "https://code.sliit.org/certificates/8l9zqe20oo",
        color: "bg-white",
        border_color: "group-hover:border-white/50"
    }
];

async function seedCertifications() {
    try {
        console.log("Seeding certifications table...");
        await supabase.from("certifications").delete().neq("id", "00000000-0000-0000-0000-000000000000");

        const { error } = await supabase.from("certifications").insert(certsData);
        if (error) throw error;

        console.log(`🎉 Success: Seeded ${certsData.length} certifications into the database! 🎉`);
    } catch (err) {
        console.error("❌ Seeding certifications failed:", err.message || err);
    }
}

seedCertifications();
