"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Figma, Rocket, GraduationCap, Briefcase, Sparkles, School } from "lucide-react";
import Image from "next/image";

// --- Real Data ---
const timelineData = [
    {
        year: "2025 - Present",
        title: "UI/UX Designer",
        subtitle: "All In One Holding (Pvt) Ltd",
        description: "Designing intuitive user interfaces and enhancing user experiences for digital products. Translating business requirements into functional, visually appealing designs using Figma.",
        icon: Briefcase,
        tags: ["UI/UX", "Prototyping", "Figma"],
    },
    {
        year: "2023 - 2027",
        title: "BSc (Hons) in Information Technology",
        subtitle: "SLIIT",
        description: "Specializing in Information Technology with a strong foundation in programming, algorithms, and software engineering. Exploring the intersection of creative design and technical development.",
        icon: GraduationCap,
        tags: ["Undergraduate", "Information Technology"],
    },
    {
        year: "2008 - 2022",
        title: "School Education",
        subtitle: "Kingswood College, Kandy",
        description: "Completed G.C.E. Ordinary Level and Advanced Level education with a strong foundation in core academic subjects, logical reasoning, and problem-solving skills.",
        icon: School,
        tags: ["Kingswood College", "G.C.E A/L"],
    },
];

export const About = () => {
    const timelineRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 80%", "end 50%"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            id="about"
            className="relative min-h-screen bg-transparent py-20 px-6 overflow-hidden"
        >
            {/* Background Glows */}
            <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto z-10 relative">

                {/* ==================== PART 1: INTRO SECTION ==================== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-4 h-[2px] bg-cyan-400" />
                            <span className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Who am I?</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            I am a motivated <span className="text-white font-medium">3rd Year IT Undergraduate at SLIIT</span> with a dual passion for UI/UX Designer and Frontend Developer.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed font-medium">
                            While I started with a focus on code, I found my true calling in creating intuitive, user-centered designs. Now, I bridge the gap between <span className="text-cyan-300">technical logic</span> and <span className="text-purple-300">creative magic</span>, leveraging tools like Figma and technologies like React to build modern, responsive applications that look beautiful and work perfectly.
                        </p>
                    </motion.div>

                    {/* Right: Photo & Stats */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Floating Container */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full max-w-md"
                        >
                            {/* 1. The Photo */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                                <Image
                                    src="/about-me.jpg"
                                    alt="Lakshan Ekanayaka"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* 2. The Stats Card */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-20">
                                <div className="flex justify-between items-center divide-x divide-white/10">
                                    <div className="flex flex-col items-center px-4 w-1/3">
                                        <Figma className="w-6 h-6 text-purple-400 mb-2" />
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">Design</span>
                                        <span className="text-white font-bold text-sm md:text-base">Figma & UX</span>
                                    </div>
                                    <div className="flex flex-col items-center px-4 w-1/3">
                                        <Code2 className="w-6 h-6 text-cyan-400 mb-2" />
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">Code</span>
                                        <span className="text-white font-bold text-sm md:text-base">React & Next</span>
                                    </div>
                                    <div className="flex flex-col items-center px-4 w-1/3">
                                        <Sparkles className="w-6 h-6 text-yellow-400 mb-2" />
                                        <span className="text-xs text-gray-400 uppercase tracking-wider">Focus</span>
                                        <span className="text-white font-bold text-sm md:text-base">User Centric</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>


                {/* ==================== PART 2: THE TIMELINE (UPDATED SIZES) ==================== */}
                <div className="relative mt-32" ref={timelineRef}>
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-bold text-white">My Journey</h3>
                    </div>

                    {/* CHANGE: Increased max-width for wider cards */}
                    <div className="relative max-w-8xl mx-auto">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

                        <motion.div
                            style={{ height: lineHeight }}
                            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400 -translate-x-1/2 z-0 origin-top"
                        />

                        {/* CHANGE: Increased vertical spacing between cards */}
                        <div className="space-y-24">
                            {timelineData.map((item, index) => (
                                <TimelineItem key={index} item={item} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex items-center md:justify-between ${isEven ? "md:flex-row-reverse" : ""}`}
        >
            {/* CHANGE: Adjusted width constraint to make cards wider (approx 45%) */}
            <div className="hidden md:block w-[45%]" />

            {/* Center Icon */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <item.icon className="w-6 h-6 text-white" />
            </div>

            {/* Content Card (UPDATED SIZES) */}
            {/* CHANGE: Adjusted width to w-[45%] and increased left padding for mobile */}
            <div className="w-full md:w-[45%] pl-20 md:pl-0">
                {/* CHANGE: Increased padding inside card (p-8 to p-10) */}
                <div className="p-8 md:p-10 rounded-2xl bg-slate-900/40 border border-white/10 hover:border-cyan-500/30 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] group">
                    <div className="flex justify-between items-center mb-4">
                        {/* CHANGE: Increased font size for year badge */}
                        <span className="inline-block px-4 py-2 text-sm font-mono text-cyan-300 bg-cyan-900/30 rounded-full border border-cyan-500/20">
                            {item.year}
                        </span>
                    </div>

                    {/* CHANGE: Increased font size for Title */}
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {item.title}
                    </h4>
                    {/* CHANGE: Increased font size for Subtitle */}
                    <h5 className="text-purple-400 font-medium text-lg mb-4">
                        {item.subtitle}
                    </h5>

                    {/* CHANGE: Increased font size for Description and made text brighter */}
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                        {item.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {item.tags.map((tag: string, i: number) => (
                            <span key={i} className="px-3 py-1 text-sm text-gray-400 bg-white/5 rounded-full">#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};