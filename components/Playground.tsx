"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { FaBehance } from "react-icons/fa"; // Using react-icons for Behance

// --- DUMMY DATA FOR UI SHOTS ---
interface Shot {
    id: number;
    title: string;
    category: string;
    height: string;
    image: string;
    color: string;
    link: string;
}

// UPDATE: Added 'link' property for Behance URLs
const uiShots: Shot[] = [
    {
        id: 1,
        title: "Mobile Banking Dark Mode",
        category: "Mobile App",
        height: "h-64",
        image: "/project-1.png",
        color: "from-purple-500/20 to-blue-500/20",
        link: "https://www.behance.net/" // Add your specific project link here
    },
    {
        id: 2,
        title: "NFT Marketplace Dashboard",
        category: "Web Design",
        height: "h-96",
        image: "/project-2.png",
        color: "from-cyan-500/20 to-teal-500/20",
        link: "https://www.behance.net/"
    },
    {
        id: 3,
        title: "Smart Home Controller",
        category: "IoT Interface",
        height: "h-72",
        image: "/project-3.png",
        color: "from-orange-500/20 to-red-500/20",
        link: "https://www.behance.net/"
    },
    {
        id: 4,
        title: "Travel Booking Landing",
        category: "Web Design",
        height: "h-80",
        image: "/project-4.png",
        color: "from-pink-500/20 to-rose-500/20",
        link: "https://www.behance.net/"
    },
    {
        id: 5,
        title: "Fitness Tracker Watch UI",
        category: "Wearable",
        height: "h-64",
        image: "/project-5.png",
        color: "from-green-500/20 to-emerald-500/20",
        link: "https://www.behance.net/"
    },
    {
        id: 6,
        title: "SaaS Analytics Platform",
        category: "Dashboard",
        height: "h-80",
        image: "/project-6.png",
        color: "from-blue-600/20 to-indigo-600/20",
        link: "https://www.behance.net/"
    },
];

export const Playground = () => {
    return (
        <section id="playground" className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* --- Header --- */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-4 h-[2px] bg-cyan-400" />
                            <h3 className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Playground</h3>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Experiments</span>
                        </h2>
                    </div>

                    {/* Behance Link Button */}
                    <motion.a
                        href="https://www.behance.net/" // YOUR BEHANCE PROFILE LINK HERE
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600/10 border border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium"
                    >
                        <FaBehance className="w-5 h-5" />
                        <span>Follow on Behance</span>
                    </motion.a>
                </motion.div>

                {/* --- Masonry Grid --- */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {uiShots.map((shot, index) => (
                        <FloatingShot key={shot.id} shot={shot} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

// --- Single Shot Component ---
const FloatingShot = ({ shot, index }: { shot: Shot; index: number }) => {
    const [randomValues, setRandomValues] = React.useState({ duration: 5, delay: 0 });

    React.useEffect(() => {
        setRandomValues({
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 2
        });
    }, []);

    return (
        <div className="break-inside-avoid mb-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        duration: randomValues.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: randomValues.delay
                    }}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900"
                >
                    {/* Image Container */}
                    <div className={`w-full ${shot.height} bg-gradient-to-br ${shot.color} relative`}>

                        {/* Main Image */}
                        {shot.image ? (
                            <Image
                                src={shot.image}
                                alt={shot.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity">
                                <span className="text-4xl filter drop-shadow-lg">🎨</span>
                            </div>
                        )}

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm">
                        <span className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
                            {shot.category}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-6">
                            {shot.title}
                        </h3>

                        {/* View Full Shot Link */}
                        <a
                            href={shot.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-white font-medium border-b border-cyan-400 pb-0.5 hover:text-cyan-400 transition-colors"
                        >
                            View Full Shot <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                </motion.div>
            </motion.div>
        </div>
    );
};