"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; 
import { FaMeta, FaHackerrank, FaAws, FaMicrosoft } from "react-icons/fa6"; // Added AWS & Microsoft
import { SiCisco } from "react-icons/si"; 

interface Certification {
    id: number;
    title: string;
    org: string;
    date: string;
    icon: React.ReactNode;
    link: string;
    color: string;
    borderColor: string;
}

// ---------------------- DATA ----------------------
const certifications: Certification[] = [
    {
        id: 1,
        title: "Google UX Design Professional Certificate",
        org: "Coursera / Google",
        date: "Issued Dec 2025",
        icon: <FcGoogle className="w-16 h-16" />,
        link: "#",
        color: "bg-blue-500/10",
        borderColor: "group-hover:border-blue-500/50"
    },
    {
        id: 2,
        title: "Meta Frontend Developer Professional Certificate",
        org: "Coursera / Meta",
        date: "Issued Nov 2025",
        icon: <FaMeta className="w-14 h-14 text-blue-500" />,
        link: "#",
        color: "bg-cyan-500/10",
        borderColor: "group-hover:border-cyan-500/50"
    },
    {
        id: 3,
        title: "React (Basic) Skills Certification",
        org: "HackerRank",
        date: "Issued Oct 2025",
        icon: <FaHackerrank className="w-14 h-14 text-green-500" />,
        link: "#",
        color: "bg-green-500/10",
        borderColor: "group-hover:border-green-500/50"
    },
    {
        id: 4,
        title: "Introduction to Cybersecurity",
        org: "Cisco Networking Academy",
        date: "Issued Sep 2025",
        icon: <SiCisco className="w-14 h-14 text-sky-500" />,
        link: "#",
        color: "bg-purple-500/10",
        borderColor: "group-hover:border-purple-500/50"
    },
    // --- Extra Certifications (Hidden initially) ---
    {
        id: 5,
        title: "AWS Cloud Practitioner Essentials",
        org: "Amazon Web Services",
        date: "Issued Aug 2025",
        icon: <FaAws className="w-14 h-14 text-orange-500" />,
        link: "#",
        color: "bg-orange-500/10",
        borderColor: "group-hover:border-orange-500/50"
    },
    {
        id: 6,
        title: "Microsoft Azure Fundamentals (AZ-900)",
        org: "Microsoft",
        date: "Issued Jul 2025",
        icon: <FaMicrosoft className="w-14 h-14 text-blue-400" />,
        link: "#",
        color: "bg-blue-600/10",
        borderColor: "group-hover:border-blue-600/50"
    }
];

export const Certifications = () => {
    const [showAll, setShowAll] = useState(false);

    // Show first 4 initially, or all if showAll is true
    const visibleCertifications = showAll ? certifications : certifications.slice(0, 4);

    return (
        <section id="certifications" className="relative py-24 px-6 md:px-12 bg-transparent">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center md:text-left"
                >
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                        <div className="w-4 h-[2px] bg-cyan-400" />
                        <h3 className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Credentials</h3>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Certifications</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {visibleCertifications.map((cert, index) => (
                            <CertificationCard key={cert.id} cert={cert} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* See All Button */}
                {certifications.length > 4 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-12 flex justify-center"
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="group flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-semibold hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
                        >
                            {showAll ? (
                                <>Show Less <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /></>
                            ) : (
                                <>See All Certifications <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" /></>
                            )}
                        </button>
                    </motion.div>
                )}

            </div>
        </section>
    );
};

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`group relative flex flex-col sm:flex-row items-center sm:items-stretch gap-6 bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 ${cert.borderColor} transition-all duration-300 backdrop-blur-sm h-full`}
        >
            {/* Logo Placeholder (Left Side) */}
            <div className={`w-full sm:w-32 h-32 shrink-0 rounded-xl ${cert.color} border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                {cert.icon}
            </div>

            {/* Content (Right Side) */}
            <div className="flex flex-col justify-between flex-grow text-center sm:text-left w-full">
                <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors leading-tight">
                        {cert.title}
                    </h3>
                    <p className="text-gray-400 font-medium mb-1 text-sm">{cert.org}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-xs mb-4 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{cert.date}</span>
                    </div>
                </div>

                {/* Button */}
                <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-white border border-white/20 bg-white/5 py-2 px-4 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 w-full sm:w-max"
                >
                    View Certification <ExternalLink className="w-3 h-3" />
                </a>
            </div>
        </motion.div>
    );
};