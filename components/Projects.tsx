"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Code2, Figma, Smartphone, Globe, Layers, Layout, LayoutDashboard } from "lucide-react";
import { FaBehance } from "react-icons/fa";
import Image from "next/image";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    techStack: { name: string; icon: any }[];
    image: string; // Placeholder color or image path
    github?: string;
    demo?: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Stay Easy House Booking App",
        category: "Mobile Projects",
        description: "Stay Easy is a mobile application that simplifies the process of finding and booking houses for rent. Designed with a clean and responsive UI using Android Studio and XML, it offers an intuitive user experience for both renters and property owners.",
        techStack: [{ name: "Kotlin", icon: Smartphone }, { name: "Expo", icon: Code2 }],
        image: "/project-60.png",
        github: "https://github.com/Lakshan-lk/HouseBookingApp.git",
        demo: "https://github.com/Lakshan-lk/HouseBookingApp.git"
    },
    {
        id: 2,
        title: "Spend Wise – Personal Finance Tracker",
        category: "Mobile Projects",
        description: "Spend Wise is a Kotlin-based personal finance tracking app built with Android Studio. It helps users manage daily expenses, set monthly budgets, and analyze spending habits effectively - all while storing data securely on the device.",
        techStack: [{ name: "Kotlin", icon: Smartphone }, { name: "Expo", icon: Code2 }],
        image: "/project-70.png",
        github: "https://github.com/Lakshan-lk/SpendWise.git",
        demo: "https://github.com/Lakshan-lk/SpendWise.git"
    },
    {
        id: 3,
        title: "Belleza - Fashion Store",
        category: "Web Projects",
        description: "Belleza is a modern and fully functional Fashion Store Website developed as part of my IWT assignment. The platform delivers a sleek, responsive shopping experience for users and includes a robust Admin Panel for backend management.",
        techStack: [{ name: "HTML", icon: Code2 }, { name: "CSS", icon: Layout }],
        image: "/project-800.png",
        github: "https://github.com/Lakshan-lk/Fashion-Store.git",
        demo: "https://github.com/Lakshan-lk/Fashion-Store.git"
    },
    {
        id: 4,
        title: "Servio - Vehicle Service and Repair Management System",
        category: "Web Projects",
        description: "We are excited to share after nearly month of continus efforts my team i proudly present , Servio, a full-stack web-based platform revolutionizing automotive service management in Sri Lanka. This comprehensive system connects Vehicle owners, Service centers, Technicians, and Admins in a seamless, User-friendly ecosystem. From booking services to tracking repairs in real-time, Servio streamlines the entire vehicle maintenance process with a modern, responsive design.",
        techStack: [{ name: "Next.js", icon: Code2 }, { name: "Tailwind CSS", icon: Layout }],
        image: "/project-50.png",
        github: "https://github.com/Lakshan-lk/Servio---Vehicle-Service-and-Repair-Management-System.git",
        demo: "https://github.com/Lakshan-lk/Servio---Vehicle-Service-and-Repair-Management-System.git"
    },
    {
        id: 5,
        title: "NoodleNest – Food Restaurant",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX design project - Noodle Nest, a modern food restaurant website that blends delicious visuals with a clean and engaging interface.Designed to make online ordering simple and delightful, focusing on visual hierarchy, color balance, and easy navigation.I explored layout systems, typography, and responsive elements to ensure a smooth user experience across all devices.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-9.png",
        github: "https://www.behance.net/gallery/236668095/NoodleNest-Food-Restaurant-Website-UIUX-Design",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=0%3A1&node-id=8-204&viewport=-1109%2C-193%2C0.22&t=hd0yyfgB9P1aU4dU-1&scaling=min-zoom&content-scaling=fixed"

    },
    {
        id: 6,
        title: "BMW M420 Website UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX concept - a modern and bold interface for the BMW M420.This design focuses on:Clean typography & strong visual hierarchy,Car color customization interaction,Minimal layout with high-contrast branding",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-100.png",
        github: "https://www.behance.net/gallery/240621473/BMW-M420-Automotive-Website-UIUX-Concept-Design",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=0%3A1&node-id=8-204&viewport=-1109%2C-193%2C0.22&t=hd0yyfgB9P1aU4dU-1&scaling=min-zoom&content-scaling=fixed"

    },
    {
        id: 7,
        title: "Tasty Food - Food Restaurant",
        category: "UI/UX Design",
        description: "This Individual project is a modern restaurant and food ordering website design that delivers a clean, attractive, and user-friendly experience. The design focuses on showcasing food menus beautifully while making it simple for customers to browse, order, and connect.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-40.png",
        github: "https://www.behance.net/gallery/235727011/Tasty-Food-Food-Restaurant-Website-Design-",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=13%3A3&node-id=47-409&viewport=747%2C829%2C0.1&t=v1A9YTIrOD98JgZs-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=47%3A409"

    },
    {
        id: 8,
        title: "Fruity Website Concept UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX exploration a modern, minimal, product focused landing experience for a fruity beverages brand 🍒 Cherry | 🍐 Pear | 🍋 Lemon | 🍎 Apple | 🍊 Quince | 🥝 Exotic Mix",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-110.png",
        github: "https://www.behance.net/gallery/241215065/Fruity-Website-Concept-UIUX-Design",
        demo: "https://www.figma.com/proto/g26wu9g75iY1ZTnXcUO1gV/UI-UX-Page?page-id=0%3A1&node-id=7-1149&viewport=526%2C292%2C0.1&t=11BlXNVz3bQUfYz0-1&scaling=min-zoom&content-scaling=fixed"

    },
    {
        id: 9,
        title: "Fruity Animation Website UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX concept — Fruity Cider Landing Page.Fruity is a concept landing page designed for a healthy fruit-based drink brand. The main objective was to create a fresh, natural, and inviting digital experience that builds trust and encourages users to order.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-120.png",
        github: "https://www.behance.net/gallery/245445469/Fruity-Animation-Website-UIUX-Design",
        demo: "https://www.figma.com/proto/g26wu9g75iY1ZTnXcUO1gV/UI-UX-Page?page-id=65%3A2&node-id=65-5&viewport=156%2C328%2C0.16&t=9YJgcRaP830qgPPe-1&scaling=scale-down&content-scaling=fixed"

    },
    {
        id: 10,
        title: "Planto – Plant Store Website UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my new UI/UX Design Project – “Planto”, a modern Plant Store Website built to create a calm and nature-inspired online shopping experience. 🌱 The main goal of this project was to design an aesthetic and minimal user interface that blends visual elegance with usability — making it easier for users to explore, choose, and purchase plants effortlessly.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-13.png",
        github: "https://www.behance.net/gallery/236502037/Planto-Plant-Store-Website-UIUX-Design",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=59%3A56&node-id=89-2&viewport=279%2C208%2C0.12&t=p6KrHzLmf953rv8o-1&scaling=min-zoom&content-scaling=fixed"

    },
    {
        id: 11,
        title: "Fruity Beverage Concept UI/UX Design",
        category: "UI/UX Design",
        description: "Excited to share my latest UI/UX concept — Fruity Cider Landing Page.Fruity is a concept landing page designed for a healthy fruit-based drink brand. The main objective was to create a fresh, natural, and inviting digital experience that builds trust and encourages users to order.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-14.png",
        github: "https://www.behance.net/gallery/245533175/UIUX-Mobile-Design-Project-Fruity-Beverage-Concept",
        demo: "https://www.figma.com/proto/g26wu9g75iY1ZTnXcUO1gV/UI-UX-Page?page-id=96%3A423&node-id=96-3404&viewport=291%2C209%2C0.1&t=SK4ZZXLDLJMEeeOd-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=96%3A3404"

    },
    {
        id: 12,
        title: "Sri Lanka Tourism Website",
        category: "UI/UX Design",
        description: "This concept focuses on showcasing the beauty of Sri Lanka through a clean, immersive, and visually engaging interface.I explored modern layouts, bold typography, and high-quality imagery to bring Nature, Wildlife, Culture, Airlines and travel experiences together in one smooth user journey.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-30.png",
        github: "https://www.behance.net/gallery/239110627/Sri-Lanka-Tourism-Website-UIUX-Design",
        demo: "https://www.figma.com/proto/EaoLyOfpy9t7kosfolXffe/Web-site?page-id=71%3A19&node-id=75-58&viewport=843%2C678%2C0.1&t=TRlMJv3MFaZdfSfU-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=75%3A58"
    },
    {
        id: 12,
        title: "Mag City Website Redesign",
        category: "UI/UX Design",
        description: " Excited to share our Usability Improvement Project for the Mag City website! This project was completed as part of our Human–Computer Interaction (HCI) module, where we focused on enhancing the overall user experience and interface design of an existing platform.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-20.png",
        github: "https://www.behance.net/gallery/240177833/MagCity-Vehicle-Service-Website-%28UIUX-Design%29",
        demo: "https://www.figma.com/proto/kNxZH97bRLRRTZwfhuiF5K/Project-Magcity?page-id=0%3A1&node-id=614-9695&viewport=-1890%2C6495%2C0.12&t=fi4h8W3MP6Vm3PrJ-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=530%3A2010"
    },
    {
        id: 13,
        title: "Lakshan Portfolio",
        category: "Web Projects",
        description: "My personal interactive portfolio website designed and developed from scratch. Features a futuristic dark theme, glassmorphism UI, and smooth animations to showcase my skills as a UI/UX Designer and Frontend Developer.",
        techStack: [{ name: "Next.js", icon: Code2 }, { name: "TypeScript", icon: Layout }],
        image: "/project-10.png",
        github: "https://github.com/Lakshan-lk/Lakshan_Portfolio-.git",
        demo: "lakshan-portfolio-ochre.vercel.app"
    },
];

