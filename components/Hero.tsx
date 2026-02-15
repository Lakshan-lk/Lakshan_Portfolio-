"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
// Import consistent icons from react-icons
import { FaGithub, FaLinkedin, FaBehance, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const Hero = () => {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden md:flex-row md:justify-between md:px-20 pt-20 md:pt-0">
            {/* Text Content */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left md:w-1/2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-4"
                >
                    <span className="px-3 py-1 text-sm font-medium border rounded-full text-cyan-400 border-cyan-500/30 bg-cyan-500/10">
                        Available for Work
                    </span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-white/80 text-lg font-medium mb-2"
                >
                    Hello, I&apos;m
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl font-bold tracking-tight md:text-7xl"
                >
                    Lakshan <br />
                    Ekanayaka
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-4 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 md:text-4xl pb-2"
                >
                    UI/UX Designer & Frontend Developer
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    className="max-w-lg mt-6 text-lg text-slate-400"
                >
                    Crafting digital experiences where design meets code. Specialized in
                    building futuristic, diverse, and accessible web applications.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
                >
                    <a href="#projects" className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(8,145,178,0.5)]">
                        View Projects <ArrowRight size={20} />
                    </a>
                    <a href="/Lakshan_CV.pdf" download className="flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-300 border rounded-full text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-500">
                        Download CV <Download size={20} />
                    </a>
                </motion.div>

                {/* Socials - Updated with React Icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex gap-6 mt-12 items-center"
                >
                    <SocialLink href="https://github.com/ekanayaka" icon={<FaGithub size={24} />} />
                    <SocialLink href="https://linkedin.com/in/lakshan-ekanayaka" icon={<FaLinkedin size={24} />} />
                    <SocialLink href="https://behance.net/" icon={<FaBehance size={24} />} />
                    <SocialLink href="https://instagram.com/" icon={<FaInstagram size={24} />} />
                    <SocialLink href="https://facebook.com/" icon={<FaFacebook size={24} />} />
                    <SocialLink href="https://wa.me/94712345678" icon={<FaWhatsapp size={24} />} />
                </motion.div>
            </div>

            {/* Hero Image / "Gravity Core" */}
            <div className="relative mt-16 md:mt-0 md:w-1/2 flex justify-center [perspective:1000px]">
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="relative z-20"
                >
                    {/* Rotating Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-4 rounded-full border border-t-cyan-500 border-r-violet-500 border-b-cyan-500/20 border-l-violet-500/20 opacity-80"
                    />

                    {/* Glow behind image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 rounded-full blur-2xl" />

                    <div className="relative w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full overflow-hidden border-2 border-slate-800/50 backdrop-blur-sm bg-slate-900">
                         {/* Replace with your image path */}
                        <Image
                            src="/profile.JPG" 
                            alt="Lakshan Ekanayaka"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Reusable Social Link Component
const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition-all duration-300 hover:text-cyan-400 hover:scale-110 hover:-translate-y-1"
        >
            {icon}
        </a>
    );
};