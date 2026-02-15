"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Layout, Code2, Users, Video, Sparkles } from "lucide-react";

interface ServiceProps {
    id: number;
    title: string;
    description: string;
    icon: any;
    tags: string[];
    gradient: string;
}

const services: ServiceProps[] = [
    {
        id: 1,
        title: "UI/UX Design",
        description: "Crafting intuitive, user-centered interfaces that look stunning and solve real problems. I can design the UI/UX for your website or app.UI/UX Design is the process of designing the user interface and user experience of a website or app.",
        icon: Layout,
        tags: ["Wireframing", "Prototyping", "Mobile Apps"],
        gradient: "from-purple-500 to-cyan-500"
    },
    {
        id: 2,
        title: "Frontend Development",
        description: "Building pixel-perfect, high-performance web applications with clean and scalable code. I can design the UI/UX for your website or app.Frontend Development is the process of developing the frontend of a website or app.",
        icon: Code2,
        tags: ["React", "Next.js", "Tailwind", "Motion"],
        gradient: "from-cyan-500 to-blue-500"
    },
    {
        id: 3,
        title: "User Research",
        description: "Understanding user needs and behaviors to make data-driven design decisions. I can design the UI/UX for your website or app.User Research is the process of understanding user needs and behaviors to make data-driven design decisions.",
        icon: Users,
        tags: ["User Testing", "Personas", "Journeys"],
        gradient: "from-blue-500 to-purple-500"
    },
    {
        id: 4,
        title: "Content Creation",
        description: "Creating engaging digital content and storytelling that connects brands with their audience. I can design the UI/UX for your website or app.Content Creation is the process of creating engaging digital content and storytelling that connects brands with their audience.",
        icon: Video,
        tags: ["Video Editing", "Storytelling", "Media"],
        gradient: "from-purple-500 to-pink-500"
    }
];

export const Services = () => {
    return (
        <section id="services" className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center md:text-left"
                >
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <div className="w-4 h-[2px] bg-cyan-400" />
                        <h3 className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Services</h3>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Expertise</span>
                    </h2>
                </motion.div>

                {/* Grid - 2x2 Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {services.map((service, index) => (
                        <TiltCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- TILT CARD LOGIC ---
const ROTATION_RANGE = 20; // Maximum rotation in degrees
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = ({ service, index }: { service: ServiceProps; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE / width - HALF_ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE / height - HALF_ROTATION_RANGE;

        const rX = mouseY * -1;
        const rY = mouseX;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            // CHANGE: Adjusted height to be auto with min-height, removed fixed h-96
            className="group relative w-full min-h-[320px] rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-md flex flex-col justify-between"
        >
            {/* Holographic Gradient on Hover */}
            <div
                style={{
                    transform: "translateZ(50px)",
                }}
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}
            />

            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />

            <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full pointer-events-none">
                {/* Icon & Title Row */}
                <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-500`}>
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                            <service.icon className="w-7 h-7 text-white" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                        {service.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {service.description}
                    </p>
                </div>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
                    {service.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-medium text-cyan-300 bg-cyan-950/30 border border-cyan-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};