const allCategories = ["All", "UI/UX Design", "Web Projects", "Mobile Projects"];

export const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
    const [isExpanded, setIsExpanded] = useState(false);

    const reversedProjects = [...projects].reverse();

    const filteredProjects = activeCategory === "All"
        ? reversedProjects
        : reversedProjects.filter(p => p.category === activeCategory);

    const displayedProjects = activeCategory === "All"
        ? filteredProjects.slice(0, visibleCount)
        : filteredProjects;

    const handleLoadMore = () => {
        if (isExpanded) {
            setVisibleCount(6);
            setIsExpanded(false);
        } else {
            setVisibleCount(projects.length);
            setIsExpanded(true);
        }
    };

    return (
        <section id="projects" className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header & Tabs */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-4 h-[2px] bg-cyan-400" />
                            <span className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Recent Projects</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Work</span>
                        </h2>
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {allCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    // Reset expansion state when changing categories
                                    if (category === "All") {
                                        setVisibleCount(6);
                                        setIsExpanded(false);
                                    }
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === category
                                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {displayedProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View All / GitHub Actions */}
                {activeCategory === "All" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 w-full flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto px-4">
                            
                            {/* View All Button */}
                            <button
                                onClick={handleLoadMore}
                                className="group relative px-8 py-3 bg-slate-900 text-white font-medium rounded-full overflow-hidden border border-cyan-500/50 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] w-full md:w-auto flex justify-center"
                            >
                                <div className="absolute inset-0 w-full h-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isExpanded ? "Show Less" : "View All Projects"}
                                    <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover:-translate-y-1 group-hover:translate-x-1"}`} />
                                </span>
                            </button>

                            {/* Social Links */}
                            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                                <a
                                    href="https://github.com/Lakshan-lk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors group bg-white/5 md:bg-transparent rounded-full w-full sm:w-auto border border-white/5 md:border-none"
                                >
                                    <Github className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                                    <span className="text-sm whitespace-nowrap">Explore on GitHub</span>
                                </a>
                                <a
                                    href="https://www.behance.net/lakshanekanayaka"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors group bg-white/5 md:bg-transparent rounded-full w-full sm:w-auto border border-white/5 md:border-none"
                                >
                                    <FaBehance className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                                    <span className="text-sm whitespace-nowrap">Explore on Behance</span>
                                </a>
                            </div>
                            
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900/40 border border-white/10 hover:border-purple-500/30 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
        >
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-60" />

                {/* Image Placeholder - In real app, use Image component */}
                <div className="absolute inset-0 bg-slate-800 group-hover:scale-105 transition-transform duration-700">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-semibold text-white/90 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex gap-2">
                        {project.techStack.map((tech, i) => (
                            <div key={i} title={tech.name} className="p-1.5 rounded-md bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                                <tech.icon className="w-4 h-4" />
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-5">
                    {project.description}
                </p>

                <div className="mt-auto flex gap-4">
                    <a
                        href={project.github || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-500 text-white text-sm font-medium rounded-lg transition-all duration-300 border border-white/10 hover:border-transparent group/btn text-center flex items-center justify-center"
                    >
                        View Project
                    </a>
                    <a
                        href={project.demo || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-transparent hover:bg-white/5 text-gray-400 hover:text-white text-sm font-medium rounded-lg transition-all duration-300 border border-white/10 hover:border-white/30 flex items-center justify-center"
                    >
                        Live Demo
                    </a>
                </div>
            </div>
        </motion.div>
    );
};
