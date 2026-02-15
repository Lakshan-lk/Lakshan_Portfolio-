"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
    Layout, Code2, Server, 
    Database, Smartphone, Wrench
} from "lucide-react";

// Import Brand Icons
import { 
    FaReact, FaNodeJs, FaJava, FaPython, FaPhp, FaGitAlt, FaGithub, FaAndroid, FaHtml5, FaFigma, FaChartBar
} from "react-icons/fa";
import { 
    SiJavascript, SiCss3, SiTailwindcss, SiVite, SiExpress, SiMongodb, 
    SiMysql, SiFirebase, SiKotlin, SiPostman, 
    SiAdobexd, SiSketch, SiAdobephotoshop, SiAdobeillustrator, SiNextdotjs, SiTypescript, SiFramer, SiJupyter
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillCategories = [
    {
        title: "Design",
        icon: Layout,
        color: "text-purple-400",
        skills: [
            { name: "Figma", icon: <FaFigma className="w-8 h-8 text-pink-400" /> },
            { name: "Adobe XD", icon: <SiAdobexd className="w-8 h-8 text-pink-600" /> },
            { name: "Photoshop", icon: <SiAdobephotoshop className="w-8 h-8 text-blue-500" /> },
            { name: "Illustrator", icon: <SiAdobeillustrator className="w-8 h-8 text-orange-500" /> },
            { name: "Sketch", icon: <SiSketch className="w-8 h-8 text-yellow-500" /> },
        ]
    },
    {
        title: "Frontend",
        icon: Code2,
        color: "text-cyan-400",
        skills: [
            { name: "React", icon: <FaReact className="w-8 h-8 text-cyan-400" /> },
            { name: "Next.js", icon: <SiNextdotjs className="w-8 h-8 text-white" /> },
            { name: "TypeScript", icon: <SiTypescript className="w-8 h-8 text-blue-500" /> },
            { name: "Tailwind", icon: <SiTailwindcss className="w-8 h-8 text-cyan-500" /> },
            { name: "JavaScript", icon: <SiJavascript className="w-8 h-8 text-yellow-400" /> },
            { name: "HTML5", icon: <FaHtml5 className="w-8 h-8 text-orange-600" /> },
            { name: "Framer", icon: <SiFramer className="w-8 h-8 text-white" /> },
            { name: "Vite", icon: <SiVite className="w-8 h-8 text-purple-500" /> },
        ]
    },
    {
        title: "Backend",
        icon: Server,
        color: "text-green-400",
        skills: [
            { name: "Node.js", icon: <FaNodeJs className="w-8 h-8 text-green-500" /> },
            { name: "Express", icon: <SiExpress className="w-8 h-8 text-gray-400" /> },
            { name: "Python", icon: <FaPython className="w-8 h-8 text-blue-400" /> },
            { name: "Java", icon: <FaJava className="w-8 h-8 text-red-500" /> },
            { name: "PHP", icon: <FaPhp className="w-8 h-8 text-indigo-400" /> },
        ]
    },
    {
        title: "Database",
        icon: Database,
        color: "text-yellow-400",
        skills: [
            { name: "MongoDB", icon: <SiMongodb className="w-8 h-8 text-green-500" /> },
            { name: "MySQL", icon: <SiMysql className="w-8 h-8 text-blue-500" /> },
            { name: "Firebase", icon: <SiFirebase className="w-8 h-8 text-yellow-500" /> },
        ]
    },
    {
        title: "Mobile",
        icon: Smartphone,
        color: "text-pink-400",
        skills: [
            { name: "Kotlin", icon: <SiKotlin className="w-8 h-8 text-purple-600" /> },
            { name: "Android", icon: <FaAndroid className="w-8 h-8 text-green-500" /> },
            { name: "React Native", icon: <FaReact className="w-8 h-8 text-cyan-400" /> },
        ]
    },
    {
        title: "Tools & Others",
        icon: Wrench,
        color: "text-orange-400",
        skills: [
            { name: "Git", icon: <FaGitAlt className="w-8 h-8 text-orange-500" /> },
            { name: "GitHub", icon: <FaGithub className="w-8 h-8 text-white" /> },
            { name: "VS Code", icon: <VscVscode className="w-8 h-8 text-blue-500" /> },
            { name: "Postman", icon: <SiPostman className="w-8 h-8 text-orange-500" /> },
            { name: "Power BI", icon: <FaChartBar className="w-8 h-8 text-yellow-500" /> },
            { name: "Jupyter", icon: <SiJupyter className="w-8 h-8 text-orange-600" /> },
        ]
    }
];

export const Skills = () => {
    return (
        <section id="skills" className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* --- Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center md:text-left"
                >
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <div className="w-8 h-[2px] bg-cyan-400" />
                        <h3 className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Tech Stack</h3>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Skills</span>
                    </h2>
                </motion.div>

                {/* --- Masonry Grid Layout for Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            // CARD STYLE APPLIED HERE
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                                <div className={`p-2 rounded-lg bg-white/5 ${category.color}`}>
                                    <category.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Skills Icons Grid */}
                            <div className="flex flex-wrap gap-4">
                                {category.skills.map((skill, i) => (
                                    <SkillItem key={i} skill={skill} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

// --- Single Skill Item Component ---
const SkillItem = ({ skill }: { skill: { name: string, icon: React.ReactNode } }) => {
    // Random float animation
    const randomDuration = 3 + Math.random() * 2;
    const randomY = 3 + Math.random() * 3;

    return (
        <motion.div
            animate={{
                y: [0, -randomY, 0],
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
            }}
            whileHover={{ scale: 1.1, y: -5 }}
            className="flex flex-col items-center gap-2 group/icon cursor-pointer"
        >
            <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-slate-900/50 border border-white/10 shadow-sm group-hover/icon:bg-white/10 group-hover/icon:border-cyan-500/30 group-hover/icon:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300">
                {/* Icon Size Reduced slightly to fit card */}
                <div className="scale-75 group-hover/icon:scale-100 transition-transform duration-300">
                    {skill.icon}
                </div>
            </div>
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider group-hover/icon:text-cyan-300 transition-colors">
                {skill.name}
            </span>
        </motion.div>
    );
};