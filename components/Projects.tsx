"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Code2, Figma, Smartphone, Globe, Layers, Layout, LayoutDashboard } from "lucide-react";
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
        title: "Chandula Nanayakkara",
        category: "Web Projects",
        description: "A high-performance personal branding site built for a client. Features a custom dark theme and seamless animations. A high-performance personal branding site built for a client. Features a custom dark theme and seamless animations.",
        techStack: [{ name: "Next.js", icon: Code2 }, { name: "Tailwind", icon: Layout }],
        image: "/project-1.jpg",
        github: "#",
        demo: "#"
    },
    {
        id: 2,
        title: "HCI Module Redesign",
        category: "UI/UX Design",
        description: "A complete usability study and redesign of a legacy interface to improve user experience. A complete usability study and redesign of a legacy interface to improve user experience.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Prototyping", icon: Layers }],
        image: "/project-2.png",
    },
    {
        id: 3,
        title: "Travel App",
        category: "Mobile Projects",
        description: "A cross-platform mobile application for travel planning and booking.",
        techStack: [{ name: "Kotlin", icon: Smartphone }, { name: "Expo", icon: Code2 }],
        image: "/project-3.png",
    },
    {
        id: 4,
        title: "Agency Landing Page",
        category: "Web Projects",
        description: "A visually rich landing page featuring complex GSAP animations and 3D elements.",
        techStack: [{ name: "GSAP", icon: Code2 }, { name: "React", icon: Globe }],
        image: "/project-4.png",
    },
    {
        id: 5,
        title: "E-commerce Dashboard",
        category: "Web Projects",
        description: "A comprehensive dashboard for managing products, orders, and analytics.",
        techStack: [{ name: "React", icon: Code2 }, { name: "Charts", icon: LayoutDashboard }],
        image: "/project-5.png",
    },
    {
        id: 6,
        title: "Food Delivery App",
        category: "Mobile Projects",
        description: "High-fidelity prototype for a food delivery service with micro-interactions.",
        techStack: [{ name: "Figma", icon: Figma }, { name: "Protopie", icon: Smartphone }],
        image: "/project-6.png",
    },
    {
        id: 7,
        title: "Portfolio v1",
        category: "Web Projects",
        description: "My first portfolio website built with React and Styled Components.",
        techStack: [{ name: "React", icon: Code2 }, { name: "CSS", icon: Layers }],
        image: "/project-7.jpg",
    },
    {
        id: 8,
        title: "Task Manager",
        category: "Mobile Projects",
        description: "A productivity app focusing on simple task management and daily planning.",
        techStack: [{ name: "Flutter", icon: Smartphone }, { name: "Dart", icon: Code2 }],
        image: "/project-8.jpg",
    }
];

const allCategories = ["All", "UI/UX Design", "Web Projects", "Mobile Projects"];

export const Projects = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
    const [isExpanded, setIsExpanded] = useState(false);

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.category === activeCategory);

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
        <section id="work" className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden">
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
                        className="mt-16 flex flex-col items-center justify-center gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLoadMore}
                                className="group relative px-8 py-3 bg-slate-900 text-white font-medium rounded-full overflow-hidden border border-cyan-500/50 hover:border-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                            >
                                <div className="absolute inset-0 w-full h-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors" />
                                <span className="relative z-10 flex items-center gap-2">
                                    {isExpanded ? "Show Less" : "View All Projects"}
                                    <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-90" : "group-hover:-translate-y-1 group-hover:translate-x-1"}`} />
                                </span>
                            </button>

                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors group"
                            >
                                <Github className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
                                <span>Explore more on GitHub</span>
                            </a>
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
