const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// 1. Manual parsing of .env.local to load credentials
const envPath = path.join(process.cwd(), ".env.local");
if (!fs.existsSync(envPath)) {
    console.error("Error: .env.local file not found! Please make sure you copied .env.local.example to .env.local.");
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const env = {};
envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const parts = trimmed.split("=");
    if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, ""); // remove wrapping quotes
        env[key] = value;
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY inside your .env.local file.");
    process.exit(1);
}

console.log("Connecting to Supabase at:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// =========================================================================
// DATA SEEDS DEFINITIONS
// =========================================================================

const journeyData = [
    {
        year: "2025 - Present",
        title: "UI/UX Designer",
        subtitle: "All In One Holding (Pvt) Ltd",
        description: "Designing intuitive user interfaces and enhancing user experiences for digital products. Translating business requirements into functional, visually appealing designs using Figma.",
        icon_name: "Briefcase",
        type: "experience",
        tags: ["UI/UX", "Figma", "Web Design", "Mobile Design"],
        order: 0
    },
    {
        year: "2023 - 2027",
        title: "BSc (Hons) in Information Technology",
        subtitle: "SLIIT",
        description: "Specializing in Information Technology with a strong foundation in programming, algorithms, and software engineering. Exploring the intersection of creative design and technical development.",
        icon_name: "GraduationCap",
        type: "education",
        tags: ["Undergraduate", "Information Technology", "SLIIT"],
        order: 1
    },
    {
        year: "2008 - 2022",
        title: "Primary & Secondary Education",
        subtitle: "Kingswood College, Kandy",
        description: "Completed G.C.E. Ordinary Level and Advanced Level education with a strong foundation in core academic subjects, logical reasoning, and problem-solving skills.",
        icon_name: "School",
        type: "education",
        tags: ["Kingswood College", "G.C.E A/L", "G.C.E O/L", "KCK"],
        order: 2
    }
];

const projectsData = [
    {
        title: "Stay Easy House Booking App",
        category: "Mobile Projects",
        description: "Stay Easy is a mobile application that simplifies the process of finding and booking houses for rent. Designed with a clean and responsive UI using Android Studio and XML, it offers an intuitive user experience for both renters and property owners.",
        tech_stack: [{ name: "Kotlin", icon: "SiKotlin" }, { name: "Expo", icon: "Code2" }],
        image: "/project-60.png",
        github: "https://github.com/Lakshan-lk/HouseBookingApp.git",
        demo: "https://github.com/Lakshan-lk/HouseBookingApp.git"
    },
    {
        title: "Spend Wise – Personal Finance Tracker",
        category: "Mobile Projects",
        description: "Spend Wise is a Kotlin-based personal finance tracking app built with Android Studio. It helps users manage daily expenses, set monthly budgets, and analyze spending habits effectively - all while storing data securely on the device.",
        tech_stack: [{ name: "Kotlin", icon: "SiKotlin" }, { name: "Expo", icon: "Code2" }],
        image: "/project-70.png",
        github: "https://github.com/Lakshan-lk/SpendWise.git",
        demo: "https://github.com/Lakshan-lk/SpendWise.git"
    },
    {
        title: "Belleza - Fashion Store",
        category: "Web Projects",
        description: "Belleza is a modern and fully functional Fashion Store Website developed as part of my IWT assignment. The platform delivers a sleek, responsive shopping experience for users and includes a robust Admin Panel for backend management.",
        tech_stack: [{ name: "HTML", icon: "FaHtml5" }, { name: "CSS", icon: "SiCss3" }],
        image: "/project-800.png",
        github: "https://github.com/Lakshan-lk/Fashion-Store.git",
        demo: "https://github.com/Lakshan-lk/Fashion-Store.git"
    },
    {
        title: "Servio - Vehicle Service and Repair Management System",
        category: "Web Projects",
        description: "We are excited to share after nearly month of continus efforts my team i proudly present , Servio, a full-stack web-based platform revolutionizing automotive service management in Sri Lanka. This comprehensive system connects Vehicle owners, Service centers, Technicians, and Admins in a seamless, User-friendly ecosystem. From booking services to tracking repairs in real-time, Servio streamlines the entire vehicle maintenance process with a modern, responsive design.",
        tech_stack: [{ name: "Next.js", icon: "SiNextdotjs" }, { name: "Tailwind CSS", icon: "SiTailwindcss" }],
        image: "/project-50.png",
        github: "https://github.com/Lakshan-lk/Servio---Vehicle-Service-and-Repair-Management-System.git",
        demo: "https://github.com/Lakshan-lk/Servio---Vehicle-Service-and-Repair-Management-System.git"
    },
    {
        title: "NoodleNest – Food Restaurant",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX design project - Noodle Nest, a modern food restaurant website that blends delicious visuals with a clean and engaging interface.Designed to make online ordering simple and delightful, focusing on visual hierarchy, color balance, and easy navigation.I explored layout systems, typography, and responsive elements to ensure a smooth user experience across all devices.",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-9.png",
        github: "https://www.behance.net/gallery/236668095/NoodleNest-Food-Restaurant-Website-UIUX-Design",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=0%3A1&node-id=8-204&viewport=-1109%2C-193%2C0.22&t=hd0yyfgB9P1aU4dU-1&scaling=min-zoom&content-scaling=fixed"
    },
    {
        title: "BMW M420 Website UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX concept - a modern and bold interface for the BMW M420.This design focuses on:Clean typography & strong visual hierarchy,Car color customization interaction,Minimal layout with high-contrast branding",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-100.png",
        github: "https://www.behance.net/gallery/240621473/BMW-M420-Automotive-Website-UIUX-Concept-Design",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=0%3A1&node-id=8-204&viewport=-1109%2C-193%2C0.22&t=hd0yyfgB9P1aU4dU-1&scaling=min-zoom&content-scaling=fixed"
    },
    {
        title: "Tasty Food - Food Restaurant",
        category: "UI/UX Design",
        description: "This Individual project is a modern restaurant and food ordering website design that delivers a clean, attractive, and user-friendly experience. The design focuses on showcasing food menus beautifully while making it simple for customers to browse, order, and connect.",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-40.png",
        github: "https://www.behance.net/gallery/235727011/Tasty-Food-Food-Restaurant-Website-Design-",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=13%3A3&node-id=47-409&viewport=747%2C829%2C0.1&t=v1A9YTIrOD98JgZs-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=47%3A409"
    },
    {
        title: "Fruity Website Concept UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX exploration a modern, minimal, product focused landing experience for a fruity beverages brand 🍒 Cherry | 🍐 Pear | 🍋 Lemon | 🍎 Apple | 🍊 Quince | 🥝 Exotic Mix",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-110.png",
        github: "https://www.behance.net/gallery/241215065/Fruity-Website-Concept-UIUX-Design",
        demo: "https://www.figma.com/proto/g26wu9g75iY1ZTnXcUO1gV/UI-UX-Page?page-id=0%3A1&node-id=7-1149&viewport=526%2C292%2C0.1&t=11BlXNVz3bQUfYz0-1&scaling=min-zoom&content-scaling=fixed"
    },
    {
        title: "Fruity Animation Website UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX concept — Fruity Cider Landing Page.Fruity is a concept landing page designed for a healthy fruit-based drink brand. The main objective was to create a fresh, natural, and inviting digital experience that builds trust and encourages users to order.",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-120.png",
        github: "https://www.behance.net/gallery/245445469/Fruity-Animation-Website-UIUX-Design",
        demo: "https://www.figma.com/proto/g26wu9g75iY1ZTnXcUO1gV/UI-UX-Page?page-id=65%3A2&node-id=65-5&viewport=156%2C328%2C0.16&t=9YJgcRaP830qgPPe-1&scaling=scale-down&content-scaling=fixed"
    },
    {
        title: "Planto – Plant Store Website UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my new UI/UX Design Project – “Planto”, a modern Plant Store Website built to create a calm and nature-inspired online shopping experience. 🌱 The main goal of this project was to design an aesthetic and minimal user interface that blends visual elegance with usability — making it easier for users to explore, choose, and purchase plants effortlessly.",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-13.png",
        github: "https://www.behance.net/gallery/236502037/Planto-Plant-Store-Website-UIUX-Design",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=59%3A56&node-id=89-2&viewport=279%2C208%2C0.12&t=p6KrHzLmf953rv8o-1&scaling=min-zoom&content-scaling=fixed"
    },
    {
        title: "Fruity Beverage Concept UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX concept — Fruity Cider Landing Page.Fruity is a concept landing page designed for a healthy fruit-based drink brand. The main objective was to create a fresh, natural, and inviting digital experience that builds trust and encourages users to order.",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-14.png",
        github: "https://www.behance.net/gallery/245533175/UIUX-Mobile-Design-Project-Fruity-Beverage-Concept",
        demo: "https://www.figma.com/proto/g26wu9g75iY1ZTnXcUO1gV/UI-UX-Page?page-id=96%3A423&node-id=96-3404&viewport=291%2C209%2C0.1&t=SK4ZZXLDLJMEeeOd-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=96%3A3404"
    },
    {
        title: "Sri Lanka Tourism Website",
        category: "UI/UX Design",
        description: "This concept focuses on showcasing the beauty of Sri Lanka through a clean, immersive, and visually engaging interface.I explored modern layouts, bold typography, and high-quality imagery to bring Nature, Wildlife, Culture, Airlines and travel experiences together in one smooth user journey.",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-30.png",
        github: "https://www.behance.net/gallery/239110627/Sri-Lanka-Tourism-Website-UIUX-Design",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=71%3A19&node-id=75-58&viewport=843%2C678%2C0.1&t=TRlMJv3MFaZdfSfU-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=75%3A58"
    },
    {
        title: "Mag City Website Redesign",
        category: "UI/UX Design",
        description: " Excited to share our Usability Improvement Project for the Mag City website! This project was completed as part of our Human–Computer Interaction (HCI) module, where we focused on enhancing the overall user experience and interface design of an existing platform.",
        tech_stack: [{ name: "Figma", icon: "FaFigma" }, { name: "Prototyping", icon: "Layers" }],
        image: "/project-20.png",
        github: "https://www.behance.net/gallery/240177833/MagCity-Vehicle-Service-Website-%28UIUX-Design%29",
        demo: "https://www.figma.com/proto/kNxZH97bRLRRTZwfhuiF5K/Project-Magcity?page-id=0%3A1&node-id=614-9695&viewport=-1890%2C6495%2C0.12&t=fi4h8W3MP6Vm3PrJ-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=530%3A2010"
    },
    {
        title: "Lakshan Portfolio",
        category: "Web Projects",
        description: "My personal interactive portfolio website designed and developed from scratch. Features a futuristic dark theme, glassmorphism UI, and smooth animations to showcase my skills as a UI/UX Designer and Frontend Developer.",
        tech_stack: [{ name: "Next.js", icon: "SiNextdotjs" }, { name: "TypeScript", icon: "SiTypescript" }],
        image: "/project-10.png",
        github: "https://github.com/Lakshan-lk/Lakshan_Portfolio-.git",
        demo: "https://lakshan-ekanayaka.vercel.app/#home"
    }
];

// =========================================================================
// RUNNING THE SEED INSERTIONS
// =========================================================================

async function seedDatabase() {
    try {
        console.log("\n--- Seeding Journey timeline milestones ---");
        // Clear existing just in case to prevent duplicates
        await supabase.from("journey").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        
        const { data: journeyRes, error: journeyErr } = await supabase
            .from("journey")
            .insert(journeyData);

        if (journeyErr) throw journeyErr;
        console.log(`Success: Seeded ${journeyData.length} journey items!`);

        console.log("\n--- Seeding Projects ---");
        await supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");

        const { data: projectsRes, error: projectsErr } = await supabase
            .from("projects")
            .insert(projectsData);

        if (projectsErr) throw projectsErr;
        console.log(`Success: Seeded ${projectsData.length} projects!`);

        console.log("\n🎉 Database Seeding Completed Successfully! 🎉");
    } catch (err) {
        console.error("\n❌ Seeding failed with error:", err.message || err);
    }
}

seedDatabase();
